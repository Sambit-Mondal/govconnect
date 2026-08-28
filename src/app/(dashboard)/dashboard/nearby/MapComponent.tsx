"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapComponent({ offices }: { offices: any[] }) {
  const defaultPosition: [number, number] = [20.2961, 85.8245]; // Bhubaneswar

  return (
    <MapContainer 
      center={defaultPosition} 
      zoom={14} 
      style={{ height: "100%", width: "100%", zIndex: 0 }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Current Location (Mock) */}
      <Marker position={defaultPosition} icon={icon}>
        <Popup>Your Location</Popup>
      </Marker>

      {/* Offices from DB */}
      {offices.map((office, idx) => {
        // Generating some slight random offset to simulate different locations since we don't have lat/lng in DB
        const position: [number, number] = [
          defaultPosition[0] + (Math.random() - 0.5) * 0.05,
          defaultPosition[1] + (Math.random() - 0.5) * 0.05
        ];
        
        return (
          <Marker 
            key={idx} 
            position={position} 
            icon={icon}
          >
            <Popup>
              <strong>{office.name}</strong><br/>
              {office.address}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
