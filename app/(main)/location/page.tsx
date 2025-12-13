"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import LocationShare from "@/components/location/LocationShare";
import LocationMap from "@/components/location/LocationMap";
import type { LocationShare as LocationShareType } from "@/types";
import { currentUser, mockUsers } from "@/lib/mockData";

export default function LocationPage() {
  const [locations, setLocations] = useState<LocationShareType[]>([]);

  const handleShareLocation = (data: { latitude: number; longitude: number; groupId?: string }) => {
    // Create new location share (mock)
    const newLocation: LocationShareType = {
      id: `location-${Date.now()}`,
      userId: currentUser.id,
      user: currentUser,
      latitude: data.latitude,
      longitude: data.longitude,
      sharedWithGroupId: data.groupId,
      createdAt: new Date(),
    };
    setLocations([newLocation, ...locations]);
  };

  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 shrimp-gradient-text">
            Location Sharing 🦐
          </h1>
          <p className="text-lg" style={{ color: '#ff6b6b' }}>
            Share your location with your friends
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <LocationShare onShare={handleShareLocation} />
          <div className="backdrop-blur-sm p-6 rounded-xl border-2 shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#ffd4d4' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: '#ff5252' }}>
              Recent Shares 📍
            </h3>
            {locations.length === 0 ? (
              <p className="text-center py-8" style={{ color: '#ff6b6b' }}>
                No locations shared yet
              </p>
            ) : (
              <div className="space-y-3">
                {locations.slice(0, 5).map((location) => (
                  <div
                    key={location.id}
                    className="p-3 rounded-lg border-2"
                    style={{ borderColor: '#ffd4d4', backgroundColor: 'white' }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
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
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <LocationMap locations={locations} />
      </div>
    </ProtectedRoute>
  );
}

