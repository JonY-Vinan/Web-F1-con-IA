# models/models.py

from extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
import enum
import uuid # Importamos uuid

class TipoUsuario(enum.Enum):
    CLIENTE = 'cliente'
    ADMIN = 'admin'

class UsuarioDB(db.Model):
    __tablename__ = 'usuarios'
    
    # Corregimos la definición del ID para que se genere automáticamente
    id = db.Column(db.String(6), primary_key=True, default=lambda: uuid.uuid4().hex[:6].upper())
    
    nombre = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    telefono = db.Column(db.String(20), unique=True, nullable=True)
    password_hash = db.Column(db.String(128))
    tipo_usuario = db.Column(db.Enum(TipoUsuario), default=TipoUsuario.CLIENTE)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<Usuario {self.nombre}>'