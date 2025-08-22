import React, { useState, useEffect, useRef } from "react";
import { SparklesCore } from "./SparklesCore";

const About = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [isTitleVisible, setIsTitleVisible] = useState(false);

  const titleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsTitleVisible(true);
        } else {
          setIsTitleVisible(false);
        }
      });
    }, observerOptions);

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const sections = [
    {
      title: "About Mantra",
      subtitle: "Mental Health Platform",
      content:
        "Mantra is a comprehensive mental health platform founded by a team of five passionate individuals. We created this digital space to address the growing need for accessible mental health support.",
    },
    {
      title: "Our Vision",
      subtitle: "Accessible Mental Wellness",
      content:
        "To make mental well-being accessible and destigmatized, empowering everyone to lead a mentally healthier life.",
    },
    {
      title: "The Team",
      subtitle: "Five Dedicated Minds",
      content:
        "We are a team of five who believe in the power of technology to drive positive change. We are dedicated to providing a trustworthy and user-friendly platform.",
    },
    {
      title: "Join Our Mission",
      subtitle: "Start Your Journey",
      content:
        "Start your journey to a healthier mind. Join the Mantra community today and take the first step toward better mental wellness.",
    },
  ];

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative">
      <style jsx>{`
        .reveal-text {
          overflow: hidden;
        }

        .reveal-text .word {
          display: inline-block;
          opacity: 1;
          transform: translateY(100%);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .reveal-text.visible .word {
          opacity: 1;
          transform: translateY(0);
        }

        .reveal-text.visible .word:nth-child(1) {
          transition-delay: 0s;
        }
        .reveal-text.visible .word:nth-child(2) {
          transition-delay: 0s;
        }
      `}</style>

      <div className="absolute h-[96vh] w-[96vw] rr tt6 rrCenter flex flex-col justify-center items-center overflow-y-auto">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-8 h-full flex flex-col">
          {/* Header Section - Compact for no scroll */}
          <div className="flex-shrink-0 text-center pt-8 pb-6">
            <div className="inline-block">
              <h1
                ref={titleRef}
                className={`text-4xl md:text-5xl font-light text-gray-800 mb-4 tracking-tight reveal-text ${
                  isTitleVisible ? "visible" : ""
                }`}
              >
                <span className="word font-bold">About</span>
                <span className="word font-bold" style={{ marginLeft: "0.25em" }}>
                  Mantra
                </span>
              </h1>

              {/* Compact Sparkles Effect Container */}
              <div className="w-full h-20 relative mb-4">
                <div className="absolute inset-x-20 top-8 bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-[2px] w-3/4 blur-sm mx-auto left-0 right-0" />
                <div className="absolute inset-x-20 top-8 bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px w-3/4 mx-auto left-0 right-0" />
                <div className="absolute inset-x-32 top-8 bg-gradient-to-r from-transparent via-emerald-400 to-transparent h-[3px] w-1/2 blur-sm mx-auto left-0 right-0" />
                <div className="absolute inset-x-40 top-8 bg-gradient-to-r from-transparent via-emerald-300 to-transparent h-[4px] w-1/3 blur-sm mx-auto left-0 right-0" />

                <SparklesCore
                  background="transparent"
                  minSize={0.4}
                  maxSize={1.2}
                  particleDensity={1200}
                  className="w-full h-full"
                  particleColor="#10b981"
                  speed={0.8}
                />

                <div className="absolute inset-0 w-full h-full bg-transparent [mask-image:radial-gradient(500px_50px_at_center,transparent_20%,black_60%,transparent_100%)]"></div>
              </div>

              <div className="w-16 h-0.5 bg-emerald-500 mx-auto mb-4" />
              <p className="text-lg text-gray-600 font-light max-w-xl mx-auto">
                Transforming mental health through compassionate technology
              </p>
            </div>
          </div>

          {/* Main Content Area - Compact for no scroll */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-4xl">
              <div className="relative">
                {sections.map((section, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 transform ${
                      activeSection === index
                        ? "translate-y-0 opacity-100"
                        : activeSection > index
                        ? "-translate-y-8 opacity-0"
                        : "translate-y-8 opacity-0"
                    }`}
                  >
                    <div className="text-center space-y-8">
                      {/* Section Title - Compact spacing */}
                      <div className="space-y-3">
                        <h2 className="text-3xl md:text-4xl font-light text-gray-800 leading-tight">
                          {section.title}
                        </h2>
                        <p className="text-emerald-600 font-medium text-lg tracking-wide">
                          {section.subtitle}
                        </p>
                      </div>

                      {/* Section Content - Optimized size */}
                      <div className="max-w-3xl mx-auto px-4">
                        <p className="text-xl text-gray-700 leading-relaxed font-light">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Placeholder for consistent height */}
                <div className="invisible">
                  <div className="text-center space-y-8">
                    <div className="space-y-3">
                      <h2 className="text-3xl md:text-4xl font-light">
                        Placeholder
                      </h2>
                      <p className="text-lg">Placeholder subtitle</p>
                    </div>
                    <div className="max-w-3xl mx-auto px-4">
                      <p className="text-xl leading-relaxed">
                        Placeholder content for consistent height and proper spacing
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Navigation - Compact spacing */}
          <div className="flex-shrink-0 pb-8">
            <div className="flex justify-center items-center space-x-3">
              {sections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSection(index)}
                  className={`transition-all duration-300 ${
                    activeSection === index
                      ? "w-8 h-2 bg-emerald-600 rounded-full"
                      : "w-2 h-2 bg-gray-300 hover:bg-gray-400 rounded-full"
                  }`}
                  aria-label={`Go to section ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Side Stats - Compact spacing */}
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
            <div className="space-y-12 text-left">
              <div>
                <div className="text-3xl font-light text-emerald-600 mb-1">5</div>
                <div className="text-s text-gray-600 uppercase tracking-wide">
                  Team Members
                </div>
              </div>
              <div>
                <div className="text-3xl font-light text-emerald-600 mb-1">2024</div>
                <div className="text-s text-gray-600 uppercase tracking-wide">
                  Founded
                </div>
              </div>
              <div>
                <div className="text-3xl font-light text-emerald-600 mb-1">∞</div>
                <div className="text-s text-gray-600 uppercase tracking-wide">
                  Impact
                </div>
              </div>
            </div>
          </div>

          {/* Side Quote - Compact layout */}
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden xl:block max-w-xs">
            <div className="text-right space-y-2">
              <blockquote className="text-gray-600 italic text-sm leading-relaxed">
                "Mental health is not a destination, but a process. It's about
                how you drive, not where you're going."
              </blockquote>
              <div className="text-xs text-gray-500 font-light">
                — Mantra Philosophy
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;