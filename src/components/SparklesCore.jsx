"use client";
import React, { useId, useMemo } from "react";
import { useEffect, useState } from "react";

// Since we can't use external particles libraries in Claude artifacts,
// I'll create a simplified version that matches the API
const cn = (...classes) => classes.filter(Boolean).join(' ');

export const SparklesCore = ({ 
  id, 
  className, 
  background = "transparent", 
  minSize = 0.4, 
  maxSize = 1.2, 
  speed = 1, 
  particleColor = "#FFFFFF", 
  particleDensity = 120 
}) => {
  const [mounted, setMounted] = useState(false);
  const generatedId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={cn("opacity-0", className)} />;
  }

  const particleCount = Math.floor(particleDensity / 8); // Adjust for performance

  return (
    <div 
      className={cn("relative overflow-hidden opacity-100 transition-opacity duration-1000", className)}
      style={{ backgroundColor: background }}
    >
      <div className="absolute inset-0">
        {/* Main sparkle particles */}
        {[...Array(particleCount)].map((_, i) => (
          <div
            key={`${id || generatedId}-${i}`}
            className="absolute rounded-full animate-pulse"
            style={{
              backgroundColor: particleColor,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${minSize + Math.random() * (maxSize - minSize)}px`,
              height: `${minSize + Math.random() * (maxSize - minSize)}px`,
              opacity: 0.3 + Math.random() * 0.7,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 / speed + Math.random() * (2 / speed)}s`,
            }}
          />
        ))}
        
        {/* Twinkling particles */}
        {[...Array(Math.floor(particleCount / 2))].map((_, i) => (
          <div
            key={`twinkle-${id || generatedId}-${i}`}
            className="absolute rounded-full animate-ping"
            style={{
              backgroundColor: particleColor,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${minSize * 0.5}px`,
              height: `${minSize * 0.5}px`,
              opacity: 0.6 + Math.random() * 0.4,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 / speed + Math.random() * (2 / speed)}s`,
            }}
          />
        ))}

        {/* Floating particles with different animation */}
        {[...Array(Math.floor(particleCount / 4))].map((_, i) => (
          <div
            key={`float-${id || generatedId}-${i}`}
            className="absolute rounded-full animate-bounce"
            style={{
              backgroundColor: particleColor,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${minSize * 0.8 + Math.random() * (maxSize * 0.8 - minSize * 0.8)}px`,
              height: `${minSize * 0.8 + Math.random() * (maxSize * 0.8 - minSize * 0.8)}px`,
              opacity: 0.2 + Math.random() * 0.5,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 / speed + Math.random() * (3 / speed)}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};