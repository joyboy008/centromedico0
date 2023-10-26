from db.models.Cita import Cita
from beanie import PydanticObjectId
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


def crear_cita(cita_texto) -> dict:
    citaDatos = cita_texto.split(",")
    citaObj = {}

    for citaCampo in citaDatos:
        datos = citaCampo.split("@")
        citaObj[datos[0].strip()] = datos[1].strip()

    return dict(citaObj)


class CitaList(BaseModel):
    id: PydanticObjectId = Field(alias="_id")
    nombre: str
    telefono: str
    descripcion: str
    fecha: Optional[datetime]
    validado: bool = False
