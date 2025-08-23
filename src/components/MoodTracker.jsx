import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  BarChart3, 
  TrendingUp, 
  Smile, 
  Frown, 
  Meh, 
  Heart,
  BookOpen,
  Save,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Import useNavigate from react-router-dom for redirecting to login
import { useNavigate } from 'react-router-dom';

const MoodTracker = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('checkin'); // 'checkin', 'history', 'journal'
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodIntensity, setMoodIntensity] = useState(5);
  const [journalEntry, setJournalEntry] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Remove lock popup state, as we will redirect to login instead
  // const [showLockPopup, setShowLockPopup] = useState(false);

  const moods = [
    { id: 'excellent', label: 'Excellent', emoji: '😄', color: 'bg-green-500', value: 10 },
    { id: 'happy', label: 'Happy', emoji: '😊', color: 'bg-green-400', value: 8 },
    { id: 'good', label: 'Good', emoji: '🙂', color: 'bg-blue-400', value: 6 },
    { id: 'okay', label: 'Okay', emoji: '😐', color: 'bg-yellow-400', value: 4 },
    { id: 'sad', label: 'Sad', emoji: '😔', color: 'bg-orange-400', value: 2 },
    { id: 'terrible', label: 'Terrible', emoji: '😢', color: 'bg-red-500', value: 0 }
  ];

  const journalPrompts = [
    "What made you feel this way today?",
    "What's one thing you're grateful for?",
    "What would make tomorrow better?",
    "How are you taking care of yourself today?",
    "What's on your mind right now?"
  ];

  useEffect(() => {
    // Load mood history from localStorage
    const savedHistory = localStorage.getItem('moodHistory');
    if (savedHistory) {
      setMoodHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Helper to require login for actions
  const requireAuth = (action) => {
    if (!isAuthenticated) {
      navigate('/login');
      return; // <-- Add this line to prevent further execution
    }
    action();
  };

  // For tab navigation
  const handleTabClick = (tabId) => {
    requireAuth(() => setCurrentView(tabId));
  };

  // For mood selection
  const handleMoodSelect = (mood) => {
    requireAuth(() => setSelectedMood(mood));
  };

  // For slider
  const handleIntensityChange = (e) => {
    requireAuth(() => setMoodIntensity(parseInt(e.target.value)));
  };

  // For textarea
  const handleJournalChange = (e) => {
    requireAuth(() => setJournalEntry(e.target.value));
  };

  // For saving mood entry
  const saveMoodEntry = async () => {
    requireAuth(async () => {
      if (!selectedMood) return;
      setIsSubmitting(true);
      const entry = {
        id: Date.now(),
        date: selectedDate.toISOString().split('T')[0],
        mood: selectedMood,
        intensity: moodIntensity,
        journal: journalEntry,
        timestamp: new Date().toISOString()
      };
      const updatedHistory = [...moodHistory, entry];
      setMoodHistory(updatedHistory);
      localStorage.setItem('moodHistory', JSON.stringify(updatedHistory));
      setSelectedMood(null);
      setMoodIntensity(5);
      setJournalEntry('');
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setCurrentView('history');
      }, 2000);
      setIsSubmitting(false);
    });
  };

  const getMoodStats = () => {
    if (moodHistory.length === 0) return null;

    const last7Days = moodHistory.slice(-7);
    const averageMood = last7Days.reduce((sum, entry) => sum + entry.mood.value, 0) / last7Days.length;
    const mostFrequentMood = moods.find(mood => 
      mood.value === Math.round(averageMood)
    );

    return {
      averageMood: Math.round(averageMood * 10) / 10,
      mostFrequentMood,
      streak: calculateStreak(),
      totalEntries: moodHistory.length
    };
  };

  const calculateStreak = () => {
    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    const sortedHistory = [...moodHistory].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    for (let i = 0; i < sortedHistory.length; i++) {
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() - i);
      const expectedDateStr = expectedDate.toISOString().split('T')[0];
      
      if (sortedHistory[i].date === expectedDateStr) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  // MoodCheckIn disables all input if not authenticated
  const MoodCheckIn = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">How are you feeling today?</h2>
        <p className="text-gray-300">Take a moment to check in with yourself</p>
      </div>

      {/* Mood Selection */}
      <div className="grid grid-cols-3 gap-4">
        {moods.map((mood) => (
          <motion.button
            key={mood.id}
            whileHover={isAuthenticated ? { scale: 1.05 } : false}
            whileTap={isAuthenticated ? { scale: 0.95 } : false}
            onClick={isAuthenticated ? () => handleMoodSelect(mood) : undefined}
            disabled={!isAuthenticated}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedMood?.id === mood.id
                ? 'border-white bg-white/20'
                : 'border-white/20 hover:border-white/40'
            } ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
            tabIndex={isAuthenticated ? 0 : -1}
          >
            <div className="text-4xl mb-2">{mood.emoji}</div>
            <div className="text-sm text-white font-medium">{mood.label}</div>
          </motion.button>
        ))}
      </div>

      {/* Mood Intensity */}
      {selectedMood && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-4"
        >
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">How intense is this feeling?</h3>
            <div className="flex items-center justify-center gap-4">
              <span className="text-gray-300">Mild</span>
              <input
                type="range"
                min="1"
                max="10"
                value={moodIntensity}
                onChange={isAuthenticated ? handleIntensityChange : undefined}
                className="w-48 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                disabled={!isAuthenticated}
                tabIndex={isAuthenticated ? 0 : -1}
              />
              <span className="text-gray-300">Intense</span>
            </div>
            <div className="text-white font-medium mt-2">{moodIntensity}/10</div>
          </div>

          {/* Journal Entry */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Optional: Add a note</h3>
            <textarea
              value={journalEntry}
              onChange={isAuthenticated ? handleJournalChange : undefined}
              placeholder={journalPrompts[Math.floor(Math.random() * journalPrompts.length)]}
              className="w-full h-24 p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:border-white/40"
              disabled={!isAuthenticated}
              tabIndex={isAuthenticated ? 0 : -1}
            />
          </div>

          <motion.button
            whileHover={isAuthenticated ? { scale: 1.02 } : false}
            whileTap={isAuthenticated ? { scale: 0.98 } : false}
            onClick={isAuthenticated ? saveMoodEntry : undefined}
            disabled={isSubmitting || !isAuthenticated}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50"
            tabIndex={isAuthenticated ? 0 : -1}
          >
            {isSubmitting ? 'Saving...' : 'Save Mood Entry'}
          </motion.button>
        </motion.div>
      )}

      {!isAuthenticated && (
        <div className="mt-6 text-center">
          <div className="inline-block bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Please log in to record your mood.
          </div>
        </div>
      )}
    </motion.div>
  );

  // MoodHistory disables interaction if not authenticated (but is always visible)
  const MoodHistory = () => {
    const stats = getMoodStats();
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Your Mood Journey</h2>
          <p className="text-gray-300">Track your emotional well-being over time</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 p-4 rounded-lg border border-white/20">
              <div className="text-2xl mb-1">{stats.mostFrequentMood.emoji}</div>
              <div className="text-white font-semibold">Average Mood</div>
              <div className="text-gray-300 text-sm">{stats.averageMood}/10</div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg border border-white/20">
              <div className="text-2xl mb-1">🔥</div>
              <div className="text-white font-semibold">Current Streak</div>
              <div className="text-gray-300 text-sm">{stats.streak} days</div>
            </div>
          </div>
        )}

        {/* Mood Chart */}
        <div className="bg-white/10 p-4 rounded-lg border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">Last 7 Days</h3>
          <div className="flex items-end justify-between h-32 gap-2">
            {moodHistory.slice(-7).map((entry, index) => {
              const mood = moods.find(m => m.id === entry.mood.id);
              const height = (entry.mood.value / 10) * 100;
              return (
                <div key={entry.id} className="flex flex-col items-center flex-1">
                  <div className="text-xs text-gray-300 mb-1">{mood.emoji}</div>
                  <div
                    className="w-full rounded-t bg-gradient-to-t from-purple-500 to-pink-500"
                    style={{ height: `${height}%` }}
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Entries */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Recent Entries</h3>
          {moodHistory.slice(-5).reverse().map((entry) => (
            <div key={entry.id} className="bg-white/10 p-3 rounded-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{entry.mood.emoji}</span>
                  <div>
                    <div className="text-white font-medium">{entry.mood.label}</div>
                    <div className="text-gray-300 text-sm">
                      {new Date(entry.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>
                <div className="text-gray-300 text-sm">Intensity: {entry.intensity}/10</div>
              </div>
              {entry.journal && (
                <div className="mt-2 text-gray-300 text-sm italic">"{entry.journal}"</div>
              )}
            </div>
          ))}
        </div>
        {!isAuthenticated && (
          <div className="mt-6 text-center">
            <div className="inline-block bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Please log in to view your full mood history.
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  // JournalView disables interaction if not authenticated (but is always visible)
  const JournalView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Mood Journal</h2>
        <p className="text-gray-300">Reflect on your thoughts and feelings</p>
      </div>

      <div className="space-y-4">
        {moodHistory.filter(entry => entry.journal).reverse().map((entry) => (
          <div key={entry.id} className="bg-white/10 p-4 rounded-lg border border-white/20">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{entry.mood.emoji}</span>
              <div>
                <div className="text-white font-medium">{entry.mood.label}</div>
                <div className="text-gray-300 text-sm">
                  {new Date(entry.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </div>
            <div className="text-gray-300 leading-relaxed">"{entry.journal}"</div>
          </div>
        ))}
      </div>
      {!isAuthenticated && (
        <div className="mt-6 text-center">
          <div className="inline-block bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Please log in to view your full journal.
          </div>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative text-white">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-20 -right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="absolute h-[96vh] w-[96vw] rr tt12 rrCenter flex flex-col justify-center items-center overflow-y-hidden">
        <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-4">
          {/* Navigation Tabs */}
          <div className="flex gap-2 mb-8">
            {[
              { id: 'checkin', label: 'Daily Check-in', icon: Heart },
              { id: 'history', label: 'Mood History', icon: BarChart3 },
              { id: 'journal', label: 'Journal', icon: BookOpen }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={isAuthenticated ? { scale: 1.05 } : false}
                  whileTap={isAuthenticated ? { scale: 0.95 } : false}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                    currentView === tab.id
                      ? 'bg-white/20 border-white text-white'
                      : 'border-white/20 text-gray-300 hover:border-white/40'
                  }`}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="w-full max-w-2xl">
            <AnimatePresence mode="wait">
              {currentView === 'checkin' && <MoodCheckIn key="checkin" />}
              {currentView === 'history' && <MoodHistory key="history" />}
              {currentView === 'journal' && <JournalView key="journal" />}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            <div className="flex items-center gap-2">
              <span>✅</span>
              <span>Mood entry saved successfully!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MoodTracker;
