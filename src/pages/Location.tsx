import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import { IoMenuOutline, IoCloseOutline, IoChevronDownOutline, IoChevronUpOutline, IoCallOutline, IoTimeOutline, IoNavigateOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import logo_shield from '../assets/logo_shield.png'


// Fix for default marker icon
const customIcon = new Icon({
  iconUrl: 'https://randomuser.me/api/portraits/women/74.jpg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  className: 'rounded-full border-2 border-white shadow-lg'
})

const walkingPathDelhi = [
  { lat: 28.6139, lon: 77.2090 },  // Start: India Gate
  { lat: 28.6144, lon: 77.2090 },  // Straight north
  { lat: 28.6149, lon: 77.2091 },
  { lat: 28.6154, lon: 77.2091 },
  { lat: 28.6159, lon: 77.2091 },
  { lat: 28.6164, lon: 77.2091 },  
  { lat: 28.6164, lon: 77.2098 },  // Sharp turn east
  { lat: 28.6164, lon: 77.2105 },
  { lat: 28.6164, lon: 77.2112 },
  { lat: 28.6164, lon: 77.2119 },
  { lat: 28.6171, lon: 77.2119 },  // Sharp turn north again
  { lat: 28.6178, lon: 77.2119 },
  { lat: 28.6185, lon: 77.2119 },
  { lat: 28.6192, lon: 77.2119 },
  { lat: 28.6192, lon: 77.2127 },  // Final turn east
  { lat: 28.6192, lon: 77.2135 },
  { lat: 28.6192, lon: 77.2143 },
  { lat: 28.6192, lon: 77.2151 },
  { lat: 28.6192, lon: 77.2159 },
  { lat: 28.6192, lon: 77.2167 }   // End point
]

function Location() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentPosition, setCurrentPosition] = useState(0)
  const [coordinates, setCoordinates] = useState({
    latitude: walkingPathDelhi[0].lat,
    longitude: walkingPathDelhi[0].lon
  })
  const [pathTraveled, setPathTraveled] = useState<[number, number][]>([])
  const intervalRef = useRef<number>()
  const [isPanelExpanded, setIsPanelExpanded] = useState(false)


  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setCurrentPosition((prev) => {
        if (prev < walkingPathDelhi.length - 1) {
          const nextPos = prev + 1
          const newCoords = walkingPathDelhi[nextPos]
          
          setCoordinates({
            latitude: newCoords.lat,
            longitude: newCoords.lon
          })

          setPathTraveled(prevPath => [
            ...prevPath,
            [newCoords.lat, newCoords.lon]
          ])

          return nextPos
        } else {
          clearInterval(intervalRef.current)
          return prev
        }
      })
    }, 3000)

    setPathTraveled([[walkingPathDelhi[0].lat, walkingPathDelhi[0].lon]])

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0e6ff] to-white">
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
              <span className="ml-4 text-[#4a3b6b] text-3xl md:text-4xl font-bold">SafeHer</span>
            </Link>
            
            <div className="hidden md:block">
              <Link 
                to="/"
                className="bg-gradient-to-r from-[#9f86ff] to-[#6f5c91] text-white px-8 py-3 rounded-full text-xl font-medium hover:opacity-90 transition-all hover:scale-105"
              >
                Back to Home
              </Link>
            </div>
            
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#4a3b6b] p-2">
                {isMenuOpen ? <IoCloseOutline size={36} /> : <IoMenuOutline size={36} />}
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
                className="block w-full bg-gradient-to-r from-[#9f86ff] to-[#6f5c91] text-white px-8 py-3 rounded-full text-xl font-medium text-center"
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
          <h1 className="text-3xl md:text-4xl font-bold text-[#4a3b6b] mb-2">
            Live Location Tracking
          </h1>
          <p className="text-[#6f5c91] text-lg">
            Track real-time location updates for enhanced safety
          </p>
        </div>
      </div>

      {/* Map Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="h-[60vh] md:h-[70vh] relative">
            <MapContainer 
              center={[walkingPathDelhi[0].lat, walkingPathDelhi[0].lon]} 
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
                  color: 'red',
                  fillColor: 'red',
                  fillOpacity: 0.15,
                  weight: 0
                }}
                radius={40}
              />
              <Circle
                center={[coordinates.latitude, coordinates.longitude]}
                pathOptions={{
                  color: 'red',
                  fillColor: 'red',
                  fillOpacity: 0.1,
                  weight: 0
                }}
                radius={60}
              />

              {/* Marker that moves with coordinates */}
              <Marker 
                position={[coordinates.latitude, coordinates.longitude]}
                icon={customIcon}
              >
                <Popup>
                  Current Position<br />
                  Lat: {coordinates.latitude.toFixed(4)}°<br />
                  Long: {coordinates.longitude.toFixed(4)}°
                </Popup>
              </Marker>

              <Polyline 
                positions={pathTraveled}
                pathOptions={{ color: 'blue', weight: 3 }}
              />

              {/* Enhanced collapsible user info panel with better animations */}
              <div 
                className={`
                  absolute bottom-4 left-4 right-4 
                  bg-white rounded-lg shadow-lg z-[1000] 
                  md:left-1/2 md:right-auto md:w-96 md:-translate-x-1/2 
                  transition-all duration-500 ease-in-out
                  ${isPanelExpanded ? 'md:h-auto' : 'md:h-[72px]'}
                  ${isPanelExpanded ? 'translate-y-0' : 'translate-y-0'}
                  hover:shadow-xl
                `}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img 
                        src="https://randomuser.me/api/portraits/women/74.jpg"
                        alt="User Avatar" 
                        className="w-12 h-12 rounded-full border-2 border-[#4a3b6b] transition-transform duration-300 hover:scale-105"
                      />
                      <div>
                        <h3 className="font-semibold text-[#4a3b6b]">Priya Sharma</h3>
                        <p className="text-sm text-[#6f5c91]">is sharing their location with you</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsPanelExpanded(!isPanelExpanded)}
                      className="text-[#4a3b6b] p-2 hover:bg-[#f0e6ff] rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
                    >
                      {isPanelExpanded ? 
                        <IoChevronDownOutline size={24} className="transform transition-transform duration-300" /> : 
                        <IoChevronUpOutline size={24} className="transform transition-transform duration-300" />
                      }
                    </button>
                  </div>

                  {/* Expanded content with enhanced animations */}
                  <div 
                    className={`
                      mt-4 space-y-3 
                      transition-all duration-500 ease-in-out
                      ${isPanelExpanded 
                        ? 'max-h-[400px] opacity-100 transform translate-y-0' 
                        : 'max-h-0 opacity-0 transform translate-y-4'
                      }
                    `}
                  >
                    {/* Emergency Contact Card */}
                    <div 
                      className={`
                        flex items-center gap-4 p-3 bg-[#f0e6ff] rounded-lg
                        transform transition-all duration-500 ease-in-out
                        hover:scale-[1.02] hover:shadow-md
                        ${isPanelExpanded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                      `}
                    >
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#9f86ff] to-[#6f5c91] flex items-center justify-center text-white transform transition-transform duration-300 hover:scale-110">
                        <IoCallOutline size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#4a3b6b]">Emergency Contact</h4>
                        <p className="text-sm text-[#6f5c91]">+91 98765 43210</p>
                      </div>
                    </div>

                    {/* Journey Details Card */}
                    <div 
                      className={`
                        flex items-center gap-4 p-3 bg-[#f0e6ff] rounded-lg
                        transform transition-all duration-500 ease-in-out delay-100
                        hover:scale-[1.02] hover:shadow-md
                        ${isPanelExpanded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                      `}
                    >
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#9f86ff] to-[#6f5c91] flex items-center justify-center text-white transform transition-transform duration-300 hover:scale-110">
                        <IoTimeOutline size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#4a3b6b]">Journey Details</h4>
                        <p className="text-sm text-[#6f5c91]">Started 15 mins ago</p>
                      </div>
                    </div>

                    {/* Destination Card */}
                    <div 
                      className={`
                        flex items-center gap-4 p-3 bg-[#f0e6ff] rounded-lg
                        transform transition-all duration-500 ease-in-out delay-200
                        hover:scale-[1.02] hover:shadow-md
                        ${isPanelExpanded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                      `}
                    >
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#9f86ff] to-[#6f5c91] flex items-center justify-center text-white transform transition-transform duration-300 hover:scale-110">
                        <IoNavigateOutline size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#4a3b6b]">Destination</h4>
                        <p className="text-sm text-[#6f5c91]">Connaught Place, New Delhi</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Location 