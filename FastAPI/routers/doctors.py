from fastapi import APIRouter, HTTPException, status, Depends
from db.models.Doctor import Doctor
from utils.constants import JWT_SECRET, JWT_ALGORITHM, Roles
from beanie import PydanticObjectId
from utils.auth import JWTValidator
from utils.auth import Hasher
from utils.doctors import DoctorMin, DoctorList, Apoyo

router = APIRouter(
    prefix="/doctors", tags=["Doctores"], responses={404: {"Message": "No Encontrado"}}
)
# inicia el server: uvicorn users:router --reload


@router.post("/", dependencies={Depends(JWTValidator())})
async def crear_doctor(doctor: Doctor) -> dict:
    doctor.password = Hasher.get_password_hash(doctor.password)
    nuevo_doctor = await doctor.create()
    return Apoyo.vistaCrear(nuevo_doctor)


@router.put("/{doctor_id}", dependencies={Depends(JWTValidator())})
async def actualizar_doctor(doctor: Doctor, doctor_id: PydanticObjectId):
    doctor_guardado = await Doctor.get(doctor_id)
    if not doctor_guardado:
        raise HTTPException(status_code=404, detail="Doctor no existe")

    Apoyo.guardar_doctor(doctor_guardado, doctor)

    await doctor_guardado.save()
    return Apoyo.vistaActualizar(doctor_guardado)


@router.get("/", dependencies={Depends(JWTValidator())})
async def listar_doctors():
    doctors = await Doctor.find_all().project(DoctorList).to_list()
    return doctors


@router.get("/{doctor_id}", dependencies={Depends(JWTValidator())})
async def obtener_doctor(doctor_id: PydanticObjectId):
    doctor = await Doctor.find_one(Doctor.id == doctor_id).project(DoctorList)
    return {"doctor": doctor}


@router.delete("/{doctor_id}", dependencies={Depends(JWTValidator())})
async def eliminar_doctor(doctor_id: PydanticObjectId):
    doctor_guardado = await Doctor.get(doctor_id)
    await doctor_guardado.delete()
    return Apoyo.vistaDelete(doctor_guardado)
