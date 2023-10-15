from beanie import Document
from utils.constants import Roles
from datetime import datetime


class Usuario(Document):
    username: str
    nombre: str
    password: str
    especialidad: str
    igss: str
    fechaNacimiento: str  # Podrías considerar usar un campo específico para fechas
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
    bonos: float | None
    descuentos: float | None
    rol: Roles
    created_at: datetime = datetime.now()

    class Settings:
        name = "usuarios"
