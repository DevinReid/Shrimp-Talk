"use client";

import { useState } from "react";
import type { FriendGroup } from "@/types";
import { mockFriendGroups } from "@/lib/mockData";

interface LocationShareProps {
  onShare: (data: { latitude: number; longitude: number; groupId?: string }) => void;
}

export default function LocationShare({ onShare }: LocationShareProps) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [isSharing, setIsSharing] = useState(false);

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsSharing(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
          setIsSharing(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your location. Please enter it manually.");
          setIsSharing(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleShare = (e: React.FormEvent) => {
    e.preventDefault();
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      alert("Please enter valid coordinates");
      return;
    }

    onShare({
      latitude: lat,
      longitude: lng,
      groupId: selectedGroup || undefined,
    });

    setLatitude("");
    setLongitude("");
    setSelectedGroup("");
  };

  return (
    <div className="backdrop-blur-sm p-6 rounded-xl border-2 shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#ffd4d4' }}>
      <h3 className="text-xl font-bold mb-4" style={{ color: '#ff5252' }}>
        Share Your Location 🦐
      </h3>

      <form onSubmit={handleShare} className="space-y-4">
        <button
          type="button"
          onClick={handleGetCurrentLocation}
          disabled={isSharing}
          className="w-full shrimp-gradient hover:opacity-90 text-white px-4 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-50"
        >
          {isSharing ? "Getting location..." : "📍 Use Current Location"}
        </button>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#ff5252' }}>
              Latitude
            </label>
            <input
              type="number"
              step="any"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2"
              style={{ 
                borderColor: '#ffd4d4',
                backgroundColor: 'white',
                color: '#2d1b1b'
              }}
              placeholder="e.g., 40.7128"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#ff5252' }}>
              Longitude
            </label>
            <input
              type="number"
              step="any"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2"
              style={{ 
                borderColor: '#ffd4d4',
                backgroundColor: 'white',
                color: '#2d1b1b'
              }}
              placeholder="e.g., -74.0060"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#ff5252' }}>
            Share with Group (optional)
          </label>
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2"
            style={{ 
              borderColor: '#ffd4d4',
              backgroundColor: 'white',
              color: '#2d1b1b'
            }}
          >
            <option value="">Everyone</option>
            {mockFriendGroups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={!latitude || !longitude}
          className="w-full shrimp-gradient hover:opacity-90 text-white px-4 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Share Location 🦐
        </button>
      </form>
    </div>
  );
}


