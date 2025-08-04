# app.py (Modificado)

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np

# Inicializar la aplicación Flask
app = Flask(__name__)
CORS(app)

# --- Cargar el modelo y las características ---
try:
    model = joblib.load('modelo_adelantamientos_final.joblib')
    features = joblib.load('features_adelantamientos_final.joblib')
    print("Modelo y lista de características cargados exitosamente.")
except FileNotFoundError:
    print("Error: No se encontraron los archivos del modelo.")
    exit()

# --- Cargar los DataFrames necesarios para el procesamiento de datos ---
try:
    df_results = pd.read_csv('./archive/results.csv')
    df_races = pd.read_csv('./archive/races.csv')
    df_drivers = pd.read_csv('./archive/drivers.csv')
    df_lap_times = pd.read_csv('./archive/lap_times.csv')
    df_qualifying = pd.read_csv('./archive/qualifying.csv')
    df_constructor_results = pd.read_csv('./archive/constructor_results.csv')
    df_constructors = pd.read_csv('./archive/constructors.csv')
    df_driver_standings = pd.read_csv('./archive/driver_standings.csv')
    print("DataFrames de datos brutos cargados.")
except FileNotFoundError:
    print("Error: No se encontraron los archivos CSV.")
    exit()

# --- Pre-procesamiento de datos (se mantiene igual) ---
def preprocess_data():
    df_base = df_results.merge(df_races, on='raceId')
    df_base = df_base.merge(df_drivers, on='driverId')
    df_base.rename(columns={'positionText': 'final_position', 'grid': 'start_position'}, inplace=True)
    df_base = df_base.merge(df_constructors[['constructorId', 'name']], on='constructorId', how='left')
    df_base.rename(columns={'name_y': 'constructor_name'}, inplace=True)
    df_base = df_base.merge(df_constructor_results, on=['raceId', 'constructorId'], how='left')
    unique_constructors = df_base['constructor_name'].dropna().unique()
    constructor_mapping = {name: i for i, name in enumerate(unique_constructors)}
    df_base['constructor_encoded'] = df_base['constructor_name'].map(constructor_mapping)
    df_avg_lap_times = df_lap_times.groupby(['raceId', 'driverId'])['milliseconds'].mean().reset_index()
    df_avg_lap_times.rename(columns={'milliseconds': 'avg_lap_time_ms'}, inplace=True)
    df_base = df_base.merge(df_avg_lap_times, on=['raceId', 'driverId'], how='left')
    df_standings_clean = df_driver_standings[['raceId', 'driverId', 'position']].copy()
    df_standings_clean['position'] = pd.to_numeric(df_standings_clean['position'], errors='coerce')
    df_standings_clean.rename(columns={'position': 'standings_position'}, inplace=True)
    df_base = df_base.merge(df_standings_clean, on=['raceId', 'driverId'], how='left')
    df_base.sort_values(by=['driverId', 'raceId'], inplace=True)
    df_base['prev_standings_position'] = df_base.groupby('driverId')['standings_position'].shift(1)
    df_base['delta_standings'] = df_base['standings_position'] - df_base['prev_standings_position']
    df_base['delta_standings'].fillna(0, inplace=True)
    return df_base

df_full_data = preprocess_data()
print("Datos pre-procesados y listos para las predicciones.")

# --- Endpoint de la API (CORRECCIÓN CLAVE) ---
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        race_id = data.get('raceId')
        driver_id_A = data.get('driverId_A')
        driver_id_B = data.get('driverId_B')
        
        if not all([race_id, driver_id_A, driver_id_B]):
            return jsonify({'error': 'Faltan parámetros necesarios (raceId, driverId_A, driverId_B)'}), 400

        driver_A_data = df_full_data[(df_full_data['raceId'] == race_id) & (df_full_data['driverId'] == driver_id_A)].iloc[0]
        driver_B_data = df_full_data[(df_full_data['raceId'] == race_id) & (df_full_data['driverId'] == driver_id_B)].iloc[0]

        prediction_data = {
            'delta_avg_lap_time_ms': driver_B_data['avg_lap_time_ms'] - driver_A_data['avg_lap_time_ms'],
            'delta_start_position': driver_B_data['start_position'] - driver_A_data['start_position'],
            'constructor_A_encoded': driver_A_data['constructor_encoded'],
            'constructor_B_encoded': driver_B_data['constructor_encoded'],
            'delta_standings': driver_B_data['delta_standings'] - driver_A_data['delta_standings'],
        }
        
        X_predict = pd.DataFrame([prediction_data])
        
        prediction_proba = model.predict_proba(X_predict)[:, 1][0]
        
        # CORRECCIÓN: Convertir a float estándar de Python para que sea serializable
        return jsonify({'probability': float(prediction_proba)})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- NUEVO endpoint para cargar datos para el front-end por año ---
@app.route('/data/<int:year>', methods=['GET'])
def get_data_by_year(year):
    # Filtrar carreras por año
    races_of_year = df_races[df_races['year'] == year]
    race_ids_of_year = races_of_year['raceId'].unique()

    # Obtener los pilotos que participaron en esas carreras
    drivers_of_year = df_full_data[df_full_data['raceId'].isin(race_ids_of_year)].copy()
    
    # Unir con el nombre del constructor para las tarjetas
    drivers_of_year = drivers_of_year.merge(df_constructors[['constructorId', 'name']], on='constructorId', how='left')
    drivers_of_year.rename(columns={'name_x': 'driver_name', 'name_y': 'constructor_name'}, inplace=True)
    
    # Crear una lista de pilotos únicos con su información más reciente en ese año
    unique_drivers = drivers_of_year.drop_duplicates(subset='driverId', keep='last')
    
    # Preparar los datos para el JSON
    races = races_of_year[['raceId', 'name', 'year']].to_dict('records')
    pilots = unique_drivers[['driverId', 'forename', 'surname', 'constructor_name']].to_dict('records')
    
    return jsonify({'races': races, 'pilots': pilots})

# --- Endpoint para obtener todos los años disponibles ---
@app.route('/years', methods=['GET'])
def get_years():
    years = sorted(df_races['year'].unique().tolist(), reverse=True)
    return jsonify({'years': years})

if __name__ == '__main__':
    app.run(debug=True)