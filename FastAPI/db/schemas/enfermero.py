from db.models.basemodel import Enfermero


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


def enfermeros_schema(enfermeros) -> dict:
    return [enfermero_schema(enfermero) for enfermero in enfermeros]
