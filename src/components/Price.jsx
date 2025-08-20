import React, { useState } from "react";
import { Check, Star } from "lucide-react";
import { Card, CardBody } from "./Card";

const Price = () => {
  const [isAnnual, setIsAnnual] = useState(false);

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

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
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
      `}</style>

      <div className="absolute h-screen w-[96vw] rr bc rrCenter flex flex-col justify-center items-center overflow-y-hidden">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Choose Your Mental Health
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
              {" "}
              Journey
            </span>
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-6">
            Professional mental health support tailored to your needs. Start
            your wellness journey today with our comprehensive platform.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-6">
            <span
              className={`text-sm font-medium ${
                !isAnnual ? "text-white" : "text-white/60"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="mx-4 relative inline-flex h-6 w-11 items-center rounded-full bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? "translate-x-6 bg-blue-600" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium ${
                isAnnual ? "text-white" : "text-white/60"
              }`}
            >
              Annual
              <span className="ml-1 inline-flex items-center rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-white">
                Save 30%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 commit md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
          <div
            className="absolute top-[33vh] left-1/2 transform -translate-x-1/2"
            style={{ zIndex: 1000 }}
          >
            <span className="popular-badge inline-flex items-center rounded-full bg-gradient-to-r from-green-500 to-blue-500 px-4 py-2 text-sm font-medium text-white shadow-xl border-2 border-white/20">
              <Star className="w-4 h-4 mr-1 fill-white" />
              Most Popular
            </span>
          </div>
          {pricingTiers.map((tier, index) => (
            <Card
              key={tier.name}
              className={`pricing-card ${
                tier.name === "Basic Care"
                  ? "pricing-card-basic"
                  : tier.name === "Professional Care"
                  ? "pricing-card-professional"
                  : "pricing-card-enterprise"
              } w-full h-auto ${
                tier.popular ? "transform scale-105" : "hover:scale-105"
              } relative`}
            >
              <CardBody className="hover-gradient p-6 h-[55dvh] flex flex-col relative overflow-visible">
                <div className="text-center mb-6 relative z-20">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-white/80 mb-3">
                    {tier.description}
                  </p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-bold text-white">
                      {tier.price}
                    </span>
                    <span className="text-lg text-white/70 ml-1">
                      {tier.period}
                    </span>
                  </div>
                  {/* {isAnnual && tier.period && (
                    <p className="text-xs text-green-400 mt-1">
                      2 months free included
                    </p>
                  )} */}
                </div>

                <ul className="space-y-3 mb-6 flex-1 relative z-20">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/90">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`relative z-20 w-full py-3 px-6 rounded-xl font-semibold text-base transition-all duration-200 ${
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
  );
};

export default Price;
