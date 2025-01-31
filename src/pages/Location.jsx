import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import {
  IoMenuOutline,
  IoCloseOutline,
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoCallOutline,
  IoTimeOutline,
  IoNavigateOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import logo_shield from "../assets/logo_shield.png";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Create letter avatar from name
const createLetterAvatar = (name) => {
  const canvas = document.createElement("canvas");
  canvas.width = 40;
  canvas.height = 40;
  const ctx = canvas.getContext("2d");

  // Draw circle background
  ctx.fillStyle = "#4a3b6b";
  ctx.beginPath();
  ctx.arc(20, 20, 20, 0, Math.PI * 2);
  ctx.fill();

  // Draw letter
  const letter = name?.charAt(0)?.toUpperCase() || "?";
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 20px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(letter, 20, 20);

  return canvas.toDataURL();
};

// Custom icon with user's avatar or letter fallback
const getCustomIcon = (userData) =>
  new Icon({
    iconUrl: userData.avatar_url || createLetterAvatar(userData.name),
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    className: "rounded-full border-2 border-white shadow-lg",
  });

function Location() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [coordinates, setCoordinates] = useState({
    latitude: 28.6139,
    longitude: 77.209,
  });
  const [pathTraveled, setPathTraveled] = useState([]);
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
    avatar_url: "",
    emergency_contact: "",
    journey_start_time: null,
    destination: "",
  });

  // Get userId from URL query parameter
  const queryParams = new URLSearchParams(window.location.search);
  const userId = queryParams.get("userId");

  useEffect(() => {
    if (!userId) return;

    // Initial fetch
    checkSharingAndFetchLocation();

    // Set up real-time subscription only if sharing is enabled
    const channel = supabase
      .channel("location_updates")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "users",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          if (payload.new.sharing_location && payload.new.location) {
            console.log("Location updated:", payload.new.location);
            setCoordinates({
              latitude: payload.new.location.latitude,
              longitude: payload.new.location.longitude,
            });
          } else {
            setIsSharing(false);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const checkSharingAndFetchLocation = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("users")
        .select(
          `
          location,
          sharing_location,
          name,
          avatar
        `
        )
        .eq("user_id", userId)
        .single();

      if (error) throw error;

      setIsSharing(data.sharing_location);
      setUserData({
        name: data.name,
        avatar_url: data.avatar,
      });

      if (data.sharing_location && data.location) {
        setCoordinates({
          latitude: data.location.latitude,
          longitude: data.location.longitude,
        });
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!userId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-[#7c3aed] mb-4">
            Invalid Request
          </h2>
          <p className="text-purple-700">No user ID provided in the URL.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7c3aed] mx-auto"></div>
          <p className="text-purple-700 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isSharing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-[#7c3aed] mb-4">
            Location Not Shared
          </h2>
          <p className="text-purple-700">
            This user is not currently sharing their location.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24 md:h-28">
            <Link to="/" className="flex items-center">
              <img
                src={logo_shield}
                alt="SafeHer"
                className="h-16 md:h-20 w-auto hover:scale-105 transition-transform duration-300"
              />
              <span className="ml-4 text-[#7c3aed] text-3xl md:text-4xl font-bold">
                SafeHer
              </span>
            </Link>

            <div className="hidden md:block">
              <Link
                to="/"
                className="bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 text-white px-8 py-3 rounded-full text-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-300/40 hover:scale-105 active:scale-95"
              >
                Back to Home
              </Link>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[#7c3aed] p-2"
              >
                {isMenuOpen ? (
                  <IoCloseOutline size={36} />
                ) : (
                  <IoMenuOutline size={36} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-6">
              <Link
                to="/"
                className="block w-full bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 text-white px-8 py-3 rounded-full text-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-300/40 active:scale-95 text-center"
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Header Section */}
      <div className="pt-32 pb-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-[#7c3aed] mb-2">
            Live Location Tracking
          </h1>
          <p className="text-lg text-purple-700">
            Track real-time location updates for enhanced safety
          </p>
        </div>
      </div>

      {/* Map Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="h-[60vh] md:h-[70vh] relative">
            <MapContainer
              center={[coordinates.latitude, coordinates.longitude]}
              zoom={15}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Circles that follow coordinates */}
              <Circle
                center={[coordinates.latitude, coordinates.longitude]}
                pathOptions={{
                  color: "red",
                  fillColor: "red",
                  fillOpacity: 0.15,
                  weight: 0,
                }}
                radius={40}
              />
              <Circle
                center={[coordinates.latitude, coordinates.longitude]}
                pathOptions={{
                  color: "red",
                  fillColor: "red",
                  fillOpacity: 0.1,
                  weight: 0,
                }}
                radius={60}
              />

              {/* Marker that moves with coordinates */}
              <Marker
                position={[coordinates.latitude, coordinates.longitude]}
                icon={getCustomIcon(userData)}
              >
                <Popup>
                  Current Position
                  <br />
                  Lat: {coordinates.latitude.toFixed(4)}°<br />
                  Long: {coordinates.longitude.toFixed(4)}°
                </Popup>
              </Marker>

              <Polyline
                positions={pathTraveled}
                pathOptions={{ color: "blue", weight: 3 }}
              />

              {/* Simplified user info panel */}
              <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg z-[1000] md:left-1/2 md:right-auto md:w-96 md:-translate-x-1/2 hover:shadow-xl">
                <div className="p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        userData.avatar_url || createLetterAvatar(userData.name)
                      }
                      alt={`${userData.name || "User"}'s Avatar`}
                      className="w-12 h-12 rounded-full border-2 border-[#7c3aed] transition-transform duration-300 hover:scale-105"
                    />
                    <div>
                      <h3 className="font-semibold text-[#7c3aed]">
                        {userData.name || "Loading..."}
                      </h3>
                      <p className="text-sm text-purple-700">
                        is sharing their location with you
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Location;
