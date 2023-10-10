from fastapi import APIRouter, HTTPException, status
from db.models.basemodel import Enfermero, Secretaria, Doctor, Admon

# from db.schemas.enfermero import enfermero_schema, enfermeros_schema

from db.schemas.user import (
    enfermero_schema,
    enfermeros_schema,
    secretaria_schema,
    secretarias_schema,
    doctor_schema,
    doctors_schema,
    admon_schema,
    admons_schema,
)
from db.client import db_client
from bson import ObjectId  # para tener un object id

router = APIRouter(
    prefix="/empleados",
    tags=["empleados"],
    responses={404: {"Message": "No Encontrado"}},
)

# inicia el server: uvicorn users:router --reload
# Entidad user
pathEnfermero = db_client.centromedicodb.enfermero
pathSecretaria = db_client.centromedicodb.secretaria
pathDoctor = db_client.centromedicodb.doctor
pathAdmon = db_client.centromedicodb.admon


@router.get("/enfermeros", response_model=list[Enfermero])
async def getEnfermero():
    print("hola mundo")
    return enfermeros_schema(pathEnfermero.find())


@router.get("/enfermero/nombre/{nombre}")
async def enfermeroNombre(nombre: str):
    return search_enfermero("nombre", nombre)


@router.post(
    "/enfermero",
    response_model=Enfermero,
    status_code=status.HTTP_201_CREATED,
)
async def enfermero(enfermero: Enfermero):
    if type(search_enfermero("nombre", enfermero.nombre)) == Enfermero:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="El enfermero ya Existe"
        )

    enfermero_dict = dict(enfermero)
    del enfermero_dict["id"]
    id = pathEnfermero.insert_one(enfermero_dict).inserted_id
    new_enfermero = enfermero_schema(pathEnfermero.find_one({"_id": id}))

    return Enfermero(**new_enfermero)


@router.put("/enfermero", response_model=Enfermero)
async def modificarEnfermero(enfermero: Enfermero):
    enfermero_dict = dict(enfermero)
    # print(paciente_dict)
    del enfermero_dict["id"]

    try:
        pathEnfermero.find_one_and_replace(
            {"_id": ObjectId(enfermero.id)}, enfermero_dict
        )
    except:
        return {"error": "No se ha Modificado el paciente"}

    return search_enfermero("_id", ObjectId(enfermero.id))


@router.delete("/enfermero/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def eliminarEnfermero(id: str):
    found = pathEnfermero.find_one_and_delete({"_id": ObjectId(id)})
    if not found:
        return {"error": "No se ha eliminado el usuario"}


def search_enfermero(field: str, key):
    try:
        enfermero = pathEnfermero.find_one({field: key})
        return Enfermero(**enfermero_schema(enfermero))
    except:
        return {"error": "No se a encontrado el paciente Search"}


@router.get("/secretarias", response_model=list[Secretaria])
async def getsecretarias():
    return secretarias_schema(pathSecretaria.find())


@router.get("/secretaria/nombre/{nombre}")
async def secretariaNombre(nombre: str):
    return search_secretaria("nombre", nombre)


@router.post(
    "/secretaria",
    response_model=Secretaria,
    status_code=status.HTTP_201_CREATED,
)
async def insertarSecretaria(secretaria: Secretaria):
    if type(search_secretaria("nombre", secretaria.nombre)) == Secretaria:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="La Secretaria ya Existe"
        )

    secretaria_dict = dict(secretaria)
    del secretaria_dict["id"]
    id = pathSecretaria.insert_one(secretaria_dict).inserted_id
    new_secretaria = secretaria_schema(pathSecretaria.find_one({"_id": id}))

    return Secretaria(**new_secretaria)


@router.put("/secretaria", response_model=Secretaria)
async def modificarSecretaria(secretaria: Secretaria):
    secretaria_dict = dict(enfermero)
    # print(paciente_dict)
    del secretaria_dict["id"]

    try:
        pathSecretaria.find_one_and_replace(
            {"_id": ObjectId(secretaria.id)}, secretaria_dict
        )
    except:
        return {"error": "No se ha Modificado el paciente"}

    return search_secretaria("_id", ObjectId(secretaria.id))


@router.delete("/secretaria/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def eliminarSecretaria(id: str):
    found = pathSecretaria.find_one_and_delete({"_id": ObjectId(id)})
    if not found:
        return {"error": "No se ha eliminado el usuario"}


def search_secretaria(field: str, key):
    try:
        secretaria = pathSecretaria.find_one({field: key})
        return Secretaria(**secretaria_schema(secretaria))
    except:
        return {"error": "No se a encontrado el paciente Search"}


@router.get("/doctors", response_model=list[Doctor])
async def getDoctores():
    return doctors_schema(pathDoctor.find())


@router.get("/doctor/nombre/{nombre}")
async def busqueda_doctor(nombre: str):
    return search_doctor("nombre", nombre)


@router.post(
    "/doctor",
    response_model=Doctor,
    status_code=status.HTTP_201_CREATED,
)
async def insertarDoctor(doctor: Doctor):
    if type(search_doctor("nombre", doctor.nombre)) == Doctor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="El Doctor ya Existe"
        )

    doctor_dict = dict(doctor)
    del doctor_dict["id"]
    id = pathDoctor.insert_one(doctor_dict).inserted_id
    new_doctor = doctor_schema(pathDoctor.find_one({"_id": id}))

    return Doctor(**new_doctor)


@router.put("/doctor", response_model=Doctor)
async def modificarDoctor(doctor: Doctor):
    doctor_dict = dict(doctor)
    # print(paciente_dict)
    del doctor_dict["id"]

    try:
        pathDoctor.find_one_and_replace({"_id": ObjectId(doctor.id)}, doctor_dict)
    except:
        return {"error": "No se ha Modificado el paciente"}

    return search_secretaria("_id", ObjectId(doctor.id))


@router.delete("/doctor/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def eliminarDoctor(id: str):
    found = pathDoctor.find_one_and_delete({"_id": ObjectId(id)})
    if not found:
        return {"error": "No se ha eliminado el Doctor"}


def search_doctor(field: str, key):
    try:
        doctor = pathDoctor.find_one({field: key})
        return Doctor(**doctor_schema(doctor))
    except:
        return {"error": "No se a encontrado el paciente Search"}
