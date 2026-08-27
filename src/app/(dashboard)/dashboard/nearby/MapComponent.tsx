"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet's default icon path issues in Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const redIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function MapComponent() {
  const position: [number, number] = [20.2961, 85.8245]; // Bhubaneswar, Odisha

  const markers = [
    { position: [20.2961, 85.8245], title: "Current Location", isRed: true },
    { position: [20.2980, 85.8210], title: "RTO Office", isRed: false },
    { position: [20.2920, 85.8280], title: "Passport Seva Kendra", isRed: false },
    { position: [20.3010, 85.8300], title: "City Hospital", isRed: false },
    { position: [20.2900, 85.8150], title: "Police Station", isRed: false },
  ];

  return (
    <MapContainer 
      center={position} 
      zoom={14} 
      style={{ height: "100%", width: "100%", zIndex: 0 }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, idx) => (
        <Marker 
          key={idx} 
          position={marker.position as [number, number]} 
          icon={marker.isRed ? redIcon : icon}
        >
          <Popup>{marker.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
