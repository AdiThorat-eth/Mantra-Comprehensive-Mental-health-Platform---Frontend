import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Shield,
  Heart,
  Users,
  Sparkles,
} from "lucide-react";

// Import GSAP and ScrollTrigger
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What is Mantra and how can it help me?",
    answer:
      "Mantra is a mental health platform designed to provide accessible self-care tools, resources, and guided support to improve your mental well-being. Our goal is to create a safe space where you can learn, reflect, and grow.",
    icon: <Heart className="h-5 w-5" />,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    question: "Is Mantra a replacement for therapy?",
    answer:
      "No. Mantra is not a replacement for therapy or professional medical advice. We provide general mental well-being guidance, but if you are struggling with severe issues, we recommend consulting a licensed mental health professional.",
    icon: <Users className="h-5 w-5" />,
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    question: "How do I know if I should seek professional help?",
    answer:
      "If you are experiencing persistent feelings of sadness, anxiety, hopelessness, or thoughts of self-harm, please seek help from a licensed mental health provider. If it's an emergency, contact local emergency services immediately.",
    icon: <HelpCircle className="h-5 w-5" />,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    question: "Is my information safe here?",
    answer:
      "Yes. Protecting your privacy is our top priority. All user data is encrypted, kept confidential, and never shared with third parties without your consent.",
    icon: <Shield className="h-5 w-5" />,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    question: "Can I use this platform for free?",
    answer:
      "Yes! Mantra provides free resources. Premium services, such as guided programs or one-on-one consultations, may be available depending on your subscription plan.",
    icon: <Sparkles className="h-5 w-5" />,
    gradient: "from-violet-500 to-purple-500",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const titleRef = useRef(null); // Create a ref for the title

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    // This useEffect hook runs after the component mounts
    gsap.fromTo(
      titleRef.current,
      {
        y: -50,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%", // Animation starts when the top of the element hits 80% down from the top of the viewport
          toggleActions: "play none none reverse", // Defines behavior on scroll
        },
      }
    );

    // This will revert the animation on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf(titleRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      <div className="absolute h-[96vh] w-[96vw] rr tt8 rrCenter flex flex-col justify-center items-center">
        <div className="max-w-4xl w-full space-y-6 relative z-10 px-4">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <h1
                className="text-3xl md:text-4xl special-font bg-clip-text bg-gradient-to-r from-blue-900 to-purple-900 text-transparent"
                ref={titleRef} // Assign the ref to the h1 element
              >
                <ccc>
                  Frequently Asked <ss>Questions</ss>
                </ccc>
              </h1>
              <p className="text-md text-black max-w-xl mx-auto">
                <b>
                  Find answers to common questions about Mantra and our mental
                  health support services.
                </b>
              </p>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`group bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-white/20 overflow-hidden ${
                  openIndex === index
                    ? "ring-2 ring-purple-200 shadow-purple-100/50"
                    : ""
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full p-4 text-left focus:outline-none group-hover:bg-gradient-to-r group-hover:from-purple-50/50 group-hover:to-pink-50/50 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div
                      className={`flex-shrink-0 w-10 h-10 bg-gradient-to-tr ${faq.gradient} rounded-lg flex items-center justify-center text-white shadow-lg transform transition-transform group-hover:scale-110`}
                    >
                      {faq.icon}
                    </div>
                    <span className="font-semibold text-gray-900 text-base leading-relaxed pr-2">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`flex-shrink-0 transition-all duration-300 ${
                      openIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-purple-600" />
                  </div>
                </button>

                <div
                  className={`transition-all duration-500 ease-in-out ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <div className="px-4 pb-4">
                    <div className="ml-12 pr-6">
                      <div className="h-px bg-gradient-to-r from-purple-200 via-pink-200 to-transparent mb-2"></div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="text-center pt-6">
            <div className="inline-flex items-center space-x-1 text-xs text-gray-500 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
              <Heart className="h-3 w-3 text-pink-500" />
              <span>Your mental health matters</span>
              <Heart className="h-3 w-3 text-pink-500" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes pulse-light {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.02);
          }
        }
        .animate-pulse-light {
          animation: pulse-light 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}