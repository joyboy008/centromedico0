from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from passlib.context import CryptContext
from datetime import datetime, timedelta

ALGORITHM = "HS256"
ACCESS_TOKEN_DURATION = 1
SECRET = "loqueseapuntocomUmAmig123Oo"

router = APIRouter()

oauth2 = OAuth2PasswordBearer(tokenUrl="login")

crypt = CryptContext(schemes=["bcrypt"])


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
        "password": "$2a$12$M0Te3QMdSWFeqslOlox8jOXnlfpk1yre6yS/whMEdPHr.X1gVCPJ.",
    },
    "br31": {
        "username": "br31",
        "full_name": "josue ralda",
        "email": "mrss@email.com",
        "disabled": True,
        "password": "$2a$12$M0Te3QMdSWFeqslOlox8jOXnlfpk1yre6yS/whMEdPHr.X1gVCPJ.",
    },
}


def search_user_db(username: str):
    if username in users_db:
        return UserDB(**users_db[username])


def search_user(username: str):
    if username in users_db:
        return User(**users_db[username])


async def auth_user(token: str = Depends(oauth2)):
    exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciales de autenticación inválidas",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        username = jwt.decode(token, SECRET, algorithms=[ALGORITHM]).get("sub")
        if username is None:
            raise exception

    except JWTError:
        raise exception

    return search_user(username)


async def current_user(user: User = Depends(auth_user)):
    if user.disabled:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Usuario Inactivo"
        )

    return user


@router.post("/login1")
async def login(form: OAuth2PasswordRequestForm = Depends()):
    user_db = users_db.get(form.username)  # este username hace referencia al frontend
    if not user_db:
        # esto es para cambiar el status Code
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="El usuario no es correcto"
        )

    user = search_user_db(form.username)
    if not crypt.verify(form.password, user.password):
        raise HTTPException(status_code=400, detail="la contraseña no es correcta")

    # timedelta es para acceder al tiempo en la vida real

    access_token = {
        "sub": user.username,
        "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_DURATION),
    }
    return {
        "accesss_token": jwt.encode(access_token, SECRET, algorithm=ALGORITHM),
        "token_type": "bearer",
    }


@router.get("/users/me1")
async def me(user: User = Depends(current_user)):
    return user
