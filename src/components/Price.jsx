import React, { useState, useEffect, useRef } from "react";
import { Check, Star } from "lucide-react";

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
    <div
      className={cn(
        "w-full rounded-md overflow-hidden",
        "border-transparent",
        "p-3",
        "relative group z-10",
        className
      )}
      style={{
        opacity: 1,
        transform: "translateY(0px)",
        transition: "all 0.8s ease-out",
      }}
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
    </div>
  );
}

export function CardBody({ className, ...props }) {
  return <div className={cn("text-left p-4 md:p-6", className)} {...props} />;
}

const Price = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isVisible, setIsVisible] = useState({
    title: false,
    description1: false,
    description2: false,
    toggle: false,
  });

  const titleRef = useRef(null);
  const desc1Ref = useRef(null);
  const desc2Ref = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elementId = entry.target.dataset.element;
          setIsVisible((prev) => ({
            ...prev,
            [elementId]: true,
          }));
        }
      });
    }, observerOptions);

    if (titleRef.current) observer.observe(titleRef.current);
    if (desc1Ref.current) observer.observe(desc1Ref.current);
    if (desc2Ref.current) observer.observe(desc2Ref.current);
    if (toggleRef.current) observer.observe(toggleRef.current);

    return () => observer.disconnect();
  }, []);

  const pricingTiers = [
    {
      name: "Free Tier",
      price: isAnnual ? "₹0" : "₹0",
      period: isAnnual ? "/month" : "/month",
      description:
        "Perfect for individuals starting their mental health journey",
      features: [
        "PDF resources & articles",
        "Video resources",
        "Basic meditation & breathing exercises",
      ],
      cta: "Start Basic Care",
      color: "border-blue-200 hover:border-blue-300",
    },
    {
      name: "Professional Care",
      price: isAnnual ? "₹3,899" : "₹5,499",
      period: isAnnual ? "/month" : "/month",
      description: "Comprehensive support with professional guidance",
      features: [
        "Everything Free Tier includes",
        "Audio resources",
        "AI chatbot support",
        "Priority customer support",
      ],
      popular: true,
      cta: "Choose Professional",
      color: "border-green-300 ring-2 ring-green-200 hover:ring-green-300",
    },
    {
      name: "Enterprise Care",
      price: "Free",
      period: "",
      description: "Complete mental health ecosystem for organizations",
      features: [
        "Everything in Professional Care",
        "Unlimited therapy sessions",
        "Group therapy & workshops",
        "24/7 crisis support",
      ],
      cta: "Contact Sales",
      color: "border-purple-200 hover:border-purple-300",
    },
  ];

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 25px rgba(59, 130, 246, 0.6),
              0 0 35px rgba(59, 130, 246, 0.4);
          }
        }

        @keyframes typewriter {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes blinkCursor {
          0%,
          50% {
            border-right-color: rgba(59, 130, 246, 1);
          }
          51%,
          100% {
            border-right-color: transparent;
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-typewriter {
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid rgba(59, 130, 246, 1);
          animation: typewriter 2s steps(40) forwards, blinkCursor 1s infinite;
        }

        .animate-typewriter.visible {
          animation: typewriter 2s steps(40) forwards, blinkCursor 1s infinite;
        }

        .animate-slide-left {
          opacity: 0;
          transform: translateX(-50px);
          transition: all 0.8s ease-out;
        }

        .animate-slide-left.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .animate-slide-right {
          opacity: 0;
          transform: translateX(50px);
          transition: all 0.8s ease-out;
        }

        .animate-slide-right.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .animate-scale-in {
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.8s ease-out;
        }

        .animate-scale-in.visible {
          opacity: 1;
          transform: scale(1);
        }

        .pricing-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .pricing-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.15),
            transparent
          );
          transition: left 0.6s ease;
        }

        .pricing-card:hover::before {
          left: 100%;
        }

        .pricing-card:hover {
          transform: translateY(-8px) rotateY(3deg) rotateX(3deg);
        }

        .pricing-card-basic:hover {
          box-shadow: inset 0 0 30px rgba(59, 130, 246, 0.2),
            inset 0 0 60px rgba(59, 130, 246, 0.1);
        }

        .pricing-card-professional {
          animation: float 6s ease-in-out infinite;
        }

        .pricing-card-professional:hover {
          animation: glow 2s ease-in-out infinite;
          box-shadow: inset 0 0 30px rgba(34, 197, 94, 0.2),
            inset 0 0 60px rgba(34, 197, 94, 0.1);
        }

        .pricing-card-enterprise:hover {
          box-shadow: inset 0 0 30px rgba(168, 85, 247, 0.2),
            inset 0 0 60px rgba(168, 85, 247, 0.1);
        }

        .hover-gradient {
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .hover-gradient::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            transparent 0%,
            rgba(255, 255, 255, 0.08) 50%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .hover-gradient:hover::after {
          opacity: 1;
        }

        .popular-badge {
          animation: float 4s ease-in-out infinite;
        }

        /* Mobile responsive adjustments */
        @media (max-width: 640px) {
          .animate-typewriter {
            white-space: normal;
            border-right: none;
            animation: none;
          }

          .pricing-card:hover {
            transform: none;
          }
        }

        @media (max-width: 1024px) {
          .pricing-card:hover {
            transform: translateY(-4px);
          }
        }
      `}</style>

      <div className="h-[100vh] w-screen flex flex-col justify-center items-center relative">
        <div className="absolute h-[96vh] w-[96vw] rr tt7 rrCenter flex flex-col justify-center items-center overflow-y-hidden">
          {/* Header Section */}
          <div className="text-center mb-4 sm:mb-6 lg:mb-8 px-4">
            <h1
              ref={titleRef}
              data-element="title"
              className={`text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4 animate-typewriter inline-block ${
                isVisible.title ? "visible" : ""
              }`}
            >
              Choose Your Mental Health
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 special-font block sm:inline">
                {" "}
                <b>
                  <ss>Journey </ss>
                </b>
              </span>
            </h1>

            <p
              ref={desc1Ref}
              data-element="description1"
              className={`text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto mb-2 sm:mb-3 animate-slide-left ${
                isVisible.description1 ? "visible" : ""
              }`}
            >
              Professional mental health support tailored to your needs.
            </p>

            <p
              ref={desc2Ref}
              data-element="description2"
              className={`text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto mb-4 sm:mb-6 animate-slide-right ${
                isVisible.description2 ? "visible" : ""
              }`}
            >
              Start your wellness journey today with our comprehensive platform.
            </p>

            {/* Billing Toggle */}
            <div
              ref={toggleRef}
              data-element="toggle"
              className={`flex items-center justify-center mb-4 sm:mb-6 animate-scale-in ${
                isVisible.toggle ? "visible" : ""
              }`}
            >
              <span
                className={`text-xs sm:text-sm font-medium ${
                  !isAnnual ? "text-white" : "text-white/60"
                }`}
              >
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="mx-3 sm:mx-4 relative inline-flex h-5 sm:h-6 w-9 sm:w-11 items-center rounded-full bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span
                  className={`inline-block h-3 sm:h-4 w-3 sm:w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual
                      ? "translate-x-5 sm:translate-x-6 bg-blue-600"
                      : "translate-x-1"
                  }`}
                />
              </button>
              <span
                className={`text-xs sm:text-sm font-medium ${
                  isAnnual ? "text-white" : "text-white/60"
                }`}
              >
                Annual
                <span className="ml-1 inline-flex items-center rounded-full bg-green-500 px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium text-white">
                  Save 30%
                </span>
              </span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-7xl mx-auto px-4 w-full">
            {/* Popular Badge */}
            <div
              className="absolute top-[25vh] sm:top-[30vh] lg:top-[32.5vh] left-1/2 transform -translate-x-1/2 hidden lg:block"
              style={{ zIndex: 1000 }}
            >
              <span className="popular-badge inline-flex items-center rounded-full bg-gradient-to-r from-green-500 to-blue-500 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white shadow-xl border-2 border-white/20">
                <Star className="w-3 sm:w-4 h-3 sm:h-4 mr-1 fill-white" />
                Most Popular
              </span>
            </div>

            {pricingTiers.map((tier, index) => (
              <Card
                key={tier.name}
                className={`pricing-card ${
                  tier.name === "Free Tier"
                    ? "pricing-card-basic"
                    : tier.name === "Professional Care"
                    ? "pricing-card-professional"
                    : "pricing-card-enterprise"
                } w-full h-auto ${
                  tier.popular ? "lg:transform lg:scale-105" : "hover:scale-105"
                } relative`}
              >
                <CardBody className="hover-gradient p-3 sm:p-4 lg:p-6 h-[45vh] sm:h-[50vh] lg:h-[55vh] flex flex-col relative overflow-visible">
                  {/* Mobile Popular Badge */}
                  {tier.popular && (
                    <div className="flex justify-center mb-3 lg:hidden">
                      <span className="popular-badge inline-flex items-center rounded-full bg-gradient-to-r from-green-500 to-blue-500 px-3 py-1.5 text-xs font-medium text-white shadow-xl border-2 border-white/20">
                        <Star className="w-3 h-3 mr-1 fill-white" />
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-3 sm:mb-4 lg:mb-6 relative z-20">
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1 sm:mb-2">
                      {tier.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 mb-2 sm:mb-3 leading-relaxed">
                      {tier.description}
                    </p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                        {tier.price}
                      </span>
                      <span className="text-sm sm:text-base lg:text-lg text-white/70 ml-1">
                        {tier.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-1.5 sm:space-y-2 lg:space-y-3 mb-3 sm:mb-4 lg:mb-6 flex-1 relative z-20">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="w-3 sm:w-4 lg:w-5 h-3 sm:h-4 lg:h-5 text-green-400 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-white/90 leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`relative z-20 w-full py-2 sm:py-2.5 lg:py-3 px-3 sm:px-4 lg:px-6 rounded-xl font-semibold text-xs sm:text-sm lg:text-base transition-all duration-200 ${
                      tier.popular
                        ? "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 shadow-lg hover:shadow-xl"
                        : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30"
                    }`}
                  >
                    {tier.cta}
                  </button>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price;
