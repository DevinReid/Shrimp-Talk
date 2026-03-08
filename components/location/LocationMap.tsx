"use client";

import { useState, useEffect } from "react";
import type { LocationShare } from "@/types";

interface LocationMapProps {
  locations: LocationShare[];
}

export default function LocationMap({ locations }: LocationMapProps) {
  const [mapUrl, setMapUrl] = useState("");

  useEffect(() => {
    if (locations.length === 0) {
      setMapUrl("");
      return;
    }

    // Using OpenStreetMap static map (you can replace with Google Maps or Mapbox)
    // For now, we'll use a simple approach with OpenStreetMap
    const center = locations[0];
    const markers = locations
      .map((loc, index) => `${loc.latitude},${loc.longitude}`)
      .join("|");

    // Using a simple map embed approach
    // In production, you'd use a proper map library like Leaflet, Google Maps, or Mapbox
    const url = `https://www.openstreetmap.org/?mlat=${center.latitude}&mlon=${center.longitude}&zoom=13`;
    setMapUrl(url);
  }, [locations]);

  if (locations.length === 0) {
    return (
      <div className="backdrop-blur-sm p-12 rounded-xl border-2 shadow-lg text-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#ffd4d4' }}>
        <div className="text-6xl mb-4">📍</div>
        <p className="text-xl mb-2" style={{ color: '#ff5252' }}>
          No locations shared yet
        </p>
        <p style={{ color: '#ff6b6b' }}>
          Share your location to see it on the map!
        </p>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-sm rounded-xl border-2 shadow-lg overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#ffd4d4' }}>
      <div className="p-4 border-b-2" style={{ borderColor: '#ffd4d4' }}>
        <h3 className="text-xl font-bold" style={{ color: '#ff5252' }}>
          Friend Locations 🗺️
        </h3>
      </div>
      <div className="h-96 bg-gray-100 relative">
        {mapUrl ? (
          <iframe
            src={mapUrl}
            className="w-full h-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🗺️</div>
              <p style={{ color: '#ff6b6b' }}>Loading map...</p>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 space-y-2">
        {locations.map((location) => (
          <div
            key={location.id}
            className="flex items-center gap-3 p-3 rounded-lg border-2"
            style={{ borderColor: '#ffd4d4', backgroundColor: 'white' }}
          >
            {location.user.avatarUrl ? (
              <img
                src={location.user.avatarUrl}
                alt={location.user.displayName}
                className="w-10 h-10 rounded-full border-2"
                style={{ borderColor: '#ffb3b3' }}
              />
            ) : (
              <div
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: '#ffb3b3', backgroundColor: '#ffe8e8' }}
              >
                🦐
              </div>
            )}
            <div className="flex-1">
              <p className="font-semibold" style={{ color: '#ff5252' }}>
                {location.user.displayName}
              </p>
              <p className="text-sm" style={{ color: '#ff6b6b' }}>
                {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
              </p>
            </div>
            <span className="text-xs" style={{ color: '#ff6b6b' }}>
              {new Date(location.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}


