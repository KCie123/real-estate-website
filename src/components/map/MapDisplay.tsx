import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Import Leaflet library itself

// Fix for default Leaflet icon issues with React/Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapDisplayProps {
  latitude: number;
  longitude: number;
  popupText?: string; // Optional text for the marker popup
}

const MapDisplay = ({ latitude, longitude, popupText }: MapDisplayProps) => {
  if (typeof window === 'undefined') {
    // Don't render on the server
    return null;
  }

  const position: [number, number] = [latitude, longitude];

  return (
    <MapContainer center={position} zoom={14} scrollWheelZoom={false} style={{ height: '300px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        {popupText && (
          <Popup>
            {popupText}
          </Popup>
        )}
      </Marker>
    </MapContainer>
  );
};

export default MapDisplay; 