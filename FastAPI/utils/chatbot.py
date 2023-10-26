import openai
from utils.constants import OPENAI_API_KEY
import json


class ChatBot:
    def __init__(self):
        self.api_key = OPENAI_API_KEY
        openai.api_key = self.api_key
        self.preguntas_anteriores = []
        self.respuestas_anteriores = []

    def preguntar(self, userPrompt):
        # esta variable datos se cambiara con una que solicite el backend con un mejor formato
        datos = [
            "nombre",
            "descripcion",
            "telefono",
            "servicio",
        ]
        servicios = [
            "traumatologia y ortopedia",
            "medicina interna",
            "ginecologia y obstetricia",
            "fisioterapeuta",
            "anestosiologia",
            "rayos X y ultrasonido",
            "pediatria",
            "cirugia general",
            "laboratorio clinico",
            "cardiologia y ecocardiografia",
        ]
        datosCentro = [
            "esta ubicado en 5a. Avenida, zona 1 Municipio de la Esperanza, Quetzaltenango el cual cuenta con un horario disponible de las 24 horas y los numeros de telefono son 77971444 y Whatsapp: 57389579."
        ]
        personalidad = f"por favor eres un enfermero del centro medico la esperanza el cual cuenta con los siguientes servicios {','.join(servicios)} la informacion del centro medico es el siguiente {','.join(datosCentro)}. Para para programar una cita solicitar los siguientes datos {','.join(datos)}. Por favor trata de utilizar un lenguaje natural y se un poco comico si es posible. tambien no menciones que eres un bot al contrario, trata de dar a entender que eres un humano."
        session = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "assistant", "content": personalidad},
                {"role": "user", "content": userPrompt},
            ],
            stop=None,
            temperature=0.7,
        )
        # Iterar sobre el generador para obtener la respuesta
        respuesta_generada = session.choices[0].message.content
        return respuesta_generada

    def cita(self, text):
        # esta variable datos se cambiara con una que solicite el backend con un mejor formato
        datos = [
            "nombre",
            "descripcion",
            "telefono",
        ]
        servicios = [
            "traumatologia y ortopedia",
            "medicina interna",
            "ginecologia y obstetricia",
            "fisioterapeuta",
            "anestesiologia",
            "rayos X y ultrasonido",
            "pediatria",
            "cirugia general",
            "laboratorio clinico",
            "cardiologia y ecocardiografia",
        ]
        prompt = f"a partir de la siguiente informacion: {text}, puedes extaer los siguientes datos {','.join(datos)}?, si no puedes por cualquier razon o falta algun dato, no escribas ninguna justificacion solo responde 'NO', si eres capaz entonces responde en el siguiente formato [nombre_del_campo]@[valor] separado por commas, si tu respuesta es 'NO' no apliques el formato porfavor"
        # prompt = f"ayudame a saber si ingrese mi nombre, motivo de visita y numero de telefono. en caso falte un campo entonces responder unicamente 'faltan datos' y no aplicar ningun formato. En caso de que de que esten los campos completos devolverlos en el siguiente formato [nombre_del_campo]@[valor] separado por commas. el texto es: {text}"
        session = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": ""},
                {"role": "user", "content": prompt},
            ],
            stop=None,
            temperature=0,
        )
        # Iterar sobre el generador para obtener la respuesta
        datos_cita = session.choices[0].message.content
        ## realizar una condicion para que salga un No si me de otro tipo de respuesta
        return datos_cita

        datos = datos_cita.splitlines()
        cita_dict = {}

        for dato in datos:
            partes = dato.split(": ", 1)
            if len(partes) == 2:
                clave, valor = partes
                cita_dict[clave] = valor

        return json.dumps(cita_dict, ensure_ascii=False, indent=4, sort_keys=True)

    def comparar_cadena_y_numero_de_caracteres(self, cadena1, cadena2, n):
        # Tomar solo las primeras 5 letras de cada cadena
        primera_parte_cadena1 = cadena1[:n]
        primera_parte_cadena2 = cadena2[:n]
        if primera_parte_cadena1 == primera_parte_cadena2:
            return True
        else:
            return False

    def conversar(self, ingreso_usuario):
        conversacion_historica = ""
        for preg, resp in zip(self.preguntas_anteriores, self.respuestas_anteriores):
            conversacion_historica += f"El usuario pregunta: {preg}\n"
            conversacion_historica += f"{resp}\n"

        pregunta = f"El usuario pregunta: {ingreso_usuario}\n"
        conversacion_historica += pregunta
        respuesta_gpt = self.preguntar(conversacion_historica)

        return respuesta_gpt
