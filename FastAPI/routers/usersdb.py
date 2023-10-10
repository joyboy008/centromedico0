from fastapi import APIRouter, HTTPException, status
from db.models.basemodel import User, Paciente
from db.schemas.user import user_schema, users_schema, paciente_schema, pacientes_schema
from db.client import db_client
from bson import ObjectId  # para tener un object id

router = APIRouter(
    prefix="/userdb", tags=["usersdb"], responses={404: {"Message": "No Encontrado"}}
)

# inicia el server: uvicorn users:router --reload

# Entidad user

path = db_client.local.users
path1 = db_client.local.paciente


@router.get("/", response_model=list[User])
async def users():
    return users_schema(path.find())


@router.get("/1", response_model=list[Paciente])
async def pacientes():
    return pacientes_schema(path1.find())


# path
@router.get("/{id}")
async def user(id: str):
    return search_user("_id", ObjectId(id))


# Query
@router.get("/")
async def user(id: str):
    return search_user("_id", ObjectId(id))


@router.post(
    "/", response_model=User, status_code=status.HTTP_201_CREATED
)  # HTTP Status code
async def user(user: User):
    if type(search_user("email", user.email)) == User:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="El usuario ya Existe"
        )  # esto es para cambiar el status Code

    user_dict = dict(user)
    del user_dict["id"]
    path = db_client.local.users
    id = path.insert_one(user_dict).inserted_id
    new_user = user_schema(path.find_one({"_id": id}))

    return User(**new_user)


@router.post(
    "/1",
    response_model=Paciente,
    status_code=status.HTTP_201_CREATED,
)  # HTTP Status code
async def paciente(paciente: Paciente):
    if type(search_paciente("dpi", paciente.dpi)) == Paciente:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="El paciente ya Existe"
        )  # esto es para cambiar el status Code

    paciente_dict = dict(paciente)
    del paciente_dict["id"]
    id = path1.insert_one(paciente_dict).inserted_id
    new_paciente = paciente_schema(path1.find_one({"_id": id}))

    return Paciente(**new_paciente)


@router.put("/", response_model=User)
async def user(user: User):
    user_dict = dict(user)
    print(user_dict)
    del user_dict["id"]

    try:
        path.find_one_and_replace({"_id": ObjectId(user.id)}, user_dict)
    except:
        return {"error": "No se ha actualizado el usuario"}

    return search_user("_id", ObjectId(user.id))


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
        return {"error": "No se a encontrado el paciente"}


def search_paciente_user(field: str, key):
    try:
        paciente = path1.find_one({field: key})
        user = path.find_one({field: key})

        return Paciente(**paciente_schema(paciente)), User(**user_schema(user))
    except:
        return {"error": "No se a encontrado el paciente"}
