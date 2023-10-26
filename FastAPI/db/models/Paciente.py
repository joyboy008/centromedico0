from beanie import Document
from pydantic import BaseModel
from utils.constants import Roles
from datetime import datetime
from typing import Optional


class UsuarioResponsable(BaseModel):
    email: str
    rol: Roles


class Consulta(BaseModel):
    consulta_motivo: str
    consulta_numero: int  # Revisar cuantas consultas existen
    consulta_dia: datetime = datetime.now()  # o candelarizar en el front
    diagnostico: str | None
    tratamiento: str | None


class Hospitalizacion(BaseModel):
    emergencia_nombre: str | None
    emergencia_telefono: int | None
    emergencia_parentesco: str | None
    diagnostico_egreso: str | None
    complicaciones: str | None
    operaciones: str | None
    dias_estancia: int | None


class Paciente(Document):
    nombre: str
    fechaNacimiento: str
    genero: int
    dpi: str
    direccion: str
    municipio: str
    departamento: str
    nacionalidad: str
    telefono: str
    email: str
    igss: str
    numero_expediente: Optional[str] = None
    etnia: Optional[str] = None
    ocupacion: Optional[str] = None
    estado_civil: Optional[str] = None
    autopsia: Optional[str] = None
    causa_de_muerte: Optional[str] = None

    # otra informacion
    validado: bool
    usuario_encargado: UsuarioResponsable
    created_at: datetime = datetime.now()

    class Settings:
        name = "pacientes"
