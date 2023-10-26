from motor import motor_asyncio
from utils.constants import MONGODB_URI
from db.models.Usuario import Usuario
from db.models.Paciente import Paciente
from db.models.Doctor import Doctor
from db.models.Chat import Chat
from db.models.Cita import Cita
import beanie

# funciones async se usan cuando algo tardara mucho en ejecutarse
# y se utiliza con await, y esto significa que que puede estar en standby en lo que llega la informacion


async def connect():
    cliente = motor_asyncio.AsyncIOMotorClient(MONGODB_URI)
    await beanie.init_beanie(
        database=cliente.centromedico,
        document_models=[Usuario, Paciente, Doctor, Chat, Cita],
    )
