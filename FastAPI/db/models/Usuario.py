from beanie import Document
from utils.constants import Roles
from datetime import datetime


class Usuario(Document):
    nombre: str
    password: str
    especialidad: str
    igss: str
    fechaNacimiento: str  # Podrías considerar usar un campo específico para fechas
    genero: int
    dpi: str
    direccion: str
    municipio: str
    departamento: str
    nacionalidad: str
    telefono: str
    email: str
    estado_civil: str
    emergencia_nombre: str
    emergencia_parentesco: str
    emergencia_telefono: str
    salario: float
    bonos: float | None
    descuentos: float | None
    rol: Roles
    created_at: datetime = datetime.now()

    class Settings:
        name = "usuarios"
