import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  AlertTriangle,
  Home
} from 'lucide-react';

const CrisisSupport = () => {
  const [currentView, setCurrentView] = useState('home');
  const [groundingStep, setGroundingStep] = useState(0);
  const [isGroundingActive, setIsGroundingActive] = useState(false);

  const emergencyContacts = [
    { name: "National Crisis Line", number: "988", description: "24/7 Suicide & Crisis Lifeline" },
    { name: "Crisis Text Line", number: "741741", description: "Text HOME to connect" },
    { name: "Emergency Services", number: "911", description: "Immediate emergency help" }
  ];

  const groundingExercises = [
    { name: "5-4-3-2-1", description: "Name 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste" },
    { name: "Box Breathing", description: "Inhale 4, hold 4, exhale 4, hold 4" },
    { name: "Body Scan", description: "Focus on each part of your body from toes to head" },
    { name: "Safe Place", description: "Imagine yourself in a peaceful, safe location" }
  ];

  const crisisResources = [
    { title: "You are not alone", content: "Millions of people experience similar feelings. Help is available." },
    { title: "This will pass", content: "Crisis feelings are temporary. You have survived 100% of your bad days." },
    { title: "You matter", content: "Your life has value. You are worthy of help and support." },
    { title: "Reach out", content: "Call a friend, family member, or professional. People want to help." }
  ];

  const startGrounding = () => {
    setIsGroundingActive(true);
    setGroundingStep(0);
  };

  const nextGroundingStep = () => {
    if (groundingStep < groundingExercises.length - 1) {
      setGroundingStep(groundingStep + 1);
    } else {
      setIsGroundingActive(false);
      setGroundingStep(0);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute top-20 -right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="absolute h-screen w-[96vw] rr tt13 rrCenter flex flex-col justify-center items-center overflow-hidden">
        <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-4">
          {currentView === 'home' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 max-w-2xl w-full"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">Crisis Support</h2>
                <p className="text-gray-300">You're not alone. Help is available.</p>
              </div>

              {/* Emergency Contacts */}
              <div className="bg-red-500/20 p-6 rounded-xl border border-red-500/30">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <AlertTriangle size={24} />
                  Emergency Contacts
                </h3>
                <div className="space-y-3">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="bg-white/10 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-medium">{contact.name}</div>
                          <div className="text-gray-300 text-sm">{contact.description}</div>
                        </div>
                        <button
                          onClick={() => window.open(`tel:${contact.number}`)}
                          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
                        >
                          <Phone size={16} />
                          {contact.number}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setCurrentView('grounding')}
                  className="bg-white/10 p-4 rounded-lg border border-white/20 hover:bg-white/20 transition-all text-center"
                >
                  <div className="text-2xl mb-2">🌬️</div>
                  <div className="text-white font-medium">Grounding</div>
                </button>
                <button
                  onClick={() => setCurrentView('resources')}
                  className="bg-white/10 p-4 rounded-lg border border-white/20 hover:bg-white/20 transition-all text-center"
                >
                  <div className="text-2xl mb-2">💝</div>
                  <div className="text-white font-medium">Resources</div>
                </button>
              </div>
            </motion.div>
          )}

          {currentView === 'grounding' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 max-w-2xl w-full"
            >
              <div className="text-center">
                <button
                  onClick={() => setCurrentView('home')}
                  className="flex items-center gap-2 text-gray-300 hover:text-white mb-4"
                >
                  <Home size={20} />
                  Back to Support
                </button>
                <h2 className="text-2xl font-bold text-white mb-2">Grounding Exercises</h2>
                <p className="text-gray-300">Help yourself feel more present and calm</p>
              </div>

              {!isGroundingActive ? (
                <div className="space-y-4">
                  {groundingExercises.map((exercise, index) => (
                    <div key={index} className="bg-white/10 p-4 rounded-lg border border-white/20">
                      <div className="text-white font-medium mb-2">{exercise.name}</div>
                      <div className="text-gray-300 text-sm">{exercise.description}</div>
                    </div>
                  ))}
                  <button
                    onClick={startGrounding}
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
                  >
                    Start Guided Grounding
                  </button>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="bg-white/20 p-8 rounded-xl">
                    <div className="text-4xl mb-4">🧘‍♀️</div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {groundingExercises[groundingStep].name}
                    </h3>
                    <p className="text-gray-300 text-lg">
                      {groundingExercises[groundingStep].description}
                    </p>
                  </div>
                  <button
                    onClick={nextGroundingStep}
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all"
                  >
                    {groundingStep < groundingExercises.length - 1 ? 'Next' : 'Complete'}
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {currentView === 'resources' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 max-w-2xl w-full"
            >
              <div className="text-center">
                <button
                  onClick={() => setCurrentView('home')}
                  className="flex items-center gap-2 text-gray-300 hover:text-white mb-4"
                >
                  <Home size={20} />
                  Back to Support
                </button>
                <h2 className="text-2xl font-bold text-white mb-2">Crisis Resources</h2>
                <p className="text-gray-300">Remember these important messages</p>
              </div>

              <div className="space-y-4">
                {crisisResources.map((resource, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 p-6 rounded-lg border border-white/20"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">{resource.title}</h3>
                    <p className="text-gray-300">{resource.content}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrisisSupport;
