from pydantic import BaseModel, Field
from beanie import PydanticObjectId
from utils.constants import Roles


class UsuarioMin(BaseModel):
    nombre: str
    telefono: int
    rol: Roles


class UsuarioList(BaseModel):
    id: PydanticObjectId = Field(alias="_id")
    username: str
    nombre: str
    telefono: int
    email: str
    rol: Roles


class Apoyo:
    def guardar_usuario(usuario_guardado, usuario):
        usuario_guardado.username = usuario.username
        usuario_guardado.nombre = usuario.nombre
        usuario_guardado.password = usuario.password
        usuario_guardado.especialidad = usuario.especialidad
        usuario_guardado.igss = usuario.igss
        usuario_guardado.fechaNacimiento = usuario.fechaNacimiento
        usuario_guardado.genero = usuario.genero
        usuario_guardado.dpi = usuario.dpi
        usuario_guardado.direccion = usuario.direccion
        usuario_guardado.municipio = usuario.municipio
        usuario_guardado.departamento = usuario.departamento
        usuario_guardado.nacionalidad = usuario.nacionalidad
        usuario_guardado.telefono = usuario.telefono
        usuario_guardado.email = usuario.email
        usuario_guardado.estado_civil = usuario.estado_civil
        usuario_guardado.emergencia_nombre = usuario.emergencia_nombre
        usuario_guardado.emergencia_parentesco = usuario.emergencia_parentesco
        usuario_guardado.emergencia_telefono = usuario.emergencia_telefono
        usuario_guardado.salario = usuario.salario
        usuario_guardado.bonos = usuario.bonos
        usuario_guardado.descuentos = usuario.descuentos
        usuario_guardado.rol = usuario.rol

    def vistaActualizacion(usuario_guardado):
        return {
            "mensaje": usuario_guardado.username + " actualizado",
            "usuario": {
                "nombre": usuario_guardado.nombre,
                "dpi": usuario_guardado.dpi,
                "especialidad": usuario_guardado.especialidad,
                "rol": usuario_guardado.rol,
                "telefono": usuario_guardado.telefono,
            },
        }

    def vistaDelete(usuario_guardado):
        return {
            "mensaje": "Usuario Eliminado",
            "usuario": {
                "_id": str(usuario_guardado.id),
                "nombre": usuario_guardado.username,
            },
        }

    def vistaCrear(nuevo_usuario):
        return {
            "_id": str(nuevo_usuario.id),
            "username": nuevo_usuario.username,
            "nombre": nuevo_usuario.nombre,
            "telefono": nuevo_usuario.telefono,
            "email": nuevo_usuario.email,
        }
