from beanie import Document
from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class PacienteConsulta(BaseModel):
    id: str
    nombre: str


class ConsultaEstado(BaseModel):
    activo: bool


class ConsultaPut(BaseModel):
    consulta_motivo: str
    consulta_dia: datetime = datetime.now()  # o candelarizar en el front
    diagnostico: Optional[str] = None
    tratamiento: Optional[str] = None
    activo: Optional[bool] = True


class Consulta(Document):
    consulta_motivo: str
    consulta_numero: Optional[int] = 1  # Revisar cuantas consultas existen
    consulta_dia: datetime = datetime.now()  # o candelarizar en el front
    diagnostico: Optional[str] = None
    tratamiento: Optional[str] = None
    paciente: PacienteConsulta
    activo: Optional[bool] = True

    class Settings:
        name = "consultas"
