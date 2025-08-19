import React from "react";
import { motion } from "framer-motion";

const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export function Card({
  children,
  className,
  patternClassName,
  gradientClassName,
}) {
  return (
    <motion.div
      className={cn(
        "w-full rounded-md overflow-hidden",
        "border-transparent",
        "p-3",
        "relative group z-10",
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Layer 1: The Glass Effect Background (Shadows for light/reflection) */}
      <div
        className="absolute top-0 left-0 z-0 h-full w-full rounded-sm
            shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)]
        transition-all
        dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)] border-4 border-white/40"
      />
      {/* Layer 2: Backdrop Filter (Distortion effect) - REMOVED OR MODIFIED */}
      {/* You can remove this div entirely or just the style prop */}
      {/*
      <div
        className="absolute top-0 left-0 isolate -z-10 h-full w-full rounded-md overflow-hidden"
        style={{ backdropFilter: 'url("#liquid-glass-filter")' }}
      />
      */}
      {/* Or, to remove the filter effect while keeping the div, change the style: */}
      <div
        className="absolute top-0 left-0 isolate -z-10 h-full w-full rounded-md overflow-hidden"
        // style={{ backdropFilter: 'none' }} // Or remove this line entirely
      />
      {/* Layer 3: The Diagonal Lines Pattern and Gradient */}
      <div
        className={cn(
          "absolute inset-0 z-5 w-full h-full bg-repeat",
          "bg-[length:30px_30px]",
          "bg-lines-pattern-light dark:bg-lines-pattern",
          patternClassName
        )}
      >
        <div
          className={cn(
            "w-full h-full bg-gradient-to-tr",
            "from-white/5 via-white/0 to-white/0",
            "dark:from-black/10 dark:via-black/0 dark:to-black/0",
            gradientClassName
          )}
        >
          {/* This div is just for the gradient over the pattern. No content here. */}
        </div>
      </div>
      {/* Layer 4: Text Background for Readability (Semi-transparent overlay over lines/glass) */}
      {/* Reduced opacity to make lines more visible */}
      <div className="absolute inset-0 z-10 bg-black/5 rounded-md backdrop-blur-[0px]"></div>{" "}
      {/* Changed backdrop-blur-[1px] to backdrop-blur-[0px] */}
      {/* Layer 5: Actual Card Content */}
      <div className="relative z-20">
        {" "}
        {/* z-20 to ensure content is always on top */}
        {children}
      </div>
      {/* SVG Filter Definition - IMPORTANT: This filter is no longer used if backdropFilter is removed */}
      {/* You can move this to a higher-level component if other elements use it,
          otherwise, if only this card used it and you've removed the backdropFilter,
          you could potentially remove this SVG block from here too. */}
      <svg className="hidden">
        <defs>
          <filter
            id="liquid-glass-filter"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.05 0.05"
              numOctaves="1"
              seed="1"
              result="turbulence"
            />
            <feGaussianBlur
              in="turbulence"
              stdDeviation="2"
              result="blurredNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blurredNoise"
              scale="70"
              xChannelSelector="R"
              yChannelSelector="B"
              result="displaced"
            />
            <feGaussianBlur
              in="displaced"
              stdDeviation="4"
              result="finalBlur"
            />
            <feComposite in="finalBlur" in2="finalBlur" operator="over" />
          </filter>
        </defs>
      </svg>
    </motion.div>
  );
}

export function CardBody({ className, ...props }) {
  return <div className={cn("text-left p-4 md:p-6", className)} {...props} />;
}
