from fastapi import APIRouter, HTTPException, status, Depends
from db.models.Usuario import Usuario
from utils.constants import JWT_SECRET, JWT_ALGORITHM, Roles
from beanie import PydanticObjectId
from utils.auth import JWTValidator
from utils.auth import Hasher
from utils.usuarios import UsuarioMin, UsuarioList, Apoyo

router = APIRouter(
    prefix="/usuarios", tags=["Usuarios"], responses={404: {"Message": "No Encontrado"}}
)
# inicia el server: uvicorn users:router --reload


@router.post("/", dependencies={Depends(JWTValidator())})
async def crear_usuario(usuario: Usuario) -> dict:
    usuario.password = Hasher.get_password_hash(usuario.password)
    nuevo_usuario = await usuario.create()
    return Apoyo.vistaCrear(nuevo_usuario)


@router.put("/{usuario_id}", dependencies={Depends(JWTValidator())})
async def actualizar_usuario(usuario: Usuario, usuario_id: PydanticObjectId):
    usuario_guardado = await Usuario.get(usuario_id)
    if not usuario_guardado:
        raise HTTPException(status_code=404, detail="Usuario no existe")

    Apoyo.guardar_usuario(usuario_guardado, usuario)

    await usuario_guardado.save()

    return Apoyo.vistaActualizacion(usuario_guardado)


@router.get("/", dependencies={Depends(JWTValidator())})
async def listar_usuarios():
    usuarios = await Usuario.find_all().project(UsuarioList).to_list()
    return usuarios


@router.get("/{usuario_id}", dependencies={Depends(JWTValidator())})
async def obtener_usuario(usuario_id: PydanticObjectId):
    usuario = await Usuario.find_one(Usuario.id == usuario_id).project(UsuarioList)
    return {"usuario": usuario}


@router.delete("/{usuario_id}", dependencies={Depends(JWTValidator())})
async def eliminar_usuario(usuario_id: PydanticObjectId):
    usuario_guardado = await Usuario.get(usuario_id)
    await usuario_guardado.delete()
    return Apoyo.vistaDelete(usuario_guardado)
