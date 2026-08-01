import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    MONGO_URI = os.getenv("MONGO_URI")

print("\n========== CONFIG DEBUG ==========")
print("SECRET_KEY:", Config.SECRET_KEY)
print("JWT_SECRET_KEY:", Config.JWT_SECRET_KEY)
print("MONGO_URI aanwezig:", Config.MONGO_URI is not None)
print("==================================\n")