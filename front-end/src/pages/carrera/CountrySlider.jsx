// CountrySlider.jsx


//"https://api.jolpi.ca/ergast/f1/2025/races.json";
// CountrySlider.jsx
import React, { useEffect, useState } from "react";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import "./CountrySlider.css"; // Se usa el nuevo CSS

const CountrySlider = ({ mapView, nameCircuito, idCircuito, lat, long}) => {
  const [circuitos, setCircuitos] = useState([]);
  const [circuitoSeleccionado, setCircuitoSeleccionado] = useState(null);
  const [geoJsonLayer, setGeoJsonLayer] = useState(null);
  const [geoJsonData, setGeoJsonData] = useState([]);
  const [geoJsonDataCircuito, setGeoJsonDataCircuito] = useState("");
  const [geoJsonSeleccionado, setGeoJsonSeleccionado] = useState(null);
  const [capaVisible, setCapaVisible] = useState(null);

  const urlDatosCicuitos = "https://api.jolpi.ca/ergast/f1/2025/races.json";
  const urlMapasCircuitosGeoJSON =
    "https://api.github.com/repos/bacinger/f1-circuits/contents/circuits";

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Cargar datos de los circuitos
        const response = await fetch(urlDatosCicuitos);
        const data = await response.json();
        const circuitosData = data.MRData.RaceTable.Races.map((c) => ({
          id: c.round,
          nombre: c.raceName,
          circuitoName: c.Circuit.circuitName,
          country: c.Circuit.Location.country,
          ubicacion: c.Circuit.Location.locality,
          coordenadas: [
            parseFloat(c.Circuit.Location.long),
            parseFloat(c.Circuit.Location.lat),
          ],
        }));

        // Cargar archivos GeoJSON
        const resGeoJSON = await fetch(urlMapasCircuitosGeoJSON);
        const dataGeoJSON = await resGeoJSON.json();

        // Filtrar solo archivos GeoJSON y mapear con su URL
        const geoJsonFiles = dataGeoJSON
          .filter((file) => file.name.endsWith(".geojson"))
          .map((file) => ({
            name: file.name.replace(".geojson", ""),
            url: file.download_url,
          }));

        setGeoJsonData(geoJsonFiles);
        setCircuitos(circuitosData);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    cargarDatos();
  }, []);

  const buscarNombreCircuito = async (url) => {
    try {
      const resGeoJSON = await fetch(url);
      const datosCircuitoGeoJSON = await resGeoJSON.json();
      const obteneNombreCircuito = datosCircuitoGeoJSON.features[0].properties.Name;
      setGeoJsonDataCircuito(obteneNombreCircuito);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  const handleSeleccionarCircuito = async (circuitoId) => {
    const circuito = circuitos.find(c => c.id.toString() === circuitoId);
    if (!circuito || !mapView) return;

    // Limpiar capa anterior
    if (geoJsonLayer) {
      mapView.map.remove(geoJsonLayer);
    }

    if (nameCircuito) {
      nameCircuito(circuito.circuitoName);
    }

    if (idCircuito) {
      idCircuito(circuito.id);
    }

    if (lat) {
      const latitud = circuito.coordenadas[1];
      lat(latitud);
    }

    if (long) {
      const longitud = circuito.coordenadas[0];
      long(longitud);
    }

    // Centrar el mapa
    await mapView.goTo({
      center: circuito.coordenadas,
      zoom: 2,
    });

    // Buscar el GeoJSON correspondiente al circuito
    for (const geo of geoJsonData) {
      try {
        const res = await fetch(geo.url);
        const geoJsonContent = await res.json();
        const nombreCircuitoGeoJSON = geoJsonContent.features[0]?.properties?.Name;
        const ubicaionCircuitoGeoJSON = geoJsonContent.features[0]?.properties?.Location;
        if (nombreCircuitoGeoJSON?.toLowerCase() === circuito.ubicacion?.toLowerCase() ||
            ubicaionCircuitoGeoJSON?.toLowerCase() === circuito.ubicacion?.toLowerCase() ||
            nombreCircuitoGeoJSON?.includes(circuito.circuitoName)) {
          // Encontramos el GeoJSON correspondiente
          const nuevaCapa = new GeoJSONLayer({
            url: geo.url,
            opacity: 0.8,
            renderer: {
              type: "simple",
              symbol: {
                type: "simple-fill",
                color: "rgba(66, 62, 62, 0)",
                outline: {
                  color: "rgba(66, 62, 62, 0.88)",
                  width: 3,
                },
              },
            },
          });

          mapView.map.add(nuevaCapa);
          setGeoJsonLayer(nuevaCapa);
          setGeoJsonSeleccionado(geo);
          setCircuitoSeleccionado(circuito);
          return;
        }
      } catch (error) {
        console.error("Error al cargar GeoJSON:", error);
      }
    }

    console.warn(`No se encontró GeoJSON para el circuito: ${circuito.circuitoName}`);
    setCircuitoSeleccionado(circuito);
  };

  useEffect(() => {
    if (!mapView || !geoJsonSeleccionado) return;

    const mostrarCircuito = async () => {
      if (capaVisible) {
        mapView.map.remove(capaVisible);
      }

      const nuevaCapa = new GeoJSONLayer({
        url: geoJsonSeleccionado.url,
        opacity: 0.8,
        renderer: {
          type: "simple",
          symbol: {
            type: "simple-fill",
            color: "rgba(66, 62, 62, 0)",
            outline: {
              color: "rgba(192, 10, 10, 0.88)",
              width: 3,
            },
          },
        },
      });

      try {
        await mapView.map.add(nuevaCapa);
        setCapaVisible(nuevaCapa);

        nuevaCapa.when(() => {
          mapView.goTo(nuevaCapa.fullExtent).catch(console.error);
        });
      } catch (error) {
        console.error("Error al cargar capa GeoJSON:", error);
      }
    };

    mostrarCircuito();

    return () => {
      if (mapView && capaVisible) {
        mapView.map.remove(capaVisible);
      }
    };
  }, [geoJsonSeleccionado, mapView]);

  return (
    <div className="container-select">
      <div className="card-select shadow-sm rounded-3 m-2">
        <div className="card-body-select p-2">
          <select
            className="form-select circuit-select"
            value={circuitoSeleccionado?.id || ""}
            onChange={(e) => handleSeleccionarCircuito(e.target.value)}
          >
            <option value="" disabled>Selecciona un circuito</option>
            {circuitos.map((circuito) => (
              <option key={circuito.id} value={circuito.id}>
                {`${circuito.ubicacion} (${circuito.circuitoName})`}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CountrySlider;