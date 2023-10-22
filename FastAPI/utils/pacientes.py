from pydantic import BaseModel, Field
from beanie import PydanticObjectId
from typing import Optional
from datetime import datetime
from db.models.Paciente import UsuarioResponsable


class PacienteList(BaseModel):
    id: PydanticObjectId = Field(alias="_id")
    nombre: str
    telefono: int
    fechaNacimiento: str


class UnPaciente(BaseModel):
    nombre: str
    fechaNacimiento: str
    genero: int
    dpi: int
    direccion: str
    municipio: str
    departamento: str
    nacionalidad: str
    telefono: int
    email: str
    igss: str
    numero_expediente: Optional[int] = None
    etnia: Optional[str] = None
    ocupacion: Optional[str] = None
    estado_civil: Optional[str] = None
    autopsia: Optional[str] = None
    causa_de_muerte: Optional[str] = None

    # otra informacion
    validado: bool
    usuario_encargado: UsuarioResponsable
    created_at: datetime = datetime.now()


class Apoyo:
    def guardar_paciente(paciente_guardado, paciente):
        paciente_guardado.nombre = paciente.nombre
        paciente_guardado.fechaNacimiento = paciente.fechaNacimiento
        paciente_guardado.genero = paciente.genero
        paciente_guardado.dpi = paciente.dpi
        paciente_guardado.direccion = paciente.direccion
        paciente_guardado.municipio = paciente.municipio
        paciente_guardado.departamento = paciente.departamento
        paciente_guardado.nacionalidad = paciente.nacionalidad
        paciente_guardado.telefono = paciente.telefono
        paciente_guardado.email = paciente.email
        paciente_guardado.igss = paciente.igss
        # paciente_guardado.consulta.consulta_motivo = paciente.consulta.consulta_motivo
        # paciente_guardado.consulta.consulta_numero = paciente.consulta.consulta_numero
        # paciente_guardado.consulta.consulta_dia = paciente.consulta.consulta_dia
        # paciente_guardado.consulta.diagnostico = paciente.consulta.diagnostico
        # paciente_guardado.consulta.tratamiento = paciente.consulta.tratamiento
        paciente_guardado.numero_expediente = paciente.numero_expediente
        paciente_guardado.etnia = paciente.etnia
        paciente_guardado.ocupacion = paciente.ocupacion
        paciente_guardado.estado_civil = paciente.estado_civil
        # paciente_guardado.hospitalizacion.emergencia_nombre = (
        #     paciente.hospitalizacion.emergencia_nombre
        # )
        # paciente_guardado.hospitalizacion.emergencia_telefono = (
        #     paciente.hospitalizacion.emergencia_telefono
        # )
        # paciente_guardado.hospitalizacion.emergencia_parentesco = (
        #     paciente.hospitalizacion.emergencia_parentesco
        # )
        # paciente_guardado.hospitalizacion.diagnostico_egreso = (
        #     paciente.hospitalizacion.diagnostico_egreso
        # )
        # paciente_guardado.hospitalizacion.complicaciones = (
        #     paciente.hospitalizacion.complicaciones
        # )
        # paciente_guardado.hospitalizacion.operaciones = (
        #     paciente.hospitalizacion.operaciones
        # )
        # paciente_guardado.hospitalizacion.dias_estancia = (
        #     paciente.hospitalizacion.dias_estancia
        # )
        paciente_guardado.autopsia = paciente.autopsia
        paciente_guardado.causa_de_muerte = paciente.causa_de_muerte
        paciente_guardado.validado = paciente.validado
        paciente_guardado.usuario_encargado.email = paciente.usuario_encargado.email
        paciente_guardado.usuario_encargado.rol = paciente.usuario_encargado.rol

    def vistaCrear(nuevo_paciente):
        return {
            "nombre": nuevo_paciente.nombre,
            "telefono": nuevo_paciente.telefono,
            "fechaNacimiento": nuevo_paciente.fechaNacimiento
            # "consulta": nuevo_paciente.consulta,
        }

    def vistaActualizar(paciente_guardado):
        return {
            "mensaje": paciente_guardado.nombre + " actualizado",
            "paciente": {
                "telefono": paciente_guardado.telefono,
                # "consulta.consulta_motivo": paciente_guardado.consulta.consulta_motivo,
            },
        }

    def vistaDelete(paciente_guardado):
        return {
            "mensaje": "Usuario Eliminado",
            "paciente": {
                "_id": str(paciente_guardado.id),
                "nombre": paciente_guardado.nombre,
            },
        }
