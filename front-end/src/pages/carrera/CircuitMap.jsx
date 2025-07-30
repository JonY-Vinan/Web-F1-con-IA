import React, { useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import SceneView from "@arcgis/core/views/SceneView";
import Home from "@arcgis/core/widgets/Home";
import "./CircuitMap.css";
// import WeatherInfo from "../SideInfo/WeatherInfo";
// import ScheduleRacer from "../SideInfo/ScheduleRacer";
const CircuitMap = ({ setMapView, setMapSceneView, nameCircuito, baseMap }) => {
  const mapRef = useRef(null);
  const mapRef3D = useRef(null);
  const [is3DView, setIs3DView] = useState(false);

  const viewRef = useRef(null);
  const view3DRef = useRef(null);

  const toggleView = () => setIs3DView((prev) => !prev);

  useEffect(() => {
    if (!mapRef.current || !mapRef3D.current) return;

    const mapConfig = {
      basemap: baseMap?.basemap || "gray-vector",
    };

    viewRef.current = new MapView({
      container: mapRef.current,
      map: new Map(mapConfig),
      center: [-2.92528, 43.26271],
      zoom: 4,
    });

    view3DRef.current = new SceneView({
      container: mapRef3D.current,
      map: new Map({ ...mapConfig, ground: "world-elevation" }),
      center: [-2.92528, 43.26271],
      zoom: 6,
    });

    const homeWidget = new Home({
      view: viewRef.current,
    });
    viewRef.current.ui.add(homeWidget, "top-left");

    setMapView(viewRef.current);
    setMapSceneView(view3DRef.current);

    mapRef3D.current.style.display = "none";

    return () => {
      if (viewRef.current) viewRef.current.destroy();
      if (view3DRef.current) view3DRef.current.destroy();
    };
  }, [baseMap, setMapView, setMapSceneView]);

  useEffect(() => {
    if (!mapRef.current || !mapRef3D.current) return;

    if (is3DView) {
      mapRef.current.style.display = "none";
      mapRef3D.current.style.display = "block";
    } else {
      mapRef.current.style.display = "block";
      mapRef3D.current.style.display = "none";
    }
  }, [is3DView]);

  return (
    <div className="card shadow-sm h-100">
      <div className="card-header bg-danger text-white d-flex justify-content-between align-items-center p-2">
        <div className="d-flex align-items-center gap-3">
          <img
            src="/bandera.png"
            alt="Bandera del país"
            className="country-flag rounded"
            style={{ width: "50px", height: "30px", objectFit: "cover" }}
          />
          <h5 className="m-0">{nameCircuito || "Selecciona un circuito"}</h5>
        </div>

        <button
          onClick={toggleView}
          className={`btn btn-sm ${
            is3DView ? "btn-light text-danger" : "btn-outline-light"
          }`}
          aria-label="Cambiar vista 2D/3D"
        >
          {is3DView ? "2D" : "3D"}
        </button>
      </div>

      <div
        className="map-wrapper"
        style={{ height: "45vh", backgroundColor: "#f5f5f5" }}
      >
        <div
          ref={mapRef}
          className={`w-100 h-100 ${is3DView ? "d-none" : ""}`}
          aria-hidden={is3DView}
        />
        <div
          ref={mapRef3D}
          className={`w-100 h-100 ${!is3DView ? "d-none" : ""}`}
          aria-hidden={!is3DView}
        />
      </div>

      <div className="card-footer bg-dark text-light p-2"></div>
    </div>
  );
};

export default CircuitMap;
