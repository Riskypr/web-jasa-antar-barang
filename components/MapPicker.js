"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";

// FIX ICON
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: null,
});

// ICON CUSTOM
const pickupIcon = new L.Icon({
  iconUrl: "/pickup.png",
  iconSize: [35, 35],
  shadowUrl: null,
});

const destinationIcon = new L.Icon({
  iconUrl: "/Destination.png",
  iconSize: [35, 35],
  shadowUrl: null,
});

//  HANDLE CLICK (INI KUNCI FIX)
function ClickHandler({ markers, setMarkers, setPoints }) {
  useMapEvents({
    click(e) {
      const newMarkers = [...markers, e.latlng];

      if (newMarkers.length > 2) newMarkers.shift();

      setMarkers(newMarkers);
      setPoints(newMarkers);
    },
  });

  return null;
}

// ROUTING
function Routing({ points }) {
  const map = useMap();

  useEffect(() => {
    if (points.length < 2) return;

    const routing = L.Routing.control({
      waypoints: [
        L.latLng(points[0].lat, points[0].lng),
        L.latLng(points[1].lat, points[1].lng),
      ],
      lineOptions: {
        styles: [{ color: "#16a34a", weight: 5 }],
      },
      addWaypoints: false,
      draggableWaypoints: false,
      // show: false,
      createMarker: () => null,
    }).addTo(map);

    return () => map.removeControl(routing);
  }, [points]);

  return null;
}

export default function MapPicker({ setPoints }) {
  const [markers, setMarkers] = useState([]);

  return (
    <div className="relative">
      <MapContainer
        center={[-3.3, 114.6]}
        zoom={13}
        className="h-[500px] md:h-[600px]"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <ClickHandler
          markers={markers}
          setMarkers={setMarkers}
          setPoints={setPoints}
        />

        {/* ROUTE */}
        <Routing points={markers} />

        {/* MARKER */}
        {markers.map((pos, i) => (
          <Marker
            key={i}
            position={pos}
            icon={i === 0 ? pickupIcon : destinationIcon}
          />
        ))}
      </MapContainer>
    </div>
  );
}