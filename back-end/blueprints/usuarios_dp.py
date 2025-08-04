# blueprints/usuarios_dp.py

from flask import Blueprint, request, jsonify
from extensions import db
from models.models import UsuarioDB, TipoUsuario
from werkzeug.security import generate_password_hash
from flask_jwt_extended import create_access_token # Importamos la función para crear tokens
import uuid
from flask_jwt_extended import jwt_required, get_jwt_identity

usuarios_bp = Blueprint('usuarios', __name__)

@usuarios_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Faltan datos de usuario o contraseña'}), 400

    existing_user = UsuarioDB.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({'error': 'El email ya está registrado'}), 409

    new_user = UsuarioDB(
        id=uuid.uuid4().hex[:6].upper(),
        nombre=data.get('nombre'),
        email=data['email'],
        telefono=data.get('telefono'),
        tipo_usuario=TipoUsuario.CLIENTE # Por defecto, crea un cliente
    )
    new_user.set_password(data['password'])

    try:
        db.session.add(new_user)
        db.session.commit()
        
        # Opcional: devolver un objeto de usuario en la respuesta
        user_data = {
            'id': new_user.id,
            'nombre': new_user.nombre,
            'email': new_user.email,
            'telefono': new_user.telefono,
            'tipo_usuario': new_user.tipo_usuario.value
        }
        return jsonify({'message': 'Usuario registrado con éxito', 'user': user_data}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@usuarios_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email', None)
    password = data.get('password', None)

    # 1. Validar que se hayan proporcionado email y contraseña
    if not email or not password:
        return jsonify({'message': 'Se requiere email y contraseña'}), 400

    # 2. Buscar el usuario en la base de datos
    user = UsuarioDB.query.filter_by(email=email).first()

    # 3. Verificar si el usuario existe y si la contraseña es correcta
    if user and user.check_password(password):
        # 4. Si las credenciales son correctas, crear un token de acceso JWT
        # El identity del token se establece como el ID del usuario
        access_token = create_access_token(identity=user.id)
        
        # 5. Construir el objeto de usuario para enviar al frontend
        user_data = {
            'id': user.id,
            'nombre': user.nombre,
            'email': user.email,
            'telefono': user.telefono,
            'tipo_usuario': user.tipo_usuario.value # Usamos .value para obtener el string
        }

        # 6. Devolver el token y los datos del usuario
        return jsonify(access_token=access_token, user=user_data), 200
    else:
        # 7. Si las credenciales son incorrectas, devolver un error
        return jsonify({'message': 'Credenciales incorrectas'}), 401

@usuarios_bp.route('/usuarios', methods=['GET'])
def get_users():
    usuarios = UsuarioDB.query.all()
    output = []
    for usuario in usuarios:
        user_data = {
            'id': usuario.id,
            'nombre': usuario.nombre,
            'email': usuario.email,
            'tipo_usuario': usuario.tipo_usuario.value
        }
        output.append(user_data)
    return jsonify({'usuarios': output})

@usuarios_bp.route('/mi_cuenta', methods=['GET'])
@jwt_required()
def get_mi_cuenta():
    current_user_id = get_jwt_identity()
    user = UsuarioDB.query.filter_by(id=current_user_id).first()
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    return jsonify({'id': user.id, 'email': user.email, ...}), 200