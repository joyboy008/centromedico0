import openai
import os
from dotenv import load_dotenv
import json


class ChatBot:
    def __init__(self):
        load_dotenv()
        self.api_key = os.getenv("OPENAI_API_KEY")
        openai.api_key = self.api_key
        self.preguntas_anteriores = []
        self.respuestas_anteriores = []

    def preguntar(self, text):
        # esta variable datos se cambiara con una que solicite el backend con un mejor formato
        datos = [
            "nombre",
            "descripcion",
            "telefono",
            "hora",
            "pm o am",
            "dia de la cita",
            "servicio",
        ]
        horarioDisp = [
            "lunes de 10am a 6PM"
            "martes de 10am a 6PM"
            "miercoles de 10am a 6PM"
            "jueves de 10am a 6PM"
            "viernes de 10am a 6PM"
            "jueves de 10am a 2PM"
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
        prompt = "Usuario: " + text
        promptEnfermero = f"eres un enfermero llamado CuraChat del centro medico la esperanza el cual cuenta con los siguientes servicios {','.join(servicios)} la informacion del centro medico es el siguiente {','.join(datosCentro)}. Para agendar citas unicamente en los horarios {','.join(horarioDisp)} para programar una cita solicitar los siguientes datos {','.join(datos)}"
        session = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "assistant", "content": promptEnfermero},
                {"role": "user", "content": prompt},
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
            "hora",
            "pm o am" "dia de la cita",
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
        prompt = f"a partir de la siguiente informacion: {text} me puedes extraer los siguientes datos {','.join(datos)} asignandole correctamente a alguno de estos servicios {','.join(servicios)} "
        session = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": ""},
                {"role": "user", "content": prompt},
            ],
            stop=None,
            temperature=0.7,
        )
        # Iterar sobre el generador para obtener la respuesta
        datos_cita = session.choices[0].message.content
        return datos_cita

    def concatenar_tupla(self, tupla):
        texto_concatenado = ""
        for elemento in tupla:
            texto_concatenado += str(elemento)
        return texto_concatenado

    def convertir_a_json(self, datos_cita):
        datos = datos_cita.splitlines()
        cita_dict = {}

        for dato in datos:
            partes = dato.split(": ", 1)
            if len(partes) == 2:
                clave, valor = partes
                cita_dict[clave] = valor

        return json.dumps(cita_dict, ensure_ascii=False, indent=4, sort_keys=True)

    def guardar_en_archivo_js(self, json_content, nombre_archivo):
        with open(nombre_archivo, "w", encoding="utf-8") as archivo:
            archivo.write("const datosCita = ")
            archivo.write(json_content)
            archivo.write(";")

    def conversar(self):
        print(
            "bienvenido a nuestro chatBot Basico, escribe 'salir' cuando desees terminar"
        )
        while True:
            conversacion_historica = ""
            ingreso_usuario = input("\nTu: ")
            if ingreso_usuario.lower() == "salir":
                break

            for preg, resp in zip(
                self.preguntas_anteriores, self.respuestas_anteriores
            ):
                conversacion_historica += f"El usuario pregunta: {preg}\n"
                conversacion_historica += f"{resp}\n"

            pregunta = f"El usuario pregunta: {ingreso_usuario}\n"
            conversacion_historica += pregunta
            respuesta_gpt = self.preguntar(conversacion_historica)
            print(f"{respuesta_gpt}")

            self.preguntas_anteriores.append(ingreso_usuario)
            self.respuestas_anteriores.append(respuesta_gpt)

        print("usando la informacion de las preguntas del usuario ------ ")

        texto_concatenado = self.concatenar_tupla(self.preguntas_anteriores)
        print(texto_concatenado)
        datos_cita = self.cita(texto_concatenado)
        print(datos_cita)

        # Convertir y mostrar en formato JSON
        json_resultante = self.convertir_a_json(datos_cita)
        print("Mostrando el json")
        print(json_resultante)

        # Nombre del archivo
        nombre_archivo = "datosCita1.js"

        # Guardar en el archivo JavaScript
        self.guardar_en_archivo_js(json_resultante, nombre_archivo)


if __name__ == "__main__":
    chatbot = ChatBot()
    chatbot.conversar()
