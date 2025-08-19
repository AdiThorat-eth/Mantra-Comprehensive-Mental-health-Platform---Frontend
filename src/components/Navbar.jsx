// Navbar.jsx
import React, { useRef, useState, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button"; // Assuming this is used elsewhere or will be removed if not needed
import { CgMenu } from "react-icons/cg"; // Not used in Navbar, can be removed

const Navbar = () => {
  const navContainerRef = useRef(null);

  const handleProductClick = () => {
    console.log("Product button clicked!");
  };

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-6 top-4 z-[100] h-16 border-none backdrop-blur-md rounded-2xl"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between px-4 py-2 bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 shadow-lg shadow-black/10 mix-blend-difference">
          <div className="flex items-center gap-7 w-full relative">
            {/* Logos - Fixed positioning */}
            <div className="flex-shrink-0 flex items-center gap-3">
              <img
                className="h-10 w-10 bordr" // Typo: 'bordr' should probably be 'border'
                src="/img/logo.png"
                alt="mantra logo logo"
              />
            </div>

            {/* Left Navigation Buttons - ONLY VISIBLE ON MD AND UP */}
            {/* Original comment for CgMenu button was here, it's moved to MiniNavbar */}
            <div className="absolute right-20 mr-5 flex-shrink-0 animate-shimmer hidden lg:flex">
              {" "}
              {/* Added hidden md:flex */}
              <LiquidGlassButton
                id="Register"
                title="Register"
                // onClick={() => {} } // Add your register logic here
              />
            </div>

            {/* Spacer to push Play button to the right */}
            <div className="flex-grow"></div>

            {/* Right Play Button - ONLY VISIBLE ON MD AND UP */}
            <div className="flex-shrink-0 text-white animate-shimmer hidden lg:flex">
              {" "}
              {/* Added hidden md:flex */}
              <LiquidGlassButton
                id="Log-In"
                title="LogIn"
                variant="primary"
                // onClick={() => {} } // Add your login logic here
              />
            </div>
          </div>
        </nav>
      </header>

      {/* Glass Filter SVG */}
      <GlassFilter />
    </div>
  );
};

const LiquidGlassButton = ({
  id,
  title,
  rightIcon,
  onClick,
  variant = "default",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Removed 'md:flex hidden' from here, applied directly to the wrapping div in Navbar component
  const baseClasses =
    "relative inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 cursor-pointer overflow-hidden rounded-full outline-none";

  const glassClasses = `${baseClasses} bg-white/30 backdrop-blur-lg border border-white/40 text-black shadow-lg hover:bg-white/40 hover:scale-105 hover:shadow-xl font-bold`;

  const primaryClasses =
    variant === "primary"
      ? `${baseClasses} bg-gradient-to-r from-blue-500/40 to-purple-500/40 backdrop-blur-lg border border-blue-400/50 text-black shadow-lg hover:from-blue-500/50 hover:to-purple-500/50 hover:scale-105 hover:shadow-xl font-bold`
      : glassClasses;

  return (
    <button
      id={id}
      className={primaryClasses}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ backdropFilter: 'url("#container-glass")' }}
    >
      {/* Glass effect overlay */}
      <div className="absolute inset-0 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-1px_0_rgba(0,0,0,0.2)] pointer-events-none" />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        <span className="font-General text-xs uppercase tracking-wide font-bold text-shadow-sm">
          {title}
        </span>
        {rightIcon && <span className="ml-1">{rightIcon}</span>}
      </span>

      {/* Hover shimmer effect - Always active */}
      {isHovered && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full animate-shimmer pointer-events-none" />
      )}
    </button>
  );
};

const GlassFilter = () => {
  return (
    <svg className="hidden">
      <defs>
        <filter
          id="container-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.02"
            numOctaves="2"
            seed="1"
            result="turbulence"
          />
          <feGaussianBlur
            in="turbulence"
            stdDeviation="1"
            result="blurredNoise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="20"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="1" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
};

export default Navbar;
