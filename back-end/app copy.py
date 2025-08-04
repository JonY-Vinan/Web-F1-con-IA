# app.py

from flask import Flask
from extensions import db, jwt
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    # Inicializar extensiones
    db.init_app(app)
    jwt.init_app(app)
    CORS(app) # Habilitar CORS para todas las rutas

    # Mover las importaciones de blueprints y modelos aquí
    # Esto soluciona el RuntimeError y las dependencias circulares
    from models.models import UsuarioDB, TipoUsuario
    from blueprints.usuarios_dp import usuarios_bp
    # Registrar Blueprints
    app.register_blueprint(usuarios_bp, url_prefix='/api')

    # Contexto de aplicación para operaciones de base de datos
    with app.app_context():
        db.create_all()

        # --- Lógica para crear el usuario administrador ---
        admin_email = "admin@admin.com"
        admin_password = "admin"
        admin_name = "Administrador Principal"
        admin_phone = "123456789"

        existing_admin = UsuarioDB.query.filter_by(email=admin_email).first()

        if not existing_admin:
            new_admin = UsuarioDB(
                nombre=admin_name,
                email=admin_email,
                telefono=admin_phone,
                tipo_usuario=TipoUsuario.ADMIN
            )
            # Hashea y guarda la contraseña
            new_admin.set_password(admin_password)

            db.session.add(new_admin)
            db.session.commit()
            print(f"Usuario administrador '{admin_email}' creado con éxito.")
        else:
            print(f"Usuario administrador '{admin_email}' ya existe.")
        # --- Fin de la lógica para crear el usuario administrador ---

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)

# Exporta la aplicación para Gunicorn
# app = create_app()