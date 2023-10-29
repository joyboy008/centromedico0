from fastapi import APIRouter, HTTPException, status, Depends
from db.models.Consulta import Consulta, ConsultaEstado
from beanie import PydanticObjectId
from utils.auth import JWTValidator
from utils.cita import CitaList

router = APIRouter(
    prefix="/consultas",
    tags=["Consultas"],
    responses={404: {"Message": "No Encontrado"}},
)


@router.post(
    "/", status_code=status.HTTP_201_CREATED, dependencies={Depends(JWTValidator())}
)
async def crear_consulta(consulta: Consulta) -> dict:
    hay_consulta_activa = await Consulta.find_one(
        Consulta.activo == True, Consulta.paciente.id == consulta.paciente.id
    )
    numero_de_consultas = await Consulta.count()

    if numero_de_consultas > 0:
        consulta.consulta_numero = numero_de_consultas + 1

    if not hay_consulta_activa or (
        hay_consulta_activa and hay_consulta_activa.activo == False
    ):
        nueva_consulta = await consulta.create()
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "mensaje": "No se puede crear una nueva consulta, sin terminar la anterior"
            },
        )
    return {"consulta": nueva_consulta}


@router.post(
    "/estado/{consulta_id}",
    status_code=status.HTTP_200_OK,
    dependencies={Depends(JWTValidator())},
)
async def terminar_consulta(
    estado_consulta: ConsultaEstado, consulta_id: PydanticObjectId
):
    consulta_guardada = await Consulta.find_one(Consulta.id == consulta_id)
    consulta_guardada.activo = estado_consulta.activo
    if not consulta_guardada:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Consulta no existe"
        )
    consulta_guardada.activo = estado_consulta.activo
    return {"mensaje": "Estado actualizado"}
