from beanie import Document
from typing import Optional
from datetime import datetime


class Cita(Document):
    nombre: str
    telefono: str
    descripcion: str
    fecha: Optional[datetime]
    validado: bool = False

    class Settings:
        name = "citas"
