from fastapi import APIRouter, HTTPException, status
from db.models.basemodel import User, Paciente
from db.schemas.user import user_schema, users_schema, paciente_schema, pacientes_schema
from db.client import db_client
from bson import ObjectId  # para tener un object id

router = APIRouter(
    prefix="/pacientesdb",
    tags=["pacientesdb"],
    responses={404: {"Message": "No Encontrado"}},
)

# inicia el server: uvicorn users:router --reload
# Entidad user

path = db_client.local.users
path1 = db_client.local.pacientes


@router.get("/", response_model=list[Paciente])
async def pacientes():
    return pacientes_schema(path1.find())


@router.get("/dpi/{dpi}")
async def pacienteDpi(dpi: str):
    return search_paciente("dpi", dpi)


@router.get("/apellido/{apellido}")
async def pacienteApellido(apellido: str):
    return search_paciente("apellido", apellido)


# path                  por si necesitas buscar por id mas adelante...
# @router.get("/{id}")
# async def paciente(id: str):
#     return search_paciente("_id", ObjectId(id))


# # Query
# @router.get("/")
# async def user(id: str):
#     return search_user("_id", ObjectId(id))


# @router.post( # Busqueda por DPI
#     "/",
#     response_model=Paciente,
#     status_code=status.HTTP_201_CREATED,
# )  # HTTP Status code
# async def paciente(paciente: Paciente):
#     if type(search_paciente("dpi", paciente.dpi)) == Paciente:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND, detail="El paciente ya Existe"
#         )  # esto es para cambiar el status Code

#     paciente_dict = dict(paciente)
#     del paciente_dict["id"]
#     id = path1.insert_one(paciente_dict).inserted_id
#     new_paciente = paciente_schema(path1.find_one({"_id": id}))

#     return Paciente(**new_paciente)


@router.post(  # Busqueda por nombre, falta agregar la condicion del nacimiento
    "/",
    response_model=Paciente,
    status_code=status.HTTP_201_CREATED,
)  # HTTP Status code
async def paciente(paciente: Paciente):
    if type(search_paciente("nombre", paciente.nombre)) == Paciente:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="El paciente ya Existe"
        )  # esto es para cambiar el status Code

    paciente_dict = dict(paciente)
    del paciente_dict["id"]
    id = path1.insert_one(paciente_dict).inserted_id
    new_paciente = paciente_schema(path1.find_one({"_id": id}))

    return Paciente(**new_paciente)


@router.put("/", response_model=Paciente)
async def paciente(paciente: Paciente):
    paciente_dict = dict(paciente)
    # print(paciente_dict)
    del paciente_dict["id"]
    try:
        path1.find_one_and_replace({"_id": ObjectId(paciente.id)}, paciente_dict)
    except:
        return {"error": "No se ha Modificado el paciente"}

    return search_paciente("_id", ObjectId(paciente.id))


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def user(id: str):
    found = path.find_one_and_delete({"_id": ObjectId(id)})

    if not found:
        return {"error": "No se ha eliminado el usuario"}


def search_user_by_email(email: str):
    try:
        user = path.find_one({"email": email})
        return User(**user_schema(user))
    except:
        return {"error": "No se a encontrado el usuario"}


def search_user(field: str, key):
    try:
        user = path.find_one({field: key})
        return User(**user_schema(user))
    except:
        return {"error": "No se a encontrado el usuario"}


def search_paciente(field: str, key):
    try:
        paciente = path1.find_one({field: key})
        return Paciente(**paciente_schema(paciente))
    except:
        return {"error": "No se a encontrado el paciente Search"}
