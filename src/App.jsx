import { useState, useEffect } from "react";
import {
  IoMenuOutline,
  IoCloseOutline,
  IoLockClosedOutline,
  IoCheckmarkCircleOutline,
  IoAlertCircleOutline,
  IoPersonAddOutline,
  IoLocationOutline,
  IoChatbubbleOutline,
  IoPeopleOutline,
  IoShieldCheckmarkOutline,
  IoLocation
} from "react-icons/io5";
import logo_shield from "./assets/logo_shield.png";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Location from "./pages/Location";

import PhoneScreenshot5 from "./assets/screenshot_final1.jpg";
import PhoneScreenshot6 from "./assets/screenshot_final2.jpg";
import PhoneScreenshot7 from "./assets/screenshot_final3.jpg";
import PhoneScreenshot8 from "./assets/screenshot_final4.jpg";
import PhoneScreenshot9 from "./assets/screenshot_final5.jpg";
import PhoneScreenshot10 from "./assets/screenshot_final6.jpg";

import { IoIosChatbubbles } from "react-icons/io";
import { PiMicrophoneStageFill } from "react-icons/pi";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Add screenshots data
  const phoneScreenshots = [
    { id: 1, src: PhoneScreenshot5, alt: "Phone Screenshot 1" },
    { id: 2, src: PhoneScreenshot6, alt: "Phone Screenshot 2" },
    { id: 3, src: PhoneScreenshot7, alt: "Phone Screenshot 3" },
    { id: 4, src: PhoneScreenshot8, alt: "Phone Screenshot 4" },
  ];

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/SafeHer.apk"; 
    link.download = "SafeHer.apk"; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          entry.target.classList.remove("opacity-0");
          entry.target.classList.remove("translate-y-10");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".scroll-animate").forEach((el) => {
      el.classList.add(
        "opacity-0",
        "translate-y-10",
        "transition-all",
        "duration-700"
      );
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/location" element={<Location />} />
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
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
                      <span className="ml-4 text-[#7c3aed] text-3xl md:text-4xl font-bold">
                        SafeHer
                      </span>
                    </div>

                    <div className="hidden md:block">
                      <button
                        onClick={handleDownload}
                        className="bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 text-white px-8 py-3 rounded-full text-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-300/40 hover:scale-105 active:scale-95"
                      >
                        Download App
                      </button>
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
                      <button
                        onClick={handleDownload}
                        className="w-full bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 text-white px-8 py-3 rounded-full text-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-300/40 active:scale-95"
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
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#7c3aed] leading-tight">
                        Your Safe Space for Female Connections
                      </h1>
                      <p className="text-lg text-purple-700">
                        Join our verified female-only community where safety
                        meets companionship.
                      </p>
                      <button
                        onClick={handleDownload}
                        className="bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 text-white px-8 py-3 rounded-full font-medium text-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-300/40 hover:scale-105 active:scale-95"
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

              {/* Demo Video Section */}
              <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-white to-purple-50">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#7c3aed] mb-8 scroll-animate">
                    See SafeHer in Action
                  </h2>
                  <div className="relative pt-[56.25%] rounded-2xl overflow-hidden shadow-xl scroll-animate">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src="https://www.youtube.com/embed/49zJt6YnK1M"
                      title="SafeHer App Demo"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </section>

              {/* Security Features Section */}
              <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold text-center text-[#7c3aed] mb-12 scroll-animate">
                    Advanced Security Features
                  </h2>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-6 rounded-2xl bg-purple-50 hover:scale-105 transition-all duration-500 scroll-animate">
                      <IoLockClosedOutline
                        size={40}
                        className="text-[#7c3aed] mb-4"
                      />
                      <h3 className="text-xl font-bold text-[#7c3aed] mb-2">
                        ID Verification
                      </h3>
                      <p className="text-purple-700">
                        Multi-step verification process ensures female-only
                        community.
                      </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-purple-50 hover:scale-105 transition-all duration-500 scroll-animate">
                      <IoLocation
                        size={40}
                        className="text-[#7c3aed] mb-4"
                      />
                      <h3 className="text-xl font-bold text-[#7c3aed] mb-2">
                        Real-time Location Sharing
                      </h3>
                      <p className="text-purple-700">
                        Share your location with friends and family for safety.
                      </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-purple-50 hover:scale-105 transition-all duration-500 scroll-animate">
                      <IoAlertCircleOutline
                        size={40}
                        className="text-[#7c3aed] mb-4"
                      />
                      <h3 className="text-xl font-bold text-[#7c3aed] mb-2">
                        Emergency Alert
                      </h3>
                      <p className="text-purple-700">
                        One-tap SOS feature linked directly with women helpline number.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Companion Matching Section */}
              <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-50 to-white">
                <div className="max-w-7xl mx-auto">
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 scroll-animate">
                      <h2 className="text-3xl md:text-4xl font-bold text-[#7c3aed]">
                        Smart Companion Matching
                      </h2>
                      <p className="text-lg text-purple-700">
                        Find like-minded companions based on shared interests,
                        locations, and activities.
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-lg">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#7c3aed] to-purple-500 flex items-center justify-center text-white">
                            <IoPersonAddOutline size={24} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#7c3aed]">
                              Interest Matching
                            </h4>
                            <p className="text-sm text-purple-700">
                              Connect through shared hobbies and activities
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-lg">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#7c3aed] to-purple-500 flex items-center justify-center text-white">
                            <IoLocationOutline size={24} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#7c3aed]">
                              Location Based
                            </h4>
                            <p className="text-sm text-purple-700">
                              Find companions and trips in your area
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-lg">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#7c3aed] to-purple-500 flex items-center justify-center text-white">
                            <IoIosChatbubbles size={24} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#7c3aed]">
                              In-App Chat
                            </h4>
                            <p className="text-sm text-purple-700">
                              Chat with companions before meeting to build trust.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative scroll-animate max-w-[300px] mx-auto">
  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
    <div className="aspect-[9/19.5] relative">
      <img
        src={PhoneScreenshot9}
        alt="Phone Screenshot 9"
        className="w-full h-full object-contain p-2" // Added padding to inset the image slightly
      />
    </div>
  </div>
</div>
                  </div>
                </div>
              </section>

              {/* Additional Features Section */}
              <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold text-center text-[#7c3aed] mb-12 scroll-animate">
                    More Upcoming Features to Enhance Your Experience
                  </h2>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-6 rounded-2xl bg-purple-50 hover:scale-105 transition-all duration-500 scroll-animate">
                      <IoChatbubbleOutline
                        size={40}
                        className="text-[#7c3aed] mb-4"
                      />
                      <h3 className="text-xl font-bold text-[#7c3aed] mb-2">
                        In-App Group Chat
                      </h3>
                      <p className="text-purple-700">
                        Create group chats and do dicussions about your trips.
                      </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-purple-50 hover:scale-105 transition-all duration-500 scroll-animate">
                      <IoPeopleOutline
                        size={40}
                        className="text-[#7c3aed] mb-4"
                      />
                      <h3 className="text-xl font-bold text-[#7c3aed] mb-2">
                        Group Trips
                      </h3>
                      <p className="text-purple-700">
                        Plan group trips with multiple verified companions.
                      </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-purple-50 hover:scale-105 transition-all duration-500 scroll-animate">
                      <PiMicrophoneStageFill
                        size={40}
                        className="text-[#7c3aed] mb-4"
                      />
                      <h3 className="text-xl font-bold text-[#7c3aed] mb-2">
                        Local Events Recommendations
                      </h3>
                      <p className="text-purple-700">
                        Get recommendations for local events and activities.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Download Section */}
              <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#7c3aed] text-white">
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
                        className="bg-white text-[#7c3aed] px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-300/40 hover:scale-105 active:scale-95 text-lg"
                      >
                        Download for Android
                      </button>
                    </div>
                  </div>
                </div>
              </section>


            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;