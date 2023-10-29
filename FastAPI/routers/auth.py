import time
from fastapi.exceptions import HTTPException
from fastapi import APIRouter, Body
from db.models.Usuario import Usuario
from utils.constants import JWT_ALGORITHM, JWT_SECRET
from utils.auth import Hasher, Credentials
from typing import Annotated
import jwt

router = APIRouter(
    prefix="/auth", tags=["Auth"], responses={404: {"mensaje": "No Encontrado"}}
)


@router.post("/login")
async def login(credenciales: Credentials) -> dict:
    # Obtener y validar el password
    usuario_guardado = await Usuario.find_one(Usuario.email == credenciales.email)
    if not usuario_guardado:
        raise HTTPException(status_code=400, detail="Usuario o password incorrecto")

    password_valido = Hasher.verify_password(
        credenciales.password, usuario_guardado.password
    )
    if not password_valido:
        raise HTTPException(status_code=400, detail="Usuario o password incorrecto")

    # Generar el JWT token
    payload = {"user_id": str(usuario_guardado.id), "expires": time.time() + 600}

    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return {
        "_id": str(usuario_guardado.id),
        "email": usuario_guardado.email,
        "rol": usuario_guardado.rol,
        "token": token,
    }
