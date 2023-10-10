from db.models.basemodel import Paciente, Enfermero, Secretaria, Doctor, Admon


def paciente_schema(paciente: Paciente) -> dict:
    json = {
        "id": str(paciente["_id"]),
        "idPaciente": int(paciente["idPaciente"]),
        "consulta_numero": str(paciente["consulta_numero"]),
        "consulta_dia": str(paciente["consulta_dia"]),
        "dpi": str(paciente["dpi"]),
        "nombre": str(paciente["nombre"]),
        "fechaNacimiento": str(paciente["fechaNacimiento"]),
        "genero": str(paciente["genero"]),
        "direccion": str(paciente["direccion"]),
        "municipio": str(paciente["municipio"]),
        "departamento": str(paciente["departamento"]),
        "nacionalidad": str(paciente["nacionalidad"]),
        "telefono": int(paciente["telefono"]),
        "email": str(paciente["email"]),
        "igss": str(paciente["igss"]),
        "consulta_motivo": str(paciente["consulta_motivo"]),
        "numero_expediente": int(paciente["numero_expediente"])
        if "numero_expediente" in paciente
        else None,
        "etnia": str(paciente["etnia"]) if "etnia" in paciente else None,
        "ocupacion": str(paciente["ocupacion"]) if "ocupacion" in paciente else None,
        "estado_civil": str(paciente["estado_civil"])
        if "estado_civil" in paciente
        else None,
        "diagnostico": str(paciente["diagnostico"])
        if "diagnostico" in paciente
        else None,
        "tratamiento": str(paciente["tratamiento"])
        if "tratamiento" in paciente
        else None,
        "emergencia_nombre": str(paciente["emergencia_nombre"])
        if "emergencia_nombre" in paciente
        else None,
        "emergencia_telefono": int(paciente["emergencia_telefono"])
        if "emergencia_telefono" in paciente
        else None,
        "emergencia_parentesco": str(paciente["emergencia_parentesco"])
        if "emergencia_parentesco" in paciente
        else None,
        "diagnostico_egreso": str(paciente["diagnostico_egreso"])
        if "diagnostico_egreso" in paciente
        else None,
        "complicaciones": str(paciente["complicaciones"])
        if "complicaciones" in paciente
        else None,
        "operaciones": str(paciente["operaciones"])
        if "operaciones" in paciente
        else None,
        "dias_estancia": str(paciente["dias_estancia"])
        if "dias_estancia" in paciente
        else None,
        "autopsia": str(paciente["autopsia"]) if "autopsia" in paciente else None,
        "causa_de_muerte": str(paciente["causa_de_muerte"])
        if "causa_de_muerte" in paciente
        else None,
    }
    return json


def enfermero_schema(enfermero: Enfermero) -> dict:
    json = {
        "id": str(enfermero["_id"]),
        "idEnfermero": str(enfermero["idEnfermero"]),
        "dpi": str(enfermero["dpi"]),
        "nombre": str(enfermero["nombre"]),
        "pw": str(enfermero["pw"]),
        "pwhash": str(enfermero["pwhash"]),
        "especialidad": str(enfermero["especialidad"]),
        "igss": str(enfermero["igss"]),
        "fechaNacimiento": str(enfermero["fechaNacimiento"]),
        "genero": str(enfermero["genero"]),
        "direccion": str(enfermero["direccion"]),
        "municipio": str(enfermero["municipio"]),
        "departamento": str(enfermero["departamento"]),
        "nacionalidad": str(enfermero["nacionalidad"]),
        "telefono": str(enfermero["telefono"]),
        "email": str(enfermero["email"]),
        "estado_civil": str(enfermero["estado_civil"]),
        "emergencia_nombre": str(enfermero["emergencia_nombre"]),
        "emergencia_parentesco": str(enfermero["emergencia_parentesco"]),
        "emergencia_telefono": int(enfermero["emergencia_telefono"]),
        "salario": float(enfermero["salario"]),
        "bonos": str(enfermero["bonos"]) if "bonos" in enfermero else None,
        "descuentos": str(enfermero["descuentos"])
        if "descuentos" in enfermero
        else None,
    }
    return json


def secretaria_schema(secretaria: Secretaria) -> dict:
    json = {
        "id": str(secretaria["_id"]),
        "idSecretaria": str(secretaria["idSecretaria"]),
        "dpi": str(secretaria["dpi"]),
        "nombre": str(secretaria["nombre"]),
        "pw": str(secretaria["pw"]),
        "pwhash": str(secretaria["pwhash"]),
        "especialidad": str(secretaria["especialidad"]),
        "igss": str(secretaria["igss"]),
        "fechaNacimiento": str(secretaria["fechaNacimiento"]),
        "genero": str(secretaria["genero"]),
        "direccion": str(secretaria["direccion"]),
        "municipio": str(secretaria["municipio"]),
        "departamento": str(secretaria["departamento"]),
        "nacionalidad": str(secretaria["nacionalidad"]),
        "telefono": str(secretaria["telefono"]),
        "email": str(secretaria["email"]),
        "estado_civil": str(secretaria["estado_civil"]),
        "emergencia_nombre": str(secretaria["emergencia_nombre"]),
        "emergencia_parentesco": str(secretaria["emergencia_parentesco"]),
        "emergencia_telefono": int(secretaria["emergencia_telefono"]),
        "salario": float(secretaria["salario"]),
        "bonos": str(secretaria["bonos"]) if "bonos" in secretaria else None,
        "descuentos": str(secretaria["descuentos"])
        if "descuentos" in secretaria
        else None,
    }
    return json


def doctor_schema(doctor: Doctor) -> dict:
    json = {
        "id": str(doctor["_id"]),
        "idDoctor": str(doctor["idDoctor"]),
        "dpi": str(doctor["dpi"]),
        "nombre": str(doctor["nombre"]),
        "pw": str(doctor["pw"]),
        "pwhash": str(doctor["pwhash"]),
        "especialidad": str(doctor["especialidad"]),
        "igss": str(doctor["igss"]),
        "fechaNacimiento": str(doctor["fechaNacimiento"]),
        "genero": int(doctor["genero"]),
        "direccion": str(doctor["direccion"]),
        "municipio": str(doctor["municipio"]),
        "departamento": str(doctor["departamento"]),
        "nacionalidad": str(doctor["nacionalidad"]),
        "telefono": int(doctor["telefono"]),
        "email": str(doctor["email"]),
        "estado_civil": str(doctor["estado_civil"]),
        "emergencia_nombre": str(doctor["emergencia_nombre"]),
        "emergencia_parentesco": str(doctor["emergencia_parentesco"]),
        "emergencia_telefono": int(doctor["emergencia_telefono"]),
        "salario": float(doctor["salario"]),
        "bonos": float(doctor["bonos"]) if "bonos" in doctor else None,
        "descuentos": float(doctor["descuentos"]) if "descuentos" in doctor else None,
        "confirmacion": str(doctor["confirmacion"]),
        "horarios": str(doctor["horarios"]) if "horarios" in doctor else None,
        "chatbot_conversacion": str(doctor["chatbot_conversacion"]),
    }
    return json


def admon_schema(admon: Admon) -> dict:
    json = {
        "id": str(admon["_id"]),
        "idadmon": str(admon["idadmon"]),
        "dpi": str(admon["dpi"]),
        "nombre": str(admon["nombre"]),
        "pw": str(admon["pw"]),
        "pwhash": str(admon["pwhash"]),
        "especialidad": str(admon["especialidad"]),
        "igss": str(admon["igss"]),
        "fechaNacimiento": str(admon["fechaNacimiento"]),
        "genero": int(admon["genero"]),
        "direccion": str(admon["direccion"]),
        "municipio": str(admon["municipio"]),
        "departamento": str(admon["departamento"]),
        "nacionalidad": str(admon["nacionalidad"]),
        "telefono": int(admon["telefono"]),
        "email": str(admon["email"]),
        "estado_civil": str(admon["estado_civil"]),
        "emergencia_nombre": str(admon["emergencia_nombre"]),
        "emergencia_parentesco": str(admon["emergencia_parentesco"]),
        "emergencia_telefono": int(admon["emergencia_telefono"]),
        "salario": float(admon["salario"]),
        "bonos": float(admon["bonos"]) if "bonos" in admon["bonos"] else None,
        "descuentos": float(admon["descuentos"]) if "descuentos" in admon else None,
        "confirmacion": str(admon["confirmacion"]),
        "confirmar_horarios": str(admon["horarios"]) if "horarios" in admon else None,
        "chatbot_conversacion": str(admon["chatbot_conversacion"]),
    }
    return json


def user_schema(user) -> dict:
    return {
        "id": str(user["_id"]),
        "username": user["username"],
        "email": user["email"],
    }


def users_schema(users) -> dict:
    return [user_schema(user) for user in users]


def pacientes_schema(pacientes) -> dict:
    return [paciente_schema(paciente) for paciente in pacientes]


def enfermeros_schema(enfermeros) -> dict:
    return [enfermero_schema(enfermero) for enfermero in enfermeros]


def secretarias_schema(secretarias) -> dict:
    return [secretaria_schema(secretaria) for secretaria in secretarias]


def doctors_schema(doctors) -> dict:
    return [doctor_schema(doctor) for doctor in doctors]


def admons_schema(admons) -> dict:
    return [admon_schema(admon) for admon in admons]
