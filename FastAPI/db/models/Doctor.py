from beanie import Document
from utils.constants import Roles
from datetime import datetime


class Doctor(Document):
    username: str
    nombre: str
    password: str
    especialidad: str
    igss: str
    fechaNacimiento: str
    genero: int
    dpi: int
    direccion: str
    municipio: str
    departamento: str
    nacionalidad: str
    telefono: int
    email: str
    estado_civil: str
    emergencia_nombre: str
    emergencia_parentesco: str
    emergencia_telefono: int
    salario: float
    confirmacion: str
    chatbot_conversacion: str
    bonos: float | None
    descuentos: float | None
    horarios: str | None

    # otra informacion
    validado: bool
    rol: Roles
    created_at: datetime = datetime.now()

    class Settings:
        name = "doctors"
