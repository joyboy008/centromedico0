from beanie import Document
from typing import Optional, List
from pydantic import BaseModel


class Chat(Document):
    conversacion_id: str
    preguntas_anteriores: List[str] = []
    respuestas_anteriores: List[str] = []
    cita_realizada: bool = False

    class Settings:
        name = "chat"


class ChatInteraccion(BaseModel):
    mensaje: str
    fecha: Optional[str]
