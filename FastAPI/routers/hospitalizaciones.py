from fastapi import APIRouter, HTTPException, status, Depends
from db.models.Paciente import Paciente
from db.models.Hospitalizacion import Hospitalizacion
from beanie import PydanticObjectId
from utils.auth import JWTValidator

# inicia el server: uvicorn users:router --reload

router = APIRouter(
    prefix="/hospitalizaciones",
    tags=["Hospitalizacion"],
    responses={404: {"Message": "No Encontrado"}},
)


@router.post(
    "/", status_code=status.HTTP_201_CREATED, dependencies={Depends(JWTValidator())}
)
async def crear_hospitalizacion(hospitalizacion: Hospitalizacion) -> dict:
    hay_hospitalizacion_activa = await Hospitalizacion.find_one(
        Hospitalizacion.activo == True,
        Hospitalizacion.paciente.id == hospitalizacion.paciente.id,
    )

    if not hay_hospitalizacion_activa or (
        hay_hospitalizacion_activa and hay_hospitalizacion_activa.activo == False
    ):
        nueva_hospitalizacion = await hospitalizacion.create()
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "mensaje": "No se puede crear una nueva hospitalizacion, sin dar de alta la anterior"
            },
        )
    return {"hospitalizacion": nueva_hospitalizacion}


@router.put(
    "/{hospitalizacion_id}/dar-de-alta",
    status_code=status.HTTP_200_OK,
    dependencies={Depends(JWTValidator())},
)
async def dar_de_alta(hospitalizacion_id: PydanticObjectId):
    hospitalizacion_guardada = Hospitalizacion.get(hospitalizacion_id)
    hospitalizacion_guardada.activo = False
    await hospitalizacion_guardada.save()
    return {
        "mensaje": "Se dio de alta exitosamente a " + hospitalizacion_guardada.nombre
    }
