"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface Friend {
  id: string;
  name: string;
  avatarUrl: string;
  initials: string;
  lat: number;
  lng: number;
  color: string;
  status?: string;
}

interface LocationMapProps {
  friends: Friend[];
  selectedFriend: Friend | null;
  onMarkerClick: (friend: Friend) => void;
}

function createAvatarIcon(friend: Friend, isSelected: boolean) {
  const size = isSelected ? 52 : 44;
  return L.divIcon({
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 3px solid ${friend.color};
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        background: white;
        transition: all 0.2s ease;
      ">
        <img src="${friend.avatarUrl}" style="width:100%;height:100%;object-fit:cover;" alt="${friend.name}" />
      </div>
    `,
  });
}

function FlyToFriend({ friend }: { friend: Friend | null }) {
  const map = useMap();
  useEffect(() => {
    if (friend) {
      map.flyTo([friend.lat, friend.lng], 15, { duration: 1 });
    }
  }, [friend, map]);
  return null;
}

function FriendMarker({ friend, isSelected, onMarkerClick }: { friend: Friend; isSelected: boolean; onMarkerClick: (f: Friend) => void }) {
  const markerRef = useRef<L.Marker>(null);

  useEffect(() => {
    if (isSelected && markerRef.current) {
      setTimeout(() => {
        markerRef.current?.openPopup();
      }, 300);
    }
  }, [isSelected]);

  return (
    <Marker
      ref={markerRef}
      position={[friend.lat, friend.lng]}
      icon={createAvatarIcon(friend, isSelected)}
      eventHandlers={{
        click: () => onMarkerClick(friend),
      }}
    >
      {friend.status && (
        <Popup
          offset={[0, -30]}
          closeButton={false}
          className="status-popup"
          autoPan={false}
        >
          <div style={{
            background: 'linear-gradient(135deg, #ff1493, #ff6b35)',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}>
            📍 {friend.status}
          </div>
        </Popup>
      )}
    </Marker>
  );
}

export default function LocationMap({ friends, selectedFriend, onMarkerClick }: LocationMapProps) {
  return (
    <>
      <style>{`
        .status-popup .leaflet-popup-content-wrapper {
          background: transparent !important;
          box-shadow: none !important;
          border-radius: 0 !important;
          padding: 0 !important;
        }
        .status-popup .leaflet-popup-content {
          margin: 0 !important;
        }
        .status-popup .leaflet-popup-tip {
          background: #ff1493 !important;
        }
      `}</style>
      <MapContainer
        center={[29.9511, -90.0715]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {friends.map((friend) => (
          <FriendMarker
            key={friend.id}
            friend={friend}
            isSelected={selectedFriend?.id === friend.id}
            onMarkerClick={onMarkerClick}
          />
        ))}
        <FlyToFriend friend={selectedFriend} />
      </MapContainer>
    </>
  );
}
