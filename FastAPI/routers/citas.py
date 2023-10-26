from fastapi import APIRouter, HTTPException, status, Depends
from db.models.Cita import Cita
from beanie import PydanticObjectId
from utils.auth import JWTValidator
from utils.cita import CitaList

router = APIRouter(
    prefix="/citas",
    tags=["Citas"],
    responses={404: {"Message": "No Encontrado"}},
)


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    dependencies={Depends(JWTValidator())},
)
async def crear_cita(cita: Cita) -> dict:
    nueva_cita = await cita.create()
    return {
        "mensaje": nueva_cita.nombre + " creada",
        "cita": {
            "nombre": nueva_cita.nombre,
            "telefono": nueva_cita.telefono,
            "descripcion": nueva_cita.descripcion,
            "fecha": nueva_cita.fecha,
            "validado": nueva_cita.validado,
        },
    }


@router.put("/{cita_id}", dependencies={Depends(JWTValidator())})
async def actualizar_cita(cita: Cita, cita_id: PydanticObjectId):
    cita_guardada = await Cita.get(cita_id)
    if not cita_guardada:
        raise HTTPException(status_code=404, detail="Cita no existe")

    cita_guardada.nombre = cita.nombre
    cita_guardada.telefono = cita.telefono
    cita_guardada.descripcion = cita.descripcion
    cita_guardada.fecha = cita.fecha
    cita_guardada.validado = cita.validado

    await cita_guardada.save()
    return {
        "mensaje": cita_guardada.nombre + " actualizado",
        "cita": {
            "nombre": cita_guardada.nombre,
            "telefono": cita_guardada.telefono,
            "descripcion": cita_guardada.descripcion,
            "fecha": cita_guardada.fecha,
            "validado": cita_guardada.validado,
        },
    }


@router.get("/", dependencies={Depends(JWTValidator())})
async def listar_citas():
    citas = await Cita.find_all().project(CitaList).to_list()
    return citas


@router.get("/{cita_id}", dependencies={Depends(JWTValidator())})
async def obtener_cita(cita_id: PydanticObjectId):
    cita = await Cita.find_one(Cita.id == cita_id)
    return {"paciente": cita}


@router.delete("/{cita_id}", dependencies={Depends(JWTValidator())})
async def eliminar_cita(cita_id: PydanticObjectId):
    cita_guardada = await Cita.get(cita_id)
    await cita_guardada.delete()
    return {
        "mensaje": "Cita eliminada",
        "cita": {
            "_id": str(cita_guardada.id),
            "nombre": cita_guardada.nombre,
        },
    }
