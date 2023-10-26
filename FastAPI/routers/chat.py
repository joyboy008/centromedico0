from datetime import datetime
from fastapi.exceptions import HTTPException
from fastapi import APIRouter
from db.models.Chat import ChatInteraccion, Chat
from db.models.Cita import Cita
from utils.chatbot import ChatBot
from utils.cita import crear_cita


router = APIRouter(
    prefix="/chat", tags=["ChatBot"], responses={404: {"mensaje": "No Encontrado"}}
)


@router.post("/{chatId}")
async def chat_input(chat: ChatInteraccion, chatId: str) -> dict:
    conversacion_actual = await Chat.find_one(Chat.conversacion_id == chatId)
    chatAgent = ChatBot()

    if not conversacion_actual:
        nueva_conversacion = Chat(
            conversacion_id=chatId,
            respuestas_anteriores=[],
            preguntas_anteriores=[],
            cita_realizada=False,
        )
        nueva_conversacion.preguntas_anteriores.append(chat.mensaje)

        respuesta = chatAgent.conversar(chat.mensaje)

        nueva_conversacion.respuestas_anteriores.append(respuesta)

        await nueva_conversacion.create()

        return {"mensaje": respuesta}
    else:
        # continuar la conversacion actual con bot
        chatAgent.respuestas_anteriores = conversacion_actual.respuestas_anteriores
        chatAgent.preguntas_anteriores = conversacion_actual.preguntas_anteriores
        conversacion_actual.preguntas_anteriores.append(chat.mensaje)

        respuesta = chatAgent.conversar(chat.mensaje)
        conversacion_actual.respuestas_anteriores.append(respuesta)

        cita = chatAgent.cita("".join(chatAgent.preguntas_anteriores))
        print("Resultado de funcion cita: ", cita)
        cita_comparar = "nombre@NO"
        comparar_tel = "telefono@NO"
        verificar = chatAgent.comparar_cadena_y_numero_de_caracteres(
            cita, cita_comparar, 9
        )
        verificar2 = chatAgent.comparar_cadena_y_numero_de_caracteres(
            cita, cita_comparar, 6
        )

        if verificar:
            await conversacion_actual.save()
            print("detectando que cita trae nombre@NO 🙄")
            return {"mensaje": respuesta}

        if not verificar2:
            await conversacion_actual.save()
            print("detectando formato incorrecto 🤨")
            return {"mensaje": respuesta}

        if comparar_tel in cita:
            await conversacion_actual.save()
            print("falta el numero 😁")
            return {"mensaje": respuesta}

        if cita != "NO" and conversacion_actual.cita_realizada == False:
            print("nos fuimos lokoo 😎")
            datosCita = crear_cita(cita)
            nueva_cita = Cita(
                nombre=datosCita["nombre"],
                descripcion=datosCita["descripcion"],
                telefono=datosCita["telefono"],
                fecha=datetime.strptime(chat.fecha, "%Y-%m-%dT%H:%M"),
                validado=False,
            )
            conversacion_actual.cita_realizada = True
            await conversacion_actual.save()
            await nueva_cita.create()
            return {
                "mensaje": "Tu cita ha sido creada con exito, nos pondremos en contacto para confirmar la disponibilidad"
            }

        await conversacion_actual.save()
        return {"mensaje": respuesta}
