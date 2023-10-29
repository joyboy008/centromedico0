from pydantic import BaseModel, Field
from beanie import PydanticObjectId
from utils.constants import Roles
from typing import Optional
from utils.auth import Hasher


class UsuarioMin(BaseModel):
    nombre: str
    telefono: int
    rol: Roles


class UsuarioList(BaseModel):
    id: PydanticObjectId = Field(alias="_id")
    nombre: str
    dpi: str
    telefono: str
    fechaNacimiento: str
    rol: Roles


class UsuarioActualizar(BaseModel):
    id: PydanticObjectId = Field(alias="_id")
    nombre: str
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


class UsuarioPut(BaseModel):
    nombre: str
    password: Optional[str] = None
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


class Apoyo:
    def guardar_usuario(usuario_guardado, usuario):
        usuario_guardado.nombre = usuario.nombre
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

        if usuario.password:
            usuario_guardado.password = Hasher.get_password_hash(usuario.password)

    def vistaActualizacion(usuario_guardado):
        return {
            "mensaje": usuario_guardado.nombre + " actualizado",
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
                "nombre": usuario_guardado.nombre,
            },
        }

    def vistaCrear(nuevo_usuario):
        return {
            "_id": str(nuevo_usuario.id),
            "nombre": nuevo_usuario.nombre,
            "telefono": nuevo_usuario.telefono,
            "email": nuevo_usuario.email,
        }
