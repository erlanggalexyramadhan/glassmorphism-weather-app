import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGlobalContext } from "@/app/context/globalContext";

interface ActiveCityCoords {
  lat: number;
  lon: number;
}

interface FlyToActiveCityProps {
  activeCityCoords: ActiveCityCoords | null;
}

function FlyToActiveCity({ activeCityCoords }: FlyToActiveCityProps) {
  const map = useMap();

  useEffect(() => {
    if (activeCityCoords) {
      const zoomLev = 13;
      const flyToOptions = {
        duration: 1.5,
      };

      map.flyTo(
        [activeCityCoords.lat, activeCityCoords.lon],
        zoomLev,
        flyToOptions
      );
    }
  }, [activeCityCoords, map]);

  return null;
}

function Mapbox() {
  const { forecast } = useGlobalContext();

  const activeCityCoords: ActiveCityCoords | undefined = forecast?.coord;

  if (!forecast || !forecast.coord || !activeCityCoords) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <div className="flex-1 basis-[50%] rounded-lg bg-transparent backdrop-blur-xl">
      <MapContainer
        center={[activeCityCoords.lat, activeCityCoords.lon]}
        zoom={13}
        className="rounded-lg m-4"
        style={{ height: "calc(100% - 2rem)", width: "calc(100% - 2rem)" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FlyToActiveCity activeCityCoords={activeCityCoords} />
      </MapContainer>
    </div>
  );
}

export default Mapbox;