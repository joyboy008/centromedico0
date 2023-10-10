from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(
    prefix="/user", tags=["users"], responses={404: {"Message": "No Encontrado"}}
)

# inicia el server: uvicorn users:router --reload


# Entidad user
class User(BaseModel):
    id: int
    name: str
    apellido: str
    url: str
    age: int
    post: str


user_list = [
    User(
        id=1,
        name="Marlon",
        apellido="Ralda,",
        url="https://adidas.com",
        age=34,
        post="hola este es mi primer post",
    ),
    User(
        id=2,
        name="Diego",
        apellido="Diaz,",
        url="https://amazon.com",
        age=44,
        post="hola este es mi primer post",
    ),
    User(
        id=3,
        name="Julio",
        apellido="Perez,",
        url="https://nike.com",
        age=23,
        post="hola este es mi primer post",
    ),
]


@router.get("/")
async def user():
    return user_list


# path
@router.get("/{id}")
async def user(id: int):
    return search_user(id)


# Query
@router.get("query/")
async def user(id: int):
    return search_user(id)


@router.post("/user/", response_model=User, status_code=201)  # HTTP Status code
async def user(user: User):
    if type(search_user(user.id)) == User:
        raise HTTPException(
            status_code=404, detail="El usuario ya Existe"
        )  # esto es para cambiar el status Code

    user_list.append(user)
    return user


@router.put("/")
async def user(user: User):
    found = False
    for index, saved_user in enumerate(user_list):
        if saved_user.id == user.id:
            user_list[index] = user
            found = True

    if not found:
        return {"error": "No se ha actualizado el usuario"}

    return user


@router.delete("/{id}")
async def user(id: int):
    found = False
    for index, saved_user in enumerate(user_list):
        if saved_user.id == id:
            del user_list[index]
            found = True

    if not found:
        return {"error": "No se ha eliminado el usuario"}


def search_user(id: int):
    users = filter(lambda user: user.id == id, user_list)
    try:
        return list(users)[0]
    except:
        return {"error": "No se a encontrado el usuario"}


@router.get("sjson")
async def userjson():
    return [
        {
            "name": "Marlon",
            "apellido": "Ralda",
            "url": "https://adidas.com",
            "Age": "32",
        },
        {
            "name": "Diego",
            "apellido": "Sitsio",
            "url": "https://nike.com",
            "Age": "32",
        },
        {
            "name": "Julian",
            "apellido": "Perza",
            "url": "https://amazon.com",
            "Age": "32",
        },
    ]
