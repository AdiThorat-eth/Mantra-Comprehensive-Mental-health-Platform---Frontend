import React, { useState, memo } from "react";
import {
  Mail,
  Heart,
  ArrowUp,
  Phone,
  MapPin,
  Star,
  Sparkles,
} from "lucide-react";

// Memoize the component to prevent unnecessary re-renders
const Footer = memo(() => {
  const [isHovered, setIsHovered] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Pricing", href: "#price" },
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonial" },
    { name: "FAQ", href: "#faq" },
    { name: "About Us", href: "#about" },
  ];

  const ourServices = [
    "Primary Care",
    "Readable Resources",
    "Visual Resources",
    "Audio Resources",
    "24/7 AI Support",
  ];

  return (
    <div className="relative w-screen h-[60vh] overflow-x-hidden flex flex-col justify-end">
      <footer className="relative tt5 bg-red-200 overflow-hidden rrr rrCenter w-[96vw] text-gray-900 flex bottom-0">
        {/* Enhanced animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-cyan-500/10 to-transparent rounded-full blur-3xl animate-spin"
            style={{ animationDuration: "20s" }}
          ></div>
          {/* Floating particles */}
          <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-700"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce delay-500"></div>
          <div className="absolute top-60 left-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-bounce delay-1200"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand section */}
            <div className="space-y-4 transform hover:scale-105 transition-all duration-500 group">
              <div className="relative">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-800 via-purple-800 to-pink-800 bg-clip-text text-transparent animate-gradient bg-300% group-hover:animate-pulse">
                  Mantra Care
                </h3>
                <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-purple-600 animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <p className="text-gray-900 text-sm leading-relaxed transform group-hover:translate-x-1 transition-transform duration-300">
                Providing exceptional healthcare services with compassion,
                innovation, and excellence. Your health is our priority.
              </p>
            </div>
            {/* Contact Info */}
            <div className="space-y-4 transform hover:scale-105 transition-all duration-500 group">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 relative group-hover:text-blue-800 transition-colors duration-300">
                Contact Us
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-S500 to-purple-500 rounded-full group-hover:w-full transition-all duration-500"></div>
              </h4>
              <div className="space-y-3 text-gray-800">
                <a
                  href="mailto:mantra.care.in1@gmail.com"
                  className="group/item flex items-center space-x-3 hover:text-black transition-all duration-300 transform hover:translate-x-2"
                >
                  <div className="p-2 bg-gray-300/50 group-hover/item:bg-blue-600 group-hover/item:text-white rounded-lg transition-all duration-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="group-hover/item:translate-x-1 transition-transform duration-300">
                    mantra.care.in1@gmail.com
                  </span>
                </a>
                <div className="flex items-center space-x-3 hover:translate-x-2 transition-transform duration-300 group/item">
                  <div className="p-2 bg-gray-300/50 group-hover/item:bg-green-600 group-hover/item:text-white rounded-lg transition-all duration-300">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>+91 1234567890</span>
                </div>
                <div className="flex items-center space-x-3 hover:translate-x-2 transition-transform duration-300 group/item">
                  <div className="p-2 bg-gray-300/50 group-hover/item:bg-red-600 group-hover/item:text-white rounded-lg transition-all duration-300">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>Neu road, Mumbai</span>
                </div>
              </div>
            </div>
            {/* Quick Links */}
            <div className="space-y-4 transform hover:scale-105 transition-all duration-500 group">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 relative group-hover:text-purple-800 transition-colors duration-300">
                Quick Links
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-full transition-all duration-500"></div>
              </h4>
              <ul className="space-y-2">
                {quickLinks.map(({ name, href }, index) => (
                  <li
                    key={index}
                    className="transform transition-all duration-300 hover:scale-105"
                  >
                    <a
                      href={href}
                      className="text-gray-800 hover:text-black hover:translate-x-4 transition-all duration-300 inline-block relative group/link"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="relative z-10">{name}</span>
                      <div className="absolute inset-0 w-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded group-hover/link:w-full transition-all duration-300 -z-0"></div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Services */}
            <div className="space-y-4 transform hover:scale-105 transition-all duration-500 group">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 relative group-hover:text-pink-800 transition-colors duration-300">
                Our Services
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-full transition-all duration-500"></div>
              </h4>
              <ul className="space-y-2">
                {ourServices.map((service, index) => (
                  <li
                    key={index}
                    className="transform transition-all duration-300 hover:scale-105"
                  >
                    <span
                      className="text-gray-800 cursor-default hover:text-black transition-colors duration-300 relative group/service inline-block"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <span className="relative z-10">{service}</span>
                      <div className="absolute inset-0 w-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded group-hover/service:w-full transition-all duration-300 -z-0"></div>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Bottom section */}
          <div className="border-t border-gray-600/50 pt-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 relative z-10">
              <div className="flex items-center space-x-2 text-gray-800 text-sm group hover:scale-105 transition-transform duration-300">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse group-hover:animate-bounce" />
                <span>by Mantra Care Team</span>
                <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="w-3 h-3 text-purple-600 animate-spin" />
                </div>
              </div>
              <div className="text-gray-800 text-sm hover:text-black transition-colors duration-300 hover:scale-105 transform">
                © {new Date().getFullYear()} Mantra Care. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm">
                <a
                  href="#"
                  className="text-gray-800 hover:text-black transition-all duration-300 transform hover:scale-110 hover:rotate-1 relative group"
                >
                  Privacy Policy
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></div>
                </a>
                <a
                  href="#"
                  className="text-gray-800 hover:text-black transition-all duration-300 transform hover:scale-110 hover:-rotate-1 relative group"
                >
                  Terms of Service
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Enhanced animated wave effect */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block w-full h-8 hover:h-10 transition-all duration-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="waveGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="rgb(75, 85, 99)" stopOpacity="0.3">
                  <animate
                    attributeName="stop-color"
                    values="rgb(75, 85, 99);rgb(59, 130, 246);rgb(147, 51, 234);rgb(75, 85, 99)"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop
                  offset="50%"
                  stopColor="rgb(59, 130, 246)"
                  stopOpacity="0.2"
                >
                  <animate
                    attributeName="stop-color"
                    values="rgb(59, 130, 246);rgb(147, 51, 234);rgb(236, 72, 153);rgb(59, 130, 246)"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop
                  offset="100%"
                  stopColor="rgb(147, 51, 234)"
                  stopOpacity="0.3"
                >
                  <animate
                    attributeName="stop-color"
                    values="rgb(147, 51, 234);rgb(236, 72, 153);rgb(75, 85, 99);rgb(147, 51, 234)"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>
            </defs>
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="url(#waveGradient)"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                values="0 0; 20 0; 0 0"
                dur="4s"
                repeatCount="indefinite"
              />
            </path>
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity="0.1"
              fill="rgb(99, 102, 241)"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                values="0 0; -15 0; 0 0"
                dur="6s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
        {/* Scroll to top button - Repositioned to avoid chatbot overlap */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50 hover:rotate-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <ArrowUp
            className={`w-5 h-5 transition-transform duration-300 ${
              isHovered ? "animate-bounce" : ""
            }`}
          />
        </button>
        <style jsx>{`
          @keyframes gradient {
            0%,
            100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          .animate-gradient {
            animation: gradient 3s ease infinite;
          }
          .bg-300\\% {
            background-size: 300% 300%;
          }
        `}</style>
      </footer>
    </div>
  );
});

export default Footer;