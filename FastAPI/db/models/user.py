from pydantic import BaseModel


class User(BaseModel):
    id: str | None
    username: str | None
    email: str | None


class Direccion(BaseModel):
    calle: str
    avenida: str
    casa: str
    extra: str | None
    zona: str
    municipio: str
    departamento: str


class Lugar(BaseModel):
    municipio: str
    departamento: str
    pais: str


class Nacimiento(BaseModel):
    dia: int
    mes: int
    anio: int
    lugar: Lugar


class Edad(BaseModel):
    anios: int
    meses: int
    dias: int


class EmergenciaDireccion(BaseModel):
    calle: str
    avenida: str
    casa: str
    extra: str | None
    zona: str
    municipio: str
    departamento: str


class Emergencia(BaseModel):
    telefono: str
    parentesco: str
    direccion: EmergenciaDireccion


class DiagnosticoEgreso(BaseModel):
    diagnostico: str
    codigo: str


class Ingreso(BaseModel):
    hora: str
    servicio: str


class Egreso(BaseModel):
    hora: str
    servicio: str
    dias_estancia: int
    diagnostico_egreso: DiagnosticoEgreso


class Operacion(BaseModel):
    operacion: str
    codigo: str


class Hospitalizacion(BaseModel):
    ingreso: Ingreso
    egreso: Egreso
    complicaciones: str
    operaciones: list[Operacion]
    opcionEgreso: str
    causa_muerte: str
    fecha: str
    firma: str


class Paciente1(BaseModel):
    dpi: str
    nombre: str
    nombre2: str
    nombre3: str
    apellido: str
    apellido2: str
    expediente_medico: str
    direccion: Direccion
    telefono: str
    nacimiento: Nacimiento
    edad: Edad
    sexo: str
    estado_civil: str
    ocupacion: str
    emergencia: Emergencia | None
    hospitalizacion: Hospitalizacion | None


class Paciente(BaseModel):
    id: str | None
    dpi: str
    nombre: str
    apellido: str
