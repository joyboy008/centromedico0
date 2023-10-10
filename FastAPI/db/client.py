# Descarga version community: https://www.mongodb.com/try/download
# instalacion: https://www.mongodb.com/docs/manual/tutorial
# Modulo conexion MongoDB: pip install pymongo
# Conexion: mongodb: //localhost


from pymongo import MongoClient

db_client = MongoClient()

# luego modificaremos db_client para que ahora nos conectaremos a atlas MongoDB
# Base de datos Remota:
# o
