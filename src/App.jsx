import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import MiniNavbar from "./components/MiniNavbar";
import Services from "./components/Services";
import Testimonial from "./components/Testimonial";
import Price from "./components/Price";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import FAQ from "./components/FAQ";
import LoginPage from "./components/Loginpage";
import RegisterPage from "./components/Register";
import MoodTracker from "./components/MoodTracker";
import MeditationHub from "./components/MeditationHub";
import CrisisSupport from "./components/CrisisSupport";
import Doctor from "./components/Doctor";
import MentalHealthTest from "./components/MentalHealthTest";

// Loader Component
const Loader = () => {
  return (
    <div className="relative w-[65px] aspect-square">
      <span className="absolute rounded-[50px] animate-loaderAnim shadow-[inset_0_0_0_3px] shadow-white" />
      <span className="absolute rounded-[50px] animate-loaderAnim animation-delay shadow-[inset_0_0_0_3px] shadow-white" />
      <style jsx>{`
        @keyframes loaderAnim {
          0% {
            inset: 0 35px 35px 0;
          }
          12.5% {
            inset: 0 35px 0 0;
          }
          25% {
            inset: 35px 35px 0 0;
          }
          37.5% {
            inset: 35px 0 0 0;
          }
          50% {
            inset: 35px 0 0 35px;
          }
          62.5% {
            inset: 0 0 0 35px;
          }
          75% {
            inset: 0 0 35px 35px;
          }
          87.5% {
            inset: 0 0 35px 0;
          }
          100% {
            inset: 0 35px 35px 0;
          }
        }
        .animate-loaderAnim {
          animation: loaderAnim 2.5s infinite;
        }
        .animation-delay {
          animation-delay: -1.25s;
        }
      `}</style>
    </div>
  );
};

// Loading Screen Component
const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader />
        <p className="text-white text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="relative w-screen min-h-screen overflow-x-hidden">
        <Routes>
          {/* ✅ Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* ✅ Main Landing Page */}
          <Route
            path="/"
            element={
              <>
                <MiniNavbar />
                <Navbar />

                <section id="home">
                  <Hero />
                </section>

                <section id="services">
                  <Services />
                </section>

                <section id="moodtracker">
                  <MoodTracker />
                </section>

                <section id="mentalhealthtest">
                  <MentalHealthTest />
                </section>

                <section id="price">
                  <Price />
                </section>

                <section id="doctor">
                  <Doctor />
                </section>

                <section id="features">
                  <Features />
                </section>

                {/* <section id="Meditationhub">
                  <MeditationHub />
                </section> */}

                <section id="testimonial">
                  <Testimonial />
                </section>

                <section id="faq">
                  <FAQ />
                </section>

                <section id="crisissupport">
                  <CrisisSupport />
                </section>

                <section id="about">
                  <About />
                </section>

                <section id="footer">
                  <Footer />
                </section>
              </>
            }
          />
        </Routes>

        {/* ✅ Chatbot is global — always available */}
        <Chatbot />
      </div>
    </Router>
  );
};

export default App;
