# config.py

import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'postgresql://postgres:1234@localhost:5432/formula-1-db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'una-clave-secreta-para-tu-app'
    
    # Configuración para Flask-JWT-Extended
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'una-clave-secreta-para-jwt'