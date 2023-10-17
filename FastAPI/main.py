from fastapi import FastAPI
from db.connection import connect
from fastapi.middleware.cors import CORSMiddleware
from routers import (
    pacientes,
    usuarios,
    empleados,
    auth,
    doctors,
)
from fastapi.staticfiles import (
    StaticFiles,
)  # para poder compartir archivos staticos 1/2


# pip install "fastapi[all]"
# este comando es para instalar todas las dependencias

# Iniciar el Server: uvicorn main:app --reload
# Detener el server: ctrl+c

# documentantacion con Swagger: http://127.0.0.1:8000/docs
# documentantacion con Redocly: http://127.0.0.1:8000/redoc

# pip install pymongo   para instalar mongo


# esto es para compartir imagenes o recursos Staticos 2/2


# Url local: http://127.0.0.1:8000

app = FastAPI()

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Routers
app.include_router(pacientes.router)
app.include_router(usuarios.router)
app.include_router(doctors.router)
app.include_router(auth.router)

# app.include_router(empleados.router)


app.mount("/static", StaticFiles(directory="static"), name="static")


@app.on_event("startup")
async def db_connect():
    await connect()
