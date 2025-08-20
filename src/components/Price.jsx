import React, { useState } from "react";
import { Check, Star } from "lucide-react";

const Price = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingTiers = [
    {
      name: "Basic Care",
      price: isAnnual ? "₹1,499" : "₹2,299",
      period: isAnnual ? "/month" : "/month",
      description:
        "Perfect for individuals starting their mental health journey",
      features: [
        "24/7 AI Mental Health Assistant",
        "Daily mood tracking & insights",
        "Basic meditation & breathing exercises",
        "Weekly wellness check-ins",
        "Educational mental health resources",
        "Community support groups",
        "Mobile app access",
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
        "Everything in Basic Care",
        "Monthly sessions with licensed therapists",
        "Personalized treatment plans",
        "Crisis intervention support",
        "Advanced analytics & progress tracking",
        "Family therapy sessions (2 per month)",
        "Priority customer support",
        "Prescription management tools",
        "Custom wellness goals",
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
        "Dedicated mental health coordinator",
        "Group therapy & workshops",
        "Employee assistance program (EAP)",
        "Advanced reporting & analytics",
        "White-label solution available",
        "API access & integrations",
        "Custom onboarding & training",
        "24/7 phone crisis support",
      ],
      cta: "Contact Sales",
      color: "border-purple-200 hover:border-purple-300",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Mental Health
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              {" "}
              Journey
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Professional mental health support tailored to your needs. Start
            your wellness journey today with our comprehensive platform.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-8">
            <span
              className={`text-sm font-medium ${
                !isAnnual ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="mx-4 relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? "translate-x-6 bg-blue-600" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium ${
                isAnnual ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Annual
              <span className="ml-1 inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                Save 30%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative bg-white rounded-2xl shadow-lg ${
                tier.color
              } border-2 p-8 transition-all duration-300 hover:shadow-xl ${
                tier.popular ? "transform scale-105" : "hover:scale-105"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-green-500 to-blue-500 px-4 py-2 text-sm font-medium text-white shadow-lg">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {tier.name}
                </h3>
                <p className="text-gray-600 mb-4">{tier.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-gray-900">
                    {tier.price}
                  </span>
                  <span className="text-xl text-gray-500 ml-1">
                    {tier.period}
                  </span>
                </div>
                {isAnnual && tier.period && (
                  <p className="text-sm text-green-600 mt-2">
                    2 months free included
                  </p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
                  tier.popular
                    ? "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 shadow-lg hover:shadow-xl"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Price;
