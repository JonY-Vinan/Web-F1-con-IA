# back-end/app.py
import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from flask_cors import CORS
# Cargar variables de entorno desde .env
load_dotenv()

app = Flask(__name__)
CORS(app)
# Configuración de la base de datos PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://postgres:1234@localhost:5432/formula-1-db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Modelo de base de datos simple: Escudería de F1
class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    country = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<Team {self.name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'country': self.country
        }

# Ruta para verificar que el backend está funcionando
@app.route('/')
def home():
    return jsonify({"message": "Bienvenido al API de Formula 1 - Backend"})

# Ruta para obtener todas las escuderías
@app.route('/teams', methods=['GET'])
def get_teams():
    teams = Team.query.all()
    return jsonify([team.to_dict() for team in teams])

# Ruta para añadir una nueva escudería
@app.route('/teams', methods=['POST'])
def add_team():
    data = request.get_json()
    if not data or not 'name' in data or not 'country' in data:
        return jsonify({"error": "Faltan datos de la escudería"}), 400

    new_team = Team(name=data['name'], country=data['country'])
    try:
        db.session.add(new_team)
        db.session.commit()
        return jsonify(new_team.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all() # Crea las tablas si no existen
    app.run(debug=True, port=5000)