from fastapi import FastAPI
from routers import (
    usersdb,
    basic_auth_users,
    jwt_auth_users,
    pacientesdb,
    empleados,
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
app = FastAPI()

# Routers
app.include_router(usersdb.router)
app.include_router(basic_auth_users.router)
app.include_router(jwt_auth_users.router)
app.include_router(pacientesdb.router)
app.include_router(empleados.router)

# esto es para compartir imagenes o recursos Staticos 2/2
app.mount("/static", StaticFiles(directory="static"), name="static")

# Url local: http://127.0.0.1:8000


@app.get("/")
async def root():
    return {"message: ": "Hola Mundo!! desde una API !!"}  # Devolver un Json


@app.get("/inicio")
async def inicio():
    return {"Aqui va a ir el inicio de la pagina :p"}


# @app.put('/posts/{post_id}')
# def update_post(post_id: str, updatedPost: Post):
#     for index, post in enumerate(posts):
#         if post['id'] == post_id:
#             posts[index]['title'] = updatedPost.title
#             posts[index]['content'] = updatedPost.content
#             posts[index]['author'] = updatedPost.author
#             return {'message': 'post has been updated'}
#     raise HTTPException(status_code=404, detail='post not found')


# @app.delete('/posts/{post_id}')
# def delete_post(post_id: str):
#     for index, post in enumerate(posts): # enumerate nos dara la posicion en el que esta el arreglo
#         if post['id'] == post_id:
#             posts.pop(index) # pop es para sacar los arreglos en cierta posicion
#             return {'message': 'post has been eliminated'}
#     raise HTTPException(status_code=404, detail='post not found')


# @app.get("/url")
# async def url():
#     return {"url_curso:": "https://mouredev.com", "url_deporte:": "https://nike.com"}
