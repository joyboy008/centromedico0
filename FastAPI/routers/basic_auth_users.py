from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

router = APIRouter()

oauth2 = OAuth2PasswordBearer(tokenUrl="login")


class User(BaseModel):
    username: str
    full_name: str
    email: str
    disabled: bool


class UserDB(User):
    password: str


users_db = {
    "mrln008": {
        "username": "mrln008",
        "full_name": "marlon ralda",
        "email": "mr@email.com",
        "disabled": False,
        "password": "123456",
    },
    "hol222": {
        "username": "hol222",
        "full_name": "Renata ralda",
        "email": "assmr@email.com",
        "disabled": True,
        "password": "123456",
    },
    "houls22": {
        "username": "houls22",
        "full_name": "fielos ralda",
        "email": "wqwqwmr@email.com",
        "disabled": False,
        "password": "123456",
    },
    "br31": {
        "username": "br31",
        "full_name": "josue ralda",
        "email": "mrss@email.com",
        "disabled": True,
        "password": "123456",
    },
}


def search_user_db(username: str):
    if username in users_db:
        return UserDB(**users_db[username])


def search_user(username: str):
    if username in users_db:
        return User(**users_db[username])


async def current_user(token: str = Depends(oauth2)):
    user = search_user(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales de autenticación inválidas",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if user.disabled:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Usuario Inactivo"
        )

    return user


@router.post("/login")
async def login(form: OAuth2PasswordRequestForm = Depends()):
    user_db = users_db.get(form.username)  # este username hace referencia al frontend
    if not user_db:
        # esto es para cambiar el status Code
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="El usuario no es correcto"
        )

    user = search_user_db(form.username)
    if not form.password == user.password:
        raise HTTPException(status_code=400, detail="la contrasenia no es correcta")

    return {"accesss_token": user.username, "token_type": "bearer"}


@router.get("/users/me")
async def me(user: User = Depends(current_user)):
    return user
