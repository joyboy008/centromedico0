from pydantic import BaseModel, Field
from beanie import PydanticObjectId
from utils.constants import Roles


class DoctorMin(BaseModel):
    username: str
    nombre: str
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


class DoctorList(BaseModel):
    id: PydanticObjectId = Field(alias="_id")
    username: str
    nombre: str
    telefono: int
    email: str
    rol: Roles


class Apoyo:
    def guardar_doctor(doctor_guardado, doctor):
        doctor_guardado.username = doctor.username
        doctor_guardado.nombre = doctor.nombre
        doctor_guardado.password = doctor.password
        doctor_guardado.especialidad = doctor.especialidad
        doctor_guardado.igss = doctor.igss
        doctor_guardado.fechaNacimiento = doctor.fechaNacimiento
        doctor_guardado.genero = doctor.genero
        doctor_guardado.dpi = doctor.dpi
        doctor_guardado.direccion = doctor.direccion
        doctor_guardado.municipio = doctor.municipio
        doctor_guardado.departamento = doctor.departamento
        doctor_guardado.nacionalidad = doctor.nacionalidad
        doctor_guardado.telefono = doctor.telefono
        doctor_guardado.email = doctor.email
        doctor_guardado.estado_civil = doctor.estado_civil
        doctor_guardado.emergencia_nombre = doctor.emergencia_nombre
        doctor_guardado.emergencia_parentesco = doctor.emergencia_parentesco
        doctor_guardado.emergencia_telefono = doctor.emergencia_telefono
        doctor_guardado.salario = doctor.salario
        doctor_guardado.confirmacion = doctor.confirmacion
        doctor_guardado.chatbot_conversacion = doctor.chatbot_conversacion
        doctor_guardado.bonos = doctor.bonos
        doctor_guardado.descuentos = doctor.descuentos
        doctor_guardado.horarios = doctor.horarios
        doctor_guardado.validado = doctor.validado
        doctor_guardado.rol = doctor.rol

    def vistaCrear(nuevo_doctor):
        return {
            "_id": str(nuevo_doctor.id),
            "nombre": nuevo_doctor.nombre,
            "telefono": nuevo_doctor.telefono,
            "email": nuevo_doctor.email,
        }

    def vistaActualizar(doctor_guardado):
        return {
            "mensaje": doctor_guardado.username + " actualizado",
            "doctor": {
                "nombre": doctor_guardado.nombre,
                "dpi": doctor_guardado.dpi,
                "especialidad": doctor_guardado.especialidad,
                "telefono": doctor_guardado.telefono,
                "rol": doctor_guardado.rol,
            },
        }

    def vistaDelete(doctor_guardado):
        return {
            "mensaje": "Doctor Eliminado",
            "usuario": {
                "_id": str(doctor_guardado.id),
                "nombre": doctor_guardado.username,
            },
        }
