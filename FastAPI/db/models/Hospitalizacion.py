from pydantic import BaseModel
from beanie import Document
from typing import Optional, List
from datetime import datetime


class PacienteHospitalizacion(BaseModel):
    id: str
    nombre: str


class HospitalizacionPut(BaseModel):
    emergencia_nombre: str
    emergencia_telefono: str
    emergencia_parentesco: str
    diagnostico_egreso: str
    complicaciones: Optional[str] = ""
    operaciones: Optional[str] = ""
    activo: Optional[bool] = True
    dias_estancia: Optional[int] = None


class Operaciones(BaseModel):
    descripcion: str


class Complicaciones(BaseModel):
    descripcion: str


class Hospitalizacion(Document):
    emergencia_nombre: str
    emergencia_telefono: str
    emergencia_parentesco: str
    diagnostico_egreso: str
    fecha_inicio: Optional[datetime] = datetime.now()
    complicaciones: List[Complicaciones] = []
    operaciones: List[Operaciones] = []
    dias_estancia: Optional[int] = None
    activo: Optional[bool] = True
    paciente: PacienteHospitalizacion

    class Settings:
        name = "hospitalizaciones"
