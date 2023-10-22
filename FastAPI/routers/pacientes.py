from fastapi import APIRouter, HTTPException, status, Depends
from db.models.Paciente import Paciente
from utils.constants import JWT_SECRET, JWT_ALGORITHM, Roles
from beanie import PydanticObjectId
from utils.auth import JWTValidator
from utils.pacientes import PacienteList, UnPaciente, Apoyo
from utils.auth import Hasher
from bson import ObjectId  # para tener un object id

# pip install bcrypt beanie motor PyJWT
# pip install python-decouple
# inicia el server: uvicorn users:router --reload
# Entidad user

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


# @router.post(  # Busqueda por nombre, falta agregar la condicion del nacimiento
#     "/",
#     response_model=Paciente,
#     status_code=status.HTTP_201_CREATED,
#     dependencies={Depends(JWTValidator())},
# )  # HTTP Status code
# async def paciente(paciente: Paciente):
#     if type(search_paciente("nombre", paciente.nombre)) == Paciente:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND, detail="El paciente ya Existe"
#         )  # esto es para cambiar el status Code

#     paciente_dict = dict(paciente)
#     del paciente_dict["id"]
#     id = path1.insert_one(paciente_dict).inserted_id
#     new_paciente = paciente_schema(path1.find_one({"_id": id}))

#     return Paciente(**new_paciente)


# @router.put("/", response_model=Paciente)
# async def paciente(paciente: Paciente):
#     paciente_dict = dict(paciente)
#     # print(paciente_dict)
#     del paciente_dict["id"]
#     try:
#         path1.find_one_and_replace({"_id": ObjectId(paciente.id)}, paciente_dict)
#     except:
#         return {"error": "No se ha Modificado el paciente"}

#     return search_paciente("_id", ObjectId(paciente.id))


# @router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
# async def user(id: str):
#     found = path.find_one_and_delete({"_id": ObjectId(id)})

#     if not found:
#         return {"error": "No se ha eliminado el usuario"}


# def search_user_by_email(email: str):
#     try:
#         user = path.find_one({"email": email})
#         return User(**user_schema(user))
#     except:
#         return {"error": "No se a encontrado el usuario"}


# def search_user(field: str, key):
#     try:
#         user = path.find_one({field: key})
#         return User(**user_schema(user))
#     except:
#         return {"error": "No se a encontrado el usuario"}


# def search_paciente(field: str, key):
#     try:
#         paciente = path1.find_one({field: key})
#         return Paciente(**paciente_schema(paciente))
#     except:
#         return {"error": "No se a encontrado el paciente Search"}


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
