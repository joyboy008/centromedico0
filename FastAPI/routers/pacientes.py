from fastapi import APIRouter, HTTPException, status, Depends
from db.models.Paciente import Paciente
from db.models.Consulta import Consulta, ConsultaPut
from db.models.Hospitalizacion import Hospitalizacion
from utils.constants import JWT_SECRET, JWT_ALGORITHM, Roles
from beanie import PydanticObjectId
from utils.auth import JWTValidator
from utils.pacientes import PacienteList, UnPaciente, Apoyo
from utils.auth import Hasher
from bson import ObjectId  # para tener un object id

# inicia el server: uvicorn users:router --reload

router = APIRouter(
    prefix="/pacientes",
    tags=["Pacientes"],
    responses={404: {"Message": "No Encontrado"}},
)


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    dependencies={Depends(JWTValidator())},
)
async def crear_usuario(paciente: Paciente) -> dict:
    nuevo_paciente = await paciente.create()
    return Apoyo.vistaCrear(nuevo_paciente)


@router.put("/{paciente_id}", dependencies={Depends(JWTValidator())})
async def actualizar_usuario(paciente: Paciente, paciente_id: PydanticObjectId):
    paciente_guardado = await Paciente.get(paciente_id)
    if not paciente_guardado:
        raise HTTPException(status_code=404, detail="Paciente no existe")

    Apoyo.guardar_paciente(paciente_guardado, paciente)

    await paciente_guardado.save()
    return {
        "mensaje": paciente_guardado.nombre + " actualizado",
        "paciente": {
            "telefono": paciente_guardado.telefono,
            # "consulta.consulta_motivo": paciente_guardado.consulta.consulta_motivo,
        },
    }


@router.get("/", dependencies={Depends(JWTValidator())})
async def listar_pacientes():
    pacientes = await Paciente.find_all().project(PacienteList).to_list()
    return pacientes


@router.get("/{paciente_id}", dependencies={Depends(JWTValidator())})
async def obtener_paciente(paciente_id: PydanticObjectId):
    paciente = await Paciente.find_one(Paciente.id == paciente_id)
    return {"paciente": paciente}


@router.delete("/{paciente_id}", dependencies={Depends(JWTValidator())})
async def eliminar_paciente(paciente_id: PydanticObjectId):
    paciente_guardado = await Paciente.get(paciente_id)
    await paciente_guardado.delete()
    return Apoyo.vistaDelete(paciente_guardado)


@router.get(
    "/consultas/{paciente_id}",
    status_code=status.HTTP_200_OK,
    dependencies={Depends(JWTValidator)},
)
async def get_paciente_consultas(paciente_id: str) -> dict:
    consultas = await Consulta.find(Consulta.paciente.id == paciente_id).to_list()
    return {"consultas": consultas}


@router.get(
    "/consulta/{consulta_id}",
    status_code=status.HTTP_200_OK,
    dependencies={Depends(JWTValidator())},
)
async def get_consulta(consulta_id: PydanticObjectId) -> dict:
    consulta_guardada = await Consulta.get(consulta_id)
    return {"consulta": consulta_guardada}


@router.put(
    "/consulta/{consulta_id}",
    status_code=status.HTTP_200_OK,
    dependencies={Depends(JWTValidator())},
)
async def actualizar_consulta(
    consulta: ConsultaPut, consulta_id: PydanticObjectId
) -> dict:
    consulta_guardada = await Consulta.get(consulta_id)
    consulta_guardada.activo = consulta.activo
    consulta_guardada.consulta_motivo = consulta.consulta_motivo
    consulta_guardada.consulta_dia = consulta.consulta_dia
    consulta_guardada.diagnostico = consulta.diagnostico
    consulta_guardada.tratamiento = consulta.tratamiento

    await consulta_guardada.save()
    return {"consulta": consulta_guardada}


@router.get(
    "/hospitalizaciones/{paciente_id}",
    status_code=status.HTTP_200_OK,
    dependencies={Depends(JWTValidator)},
)
async def get_paciente_hospitalizaciones(paciente_id: str) -> dict:
    hospitalizaciones = await Hospitalizacion.find(
        Hospitalizacion.paciente.id == paciente_id
    ).to_list()
    return {"hospitalizaciones": hospitalizaciones}


@router.get(
    "/hospitalizacion/{hospitalizacion_id}",
    status_code=status.HTTP_200_OK,
    dependencies={Depends(JWTValidator())},
)
async def get_consulta(hospitalizacion_id: PydanticObjectId) -> dict:
    hospitalizacion_guardada = await Hospitalizacion.get(hospitalizacion_id)
    return {"hospitalizacion": hospitalizacion_guardada}


@router.put(
    "/hospitalizacion/{hospitalizacion_id}",
    status_code=status.HTTP_200_OK,
    dependencies={Depends(JWTValidator())},
)
async def actualizar_consulta(
    hospitalizacion: Hospitalizacion, hospitalizacion_id: PydanticObjectId
) -> dict:
    hospitalizacion_guardada = await Hospitalizacion.get(hospitalizacion_id)
    hospitalizacion_guardada.emergencia_nombre = hospitalizacion.emergencia_nombre
    hospitalizacion_guardada.emergencia_telefono = hospitalizacion.emergencia_telefono
    hospitalizacion_guardada.emergencia_parentesco = (
        hospitalizacion.emergencia_parentesco
    )
    hospitalizacion_guardada.diagnostico_egreso = hospitalizacion.diagnostico_egreso

    hospitalizacion_guardada.complicaciones = hospitalizacion.complicaciones
    hospitalizacion_guardada.operaciones = hospitalizacion.operaciones
    hospitalizacion_guardada.dias_estancia = hospitalizacion.dias_estancia
    hospitalizacion_guardada.fecha_inicio = hospitalizacion.fecha_inicio
    hospitalizacion_guardada.activo = hospitalizacion.activo

    await hospitalizacion_guardada.save()
    return {"consulta": hospitalizacion_guardada}


# Crear Modelo Para, Paciente, Enfermero-Secretaria y Doctor-Administrador y agregar rutas PUT, POST, GET, DELETE
# 1. Crear un archivo en carpeta FastApi/db/models
# 2. Importar Document de beanie
# 3. Importar BaseModel de pydantic
# 4. Agregar model a la inicializacion de la base de datos en FastApi/db/connection.py
# 5. para objetos embedidos como en el model Pacientes, crear una clase que herede de BaseModel y definir campos
# 6. Importar modelo en archivo /FastApi/routers/[nombre de ruta]. por ejemplo /FastApi/routers/pacientes.py
# 7. agregar a metods post, o put como tipo de parametro el nombre del modelo. por ejemplo agregar(data: Paciente)

# Asegurar Rutas
# 1. Importar JWTValidator de utils.auth
# 2. Importar Depends de fastapi
# 3. Agregar dependencias a decorador de ruta. por ejemplo @router.post('/', dependencies=(Depends=JWTValidator()))
