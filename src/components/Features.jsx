import React, { useState } from "react";

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 1,
      title: "PDF Resources & Articles",
      brand: "MANTRA",
      category: "Knowledge",
      description: "Comprehensive guides and articles on mental health topics",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=face",
      bgColor: "from-blue-500 to-purple-600",
    },
    {
      id: 2,
      title: "Video Resources",
      brand: "MANTRA",
      category: "Visual Learning",
      description: "Educational videos and guided content for wellness",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      bgColor: "from-purple-500 to-pink-600",
    },
    {
      id: 3,
      title: "Meditation & Breathing",
      brand: "MANTRA",
      category: "Mindfulness",
      description:
        "Basic meditation and breathing exercises for daily practice",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      bgColor: "from-green-500 to-teal-600",
    },
    {
      id: 4,
      title: "Audio Resources",
      brand: "MANTRA",
      category: "Sound Therapy",
      description: "Calming audio content and guided meditations",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
      bgColor: "from-orange-500 to-red-600",
    },
    {
      id: 5,
      title: "AI Chatbot Support",
      brand: "MANTRA",
      category: "24/7 Support",
      description:
        "Intelligent conversational support for mental health guidance",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      bgColor: "from-teal-500 to-cyan-600",
    },
  ];

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative">
      <div className="absolute h-[96vh] w-[96vw] rr tt3 rrCenter flex flex-col justify-center items-center overflow-y-hidden">
        <div className="w-full h-full relative">
          {/* Header */}
          <div className="absolute top-8 left-8 z-20">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-4 shadow-lg"></div>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent uppercase tracking-widest">
                FEATURED FEATURES
              </span>
            </div>
          </div>

          {/* Features List - Full Width */}
          <div className="w-full h-full pt-20">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`relative w-full h-1/5 flex items-center cursor-pointer transition-all duration-500 border-b border-gray-200 ${
                  activeFeature === index
                    ? `bg-gradient-to-r ${feature.bgColor}`
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                {/* Feature Content */}
                <div className="w-full px-8 flex items-center justify-between relative z-10">
                  <h2
                    className={`text-2xl md:text-4xl font-bold transition-all duration-300 ${
                      activeFeature === index ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {feature.title}
                  </h2>

                  {/* Brand and Category on right */}
                  <div className="text-right">
                    <div
                      className={`text-lg font-medium ${
                        activeFeature === index ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {feature.brand}
                    </div>
                    <div
                      className={`text-sm ${
                        activeFeature === index
                          ? "text-white/80"
                          : "text-gray-500"
                      }`}
                    >
                      {feature.category}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Fixed Image Position - Beginning of second half */}
          {activeFeature !== null && (
            <div className="fixed left-1/2 top-1/2 transform -translate-y-1/2 z-30 pointer-events-none">
              <div className="relative">
                {/* Image container with rounded corners and no border */}
                <div
                  className="w-96 h-80 bg-cover bg-center rounded-3xl shadow-2xl transition-all duration-500"
                  style={{
                    backgroundImage: `url(${features[activeFeature].image})`,
                  }}
                >
                  {/* Inner overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-20 rounded-2xl"></div>
                </div>

                {/* Description below image */}
                <div className="mt-4 w-96">
                  <p className="text-sm text-white bg-black bg-opacity-50 p-3 rounded-lg backdrop-blur-sm">
                    {features[activeFeature].description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Features;