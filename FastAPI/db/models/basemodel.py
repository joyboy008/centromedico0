from pydantic import BaseModel


class Paciente(BaseModel):
    id: str | None
    idPaciente: int
    consulta_numero: str
    consulta_dia: str
    dpi: str
    nombre: str
    fechaNacimiento: str
    genero: str
    direccion: str
    municipio: str
    departamento: str
    nacionalidad: str
    telefono: int
    email: str
    igss: str
    consulta_motivo: str
    numero_expediente: int | None
    etnia: str | None
    ocupacion: str | None
    estado_civil: str | None
    diagnostico: str | None
    tratamiento: str | None
    emergencia_nombre: str | None
    emergencia_telefono: int | None
    emergencia_parentesco: str | None
    diagnostico_egreso: str | None
    complicaciones: str | None
    operaciones: str | None
    dias_estancia: str | None
    autopsia: str | None
    causa_de_muerte: str | None


class Enfermero(BaseModel):
    id: str | None
    idEnfermero: int
    dpi: int
    nombre: str
    pw: str  # Considera usar un campo específico para contraseñas como PasswordStr
    pwhash: str
    especialidad: str
    igss: str
    fechaNacimiento: str  # Podrías considerar usar un campo específico para fechas
    genero: int
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


class Secretaria(BaseModel):
    id: str | None
    idSecretaria: int
    dpi: int
    nombre: str
    pw: str
    pwhash: str
    especialidad: str
    igss: str
    fechaNacimiento: str
    genero: int
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


class Doctor(BaseModel):
    id: str | None
    idDoctor: int
    dpi: int
    nombre: str
    pw: str  # Considera usar un campo específico para contraseñas como PasswordStr
    pwhash: str
    especialidad: str
    igss: str
    fechaNacimiento: str  # Podrías considerar usar un campo específico para fechas
    genero: int
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
    confirmacion: str
    horarios: str | None
    chatbot_conversacion: str


class Admon(BaseModel):
    id: str | None
    idAdmon: int
    dpi: int
    nombre: str
    pw: str  # Considera usar un campo específico para contraseñas como PasswordStr
    pwhash: str
    especialidad: str
    igss: str
    fechaNacimiento: str  # Podrías considerar usar un campo específico para fechas
    genero: int
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
    confirmacion: str
    confirmar_horarios: str
    chatbot_conversacion: str


class Paciente11(BaseModel):
    id: str | None
    dpi: str
    nombre: str
    apellido: str


class User(BaseModel):
    id: str | None
    username: str | None
    email: str | None
