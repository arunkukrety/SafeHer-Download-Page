import { useState, useEffect } from 'react'
import { 
  IoMenuOutline, 
  IoCloseOutline,
  IoLockClosedOutline,
  IoCheckmarkCircleOutline,
  IoAlertCircleOutline,
  IoPersonAddOutline,
  IoLocationOutline
} from 'react-icons/io5'
import logo_shield from './assets/logo_shield.png'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Location from './pages/Location'

import PhoneScreenshot5 from './assets/screenshot_final1.jpg'
import PhoneScreenshot6 from './assets/screenshot_final2.jpg'
import PhoneScreenshot7 from './assets/screenshot_final3.jpg'
import PhoneScreenshot8 from './assets/screenshot_final4.jpg'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Add screenshots data
  const phoneScreenshots = [
    { id: 1, src: PhoneScreenshot5, alt: "Phone Screenshot 1" },
    { id: 2, src: PhoneScreenshot6, alt: "Phone Screenshot 2" },
    { id: 3, src: PhoneScreenshot7, alt: "Phone Screenshot 3" },
    { id: 4, src: PhoneScreenshot8, alt: "Phone Screenshot 4" }
  ]

  const handleDownload = () => {
    
    const link = document.createElement('a')
    link.href = '/README.md' 
    link.download = 'SafeHer-README.md'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in')
          entry.target.classList.remove('opacity-0')
          entry.target.classList.remove('translate-y-10')
        }
      })
    }, observerOptions)

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700')
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/location" element={<Location />} />
        <Route path="/" element={
          <div className="min-h-screen bg-gradient-to-b from-[#f0e6ff] to-white">
            {/* Navbar */}
            <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24 md:h-28">
                  <div className="flex items-center">
                    <img 
                      src={logo_shield} 
                      alt="SafeHer" 
                      className="h-16 md:h-20 w-auto hover:scale-105 transition-transform duration-300" 
                    />
                    <span className="ml-4 text-[#4a3b6b] text-3xl md:text-4xl font-bold">SafeHer</span>
                  </div>
                  
                  <div className="hidden md:block">
                    <button 
                      onClick={handleDownload}
                      className="bg-gradient-to-r from-[#9f86ff] to-[#6f5c91] text-white px-8 py-3 rounded-full text-xl font-medium hover:opacity-90 transition-all hover:scale-105"
                    >
                      Download App
                    </button>
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
                    <button 
                      onClick={handleDownload}
                      className="w-full bg-gradient-to-r from-[#9f86ff] to-[#6f5c91] text-white px-8 py-3 rounded-full text-xl font-medium"
                    >
                      Download App
                    </button>
                  </div>
                </div>
              )}
            </nav>

            {/* Hero Section */}
            <section className="pt-32 md:pt-36 pb-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8 scroll-animate">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4a3b6b] leading-tight">
                      Your Safe Space for Female Connections
                    </h1>
                    <p className="text-lg text-[#6f5c91]">
                      Join our verified female-only community where safety meets companionship.
                    </p>
                    <button 
                      onClick={handleDownload}
                      className="bg-gradient-to-r from-[#9f86ff] to-[#6f5c91] text-white px-8 py-3 rounded-full font-medium text-lg hover:opacity-90 transition-all hover:scale-105"
                    >
                      Download Now
                    </button>
                  </div>

                  {/* Phone Screenshots Grid */}
                  <div className="relative scroll-animate">
                    <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-lg mx-auto">
                      {phoneScreenshots.map((screenshot) => (
                        <div 
                          key={screenshot.id} 
                          className="relative aspect-[9/19.5] bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                        >
                          
                          {screenshot.src ? (
                            <img 
                              src={screenshot.src} 
                              alt={screenshot.alt}
                              className="absolute inset-0 w-full h-full object-contain pt-4"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-[#6f5c91] text-sm pt-4">
                              {screenshot.alt}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Security Features Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-[#4a3b6b] mb-12 scroll-animate">
                  Advanced Security Features
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="p-6 rounded-2xl bg-[#f0e6ff] hover:scale-105 transition-all duration-500 scroll-animate">
                    <IoLockClosedOutline size={40} className="text-[#9f86ff] mb-4" />
                    <h3 className="text-xl font-bold text-[#4a3b6b] mb-2">ID Verification</h3>
                    <p className="text-[#6f5c91]">Multi-step verification process ensures female-only community.</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-[#f0e6ff] hover:scale-105 transition-all duration-500 scroll-animate">
                    <IoCheckmarkCircleOutline size={40} className="text-[#9f86ff] mb-4" />
                    <h3 className="text-xl font-bold text-[#4a3b6b] mb-2">Real-time Monitoring</h3>
                    <p className="text-[#6f5c91]">24/7 AI-powered safety monitoring system.</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-[#f0e6ff] hover:scale-105 transition-all duration-500 scroll-animate">
                    <IoAlertCircleOutline size={40} className="text-[#9f86ff] mb-4" />
                    <h3 className="text-xl font-bold text-[#4a3b6b] mb-2">Emergency Alert</h3>
                    <p className="text-[#6f5c91]">One-tap SOS feature with location sharing.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Companion Matching Section - Replacing Safety Score Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#f0e6ff] to-white">
              <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6 scroll-animate">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#4a3b6b]">
                      Smart Companion Matching
                    </h2>
                    <p className="text-lg text-[#6f5c91]">
                      Find like-minded companions based on shared interests, locations, and activities.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-lg">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#9f86ff] to-[#6f5c91] flex items-center justify-center text-white">
                          <IoPersonAddOutline size={24} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#4a3b6b]">Interest Matching</h4>
                          <p className="text-sm text-[#6f5c91]">Connect through shared hobbies and activities</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-lg">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#9f86ff] to-[#6f5c91] flex items-center justify-center text-white">
                          <IoLocationOutline size={24} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#4a3b6b]">Location Based</h4>
                          <p className="text-sm text-[#6f5c91]">Find companions in your area</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative scroll-animate">
                    <div className="bg-white p-8 rounded-2xl shadow-xl">
                      <div className="aspect-square relative bg-gradient-to-br from-[#9f86ff] to-[#6f5c91] rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-medium">
                          Companion Matching Interface
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Download Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#4a3b6b] text-white">
              <div className="max-w-7xl mx-auto text-center">
                <div className="max-w-3xl mx-auto space-y-8 scroll-animate">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Join Our Growing Community
                  </h2>
                  <p className="text-lg opacity-90">
                    Download SafeHer now and connect safely
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={handleDownload}
                      className="bg-white text-[#4a3b6b] px-8 py-3 rounded-full font-medium hover:scale-105 transition-all text-lg"
                    >
                      Download for iOS
                    </button>
                    <button 
                      onClick={handleDownload}
                      className="bg-white text-[#4a3b6b] px-8 py-3 rounded-full font-medium hover:scale-105 transition-all text-lg"
                    >
                      Download for Android
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Simple Footer */}
            <footer className="bg-white py-8 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto text-center">
                <p className="text-[#6f5c91]">Created for HackHarvard 2024</p>
              </div>
            </footer>
          </div>
        } />
      </Routes>
    </Router>
  )
}

export default App
