from decouple import config
from enum import Enum

MONGODB_URI = config("MONGODB_URI")
JWT_SECRET = config("JWT_SECRET")
JWT_ALGORITHM = config("JWT_ALGORITHM")


class Roles(Enum):
    SECRETARIA = "SECRETARIA"
    ENFERMERO = "ENFERMERO"
    DOCTOR = "DOCTOR"
    ADMIN = "ADMIN"
