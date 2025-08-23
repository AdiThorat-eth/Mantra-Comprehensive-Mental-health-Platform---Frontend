import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX,
  Clock,
  Target,
  Award,
  Heart,
  Wind,
  Music,
  BookOpen,
  Settings,
  ChevronLeft,
  ChevronRight,
  Timer,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MeditationHub = () => {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState('home'); // 'home', 'timer', 'guided', 'breathing', 'progress'
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes default
  const [selectedDuration, setSelectedDuration] = useState(5);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const [meditationHistory, setMeditationHistory] = useState([]);
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const [breathingCycle, setBreathingCycle] = useState(0);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [selectedBreathingPattern, setSelectedBreathingPattern] = useState('box');
  const [ambientSound, setAmbientSound] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const timerRef = useRef(null);
  const breathingRef = useRef(null);
  const audioRef = useRef(null);

  const durations = [5, 10, 15, 20, 30, 45, 60];

  const guidedSessions = [
    {
      id: 1,
      title: "Beginner's Mind",
      duration: 5,
      category: "Mindfulness",
      description: "Perfect for beginners. Learn to focus on your breath.",
      icon: "🧘‍♀️",
      audio: "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav"
    },
    {
      id: 2,
      title: "Stress Relief",
      duration: 10,
      category: "Relaxation",
      description: "Release tension and find inner calm.",
      icon: "😌",
      audio: "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav"
    },
    {
      id: 3,
      title: "Deep Sleep",
      duration: 15,
      category: "Sleep",
      description: "Prepare your mind and body for restful sleep.",
      icon: "😴",
      audio: "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav"
    },
    {
      id: 4,
      title: "Anxiety Relief",
      duration: 10,
      category: "Anxiety",
      description: "Calm your nervous system and reduce anxiety.",
      icon: "💭",
      audio: "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav"
    },
    {
      id: 5,
      title: "Focus & Clarity",
      duration: 15,
      category: "Focus",
      description: "Sharpen your concentration and mental clarity.",
      icon: "🎯",
      audio: "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav"
    },
    {
      id: 6,
      title: "Self-Compassion",
      duration: 20,
      category: "Emotional",
      description: "Cultivate kindness and compassion toward yourself.",
      icon: "💝",
      audio: "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav"
    }
  ];

  const breathingPatterns = [
    {
      id: 'box',
      name: 'Box Breathing',
      pattern: [4, 4, 4, 4],
      description: 'Equal inhale, hold, exhale, hold',
      icon: '📦'
    },
    {
      id: '478',
      name: '4-7-8 Breathing',
      pattern: [4, 7, 8, 0],
      description: 'Inhale 4, hold 7, exhale 8',
      icon: '🌬️'
    },
    {
      id: 'triangle',
      name: 'Triangle Breathing',
      pattern: [4, 4, 6, 0],
      description: 'Inhale 4, hold 4, exhale 6',
      icon: '🔺'
    },
    {
      id: 'relaxing',
      name: 'Relaxing Breath',
      pattern: [4, 0, 6, 0],
      description: 'Inhale 4, exhale 6',
      icon: '😌'
    }
  ];

  const ambientSounds = [
    { id: 'rain', name: 'Rain', icon: '🌧️', audio: '#' },
    { id: 'ocean', name: 'Ocean Waves', icon: '🌊', audio: '#' },
    { id: 'forest', name: 'Forest', icon: '🌲', audio: '#' },
    { id: 'fire', name: 'Crackling Fire', icon: '🔥', audio: '#' },
    { id: 'white-noise', name: 'White Noise', icon: '⚪', audio: '#' },
    { id: 'birds', name: 'Birdsong', icon: '🐦', audio: '#' }
  ];

  useEffect(() => {
    // Load meditation history from localStorage
    const savedHistory = localStorage.getItem('meditationHistory');
    if (savedHistory) {
      setMeditationHistory(JSON.parse(savedHistory));
    }

    // Cleanup audio on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSessionComplete();
    }
    return () => clearTimeout(timerRef.current);
  }, [isTimerRunning, timeLeft]);

  useEffect(() => {
    if (isBreathingActive) {
      const pattern = breathingPatterns.find(p => p.id === selectedBreathingPattern);
      const [inhale, hold, exhale, holdOut] = pattern.pattern;
      
      let currentPhase = 0;
      let phaseTime = inhale;
      
      const breathingTimer = setInterval(() => {
        if (currentPhase === 0) {
          setBreathingPhase('inhale');
          phaseTime = inhale;
        } else if (currentPhase === 1) {
          setBreathingPhase('hold');
          phaseTime = hold;
        } else if (currentPhase === 2) {
          setBreathingPhase('exhale');
          phaseTime = exhale;
        } else if (currentPhase === 3) {
          setBreathingPhase('hold');
          phaseTime = holdOut;
        }
        
        currentPhase = (currentPhase + 1) % 4;
        if (currentPhase === 0) {
          setBreathingCycle(prev => prev + 1);
        }
      }, phaseTime * 1000);
      
      breathingRef.current = breathingTimer;
      return () => clearInterval(breathingTimer);
    }
  }, [isBreathingActive, selectedBreathingPattern]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setIsTimerRunning(true);
    setCurrentSession({
      startTime: new Date(),
      duration: selectedDuration,
      type: 'timer'
    });
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(selectedDuration * 60);
  };

  const handleSessionComplete = () => {
    setIsTimerRunning(false);
    const session = {
      id: Date.now(),
      date: new Date().toISOString(),
      duration: selectedDuration,
      type: 'timer',
      completed: true
    };
    
    const updatedHistory = [...meditationHistory, session];
    setMeditationHistory(updatedHistory);
    localStorage.setItem('meditationHistory', JSON.stringify(updatedHistory));
    
    // Show completion message
    setTimeout(() => {
      setCurrentView('home');
    }, 2000);
  };

  const startBreathing = () => {
    setIsBreathingActive(true);
    setBreathingCycle(0);
  };

  const stopBreathing = () => {
    setIsBreathingActive(false);
    setBreathingPhase('inhale');
    setBreathingCycle(0);
  };

  const getStats = () => {
    if (meditationHistory.length === 0) return null;
    
    const totalSessions = meditationHistory.length;
    const totalMinutes = meditationHistory.reduce((sum, session) => sum + session.duration, 0);
    const thisWeek = meditationHistory.filter(session => {
      const sessionDate = new Date(session.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return sessionDate > weekAgo;
    });
    
    return {
      totalSessions,
      totalMinutes,
      weeklySessions: thisWeek.length,
      averageSession: Math.round(totalMinutes / totalSessions)
    };
  };

  const playAudio = (session) => {
    if (currentAudio && isPlaying) {
      // Stop current audio
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentAudio(null);
    }

    if (currentAudio?.id === session.id) {
      // Same session clicked - stop it
      return;
    }

    // Play new audio
    const audio = new Audio();
    audio.crossOrigin = "anonymous";
    audioRef.current = audio;
    setCurrentAudio(session);
    setIsPlaying(true);
    
    // Set up event listeners before setting src
    audio.onloadeddata = () => {
      console.log('Audio loaded successfully');
    };
    
    audio.onerror = (error) => {
      console.log('Audio error:', error);
      setIsPlaying(false);
      setCurrentAudio(null);
      alert('Audio preview not available. This would play guided meditation audio in the full version.');
    };
    
    audio.onended = () => {
      setIsPlaying(false);
      setCurrentAudio(null);
    };
    
    // Set the source and play
    audio.src = session.audio;
    audio.load();
    
    audio.play().catch(error => {
      console.log('Audio playback failed:', error);
      setIsPlaying(false);
      setCurrentAudio(null);
      alert('Audio preview not available. This would play guided meditation audio in the full version.');
    });
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentAudio(null);
    }
  };

  const testAudio = () => {
    const testAudio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
    testAudio.play().then(() => {
      console.log('Test audio played successfully');
    }).catch(error => {
      console.log('Test audio failed:', error);
    });
  };

  const HomeView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Meditation Hub</h2>
        <p className="text-gray-300">Find your inner peace and mental clarity</p>
      </div>

      {/* Quick Start Timer */}
      <div className="bg-white/10 p-6 rounded-xl border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Start</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {durations.map(duration => (
            <button
              key={duration}
              onClick={() => setSelectedDuration(duration)}
              className={`px-3 py-2 rounded-lg text-sm transition-all ${
                selectedDuration === duration
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/20 text-gray-300 hover:bg-white/30'
              }`}
            >
              {duration}m
            </button>
          ))}
        </div>
        <button
          onClick={() => setCurrentView('timer')}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
        >
          Start {selectedDuration}-Minute Session
        </button>
      </div>

      {/* Stats Cards */}
      {getStats() && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 p-4 rounded-lg border border-white/20 text-center">
            <div className="text-2xl mb-1">🧘‍♀️</div>
            <div className="text-white font-semibold">{getStats().totalSessions}</div>
            <div className="text-gray-300 text-sm">Total Sessions</div>
          </div>
          <div className="bg-white/10 p-4 rounded-lg border border-white/20 text-center">
            <div className="text-2xl mb-1">⏱️</div>
            <div className="text-white font-semibold">{getStats().totalMinutes}m</div>
            <div className="text-gray-300 text-sm">Total Minutes</div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setCurrentView('guided')}
          className="bg-white/10 p-4 rounded-lg border border-white/20 hover:bg-white/20 transition-all text-center"
        >
          <div className="text-2xl mb-2">🎧</div>
          <div className="text-white font-medium">Guided Sessions</div>
        </button>
        <button
          onClick={() => setCurrentView('breathing')}
          className="bg-white/10 p-4 rounded-lg border border-white/20 hover:bg-white/20 transition-all text-center"
        >
          <div className="text-2xl mb-2">🌬️</div>
          <div className="text-white font-medium">Breathing</div>
        </button>
      </div>
    </motion.div>
  );

  const TimerView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <button
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-2 text-gray-300 hover:text-white mb-4"
        >
          <ChevronLeft size={20} />
          Back to Hub
        </button>
        <h2 className="text-2xl font-bold text-white mb-2">Meditation Timer</h2>
      </div>

      {/* Timer Display */}
      <div className="text-center">
        <div className="text-6xl md:text-8xl font-bold text-white mb-6 font-mono">
          {formatTime(timeLeft)}
        </div>
        
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={isTimerRunning ? pauseTimer : startTimer}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center hover:scale-105 transition-all"
          >
            {isTimerRunning ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button
            onClick={resetTimer}
            className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all"
          >
            <RotateCcw size={24} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center gap-2 text-gray-300 hover:text-white"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            <span className="text-sm">{isMuted ? 'Unmute' : 'Mute'}</span>
          </button>
        </div>
      </div>

      {/* Session Info */}
      {currentSession && (
        <div className="bg-white/10 p-4 rounded-lg border border-white/20 text-center">
          <div className="text-white font-medium">Current Session</div>
          <div className="text-gray-300 text-sm">
            Started at {currentSession.startTime.toLocaleTimeString()}
          </div>
        </div>
      )}
    </motion.div>
  );

  const GuidedView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 h-full overflow-y-auto pb-20"
    >
             <div className="text-center sticky top-0 bg-black/50 backdrop-blur-sm py-4 z-10">
         <button
           onClick={() => {
             stopAudio();
             setCurrentView('home');
           }}
           className="flex items-center gap-2 text-gray-300 hover:text-white mb-4"
         >
           <ChevronLeft size={20} />
           Back to Hub
         </button>
         <h2 className="text-2xl font-bold text-white mb-2">Guided Sessions</h2>
         <p className="text-gray-300">Choose a guided meditation to begin</p>
         <button
           onClick={testAudio}
           className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
         >
           Test Audio
         </button>
       </div>

      <div className="space-y-4 px-4">
        {guidedSessions.map(session => (
          <div
            key={session.id}
            className="bg-white/10 p-4 rounded-lg border border-white/20 hover:bg-white/20 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">{session.icon}</div>
              <div className="flex-1">
                <div className="text-white font-semibold">{session.title}</div>
                <div className="text-gray-300 text-sm">{session.description}</div>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-purple-400 text-sm">{session.category}</span>
                  <span className="text-gray-400 text-sm">{session.duration}m</span>
                </div>
              </div>
              <button 
                onClick={() => playAudio(session)}
                className={`p-2 rounded-lg transition-all ${
                  currentAudio?.id === session.id && isPlaying
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-purple-500 hover:bg-purple-600'
                } text-white`}
              >
                {currentAudio?.id === session.id && isPlaying ? (
                  <Pause size={20} />
                ) : (
                  <Play size={20} />
                )}
              </button>
            </div>
            {currentAudio?.id === session.id && isPlaying && (
              <div className="mt-3 pt-3 border-t border-white/20">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-400">Playing...</span>
                  <button
                    onClick={stopAudio}
                    className="text-red-400 hover:text-red-300"
                  >
                    Stop
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );

  const BreathingView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <button
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-2 text-gray-300 hover:text-white mb-4"
        >
          <ChevronLeft size={20} />
          Back to Hub
        </button>
        <h2 className="text-2xl font-bold text-white mb-2">Breathing Exercises</h2>
      </div>

      {/* Breathing Pattern Selection */}
      <div className="grid grid-cols-2 gap-3">
        {breathingPatterns.map(pattern => (
          <button
            key={pattern.id}
            onClick={() => setSelectedBreathingPattern(pattern.id)}
            className={`p-4 rounded-lg border transition-all text-center ${
              selectedBreathingPattern === pattern.id
                ? 'bg-purple-500 border-purple-400'
                : 'bg-white/10 border-white/20 hover:bg-white/20'
            }`}
          >
            <div className="text-2xl mb-2">{pattern.icon}</div>
            <div className="text-white font-medium text-sm">{pattern.name}</div>
            <div className="text-gray-300 text-xs mt-1">{pattern.description}</div>
          </button>
        ))}
      </div>

      {/* Active Breathing Display */}
      {isBreathingActive && (
        <div className="text-center">
          <div className={`text-8xl mb-6 transition-all duration-1000 ${
            breathingPhase === 'inhale' ? 'scale-125' : 'scale-100'
          }`}>
            {breathingPhase === 'inhale' ? '🫁' : breathingPhase === 'hold' ? '⏸️' : '💨'}
          </div>
          <div className="text-2xl font-bold text-white mb-2 capitalize">
            {breathingPhase}
          </div>
          <div className="text-gray-300">Cycle {breathingCycle + 1}</div>
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex justify-center gap-4">
        {!isBreathingActive ? (
          <button
            onClick={startBreathing}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            Start Breathing
          </button>
        ) : (
          <button
            onClick={stopBreathing}
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all"
          >
            Stop
          </button>
        )}
      </div>
    </motion.div>
  );

  const ProgressView = () => {
    const stats = getStats();
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="text-center">
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2 text-gray-300 hover:text-white mb-4"
          >
            <ChevronLeft size={20} />
            Back to Hub
          </button>
          <h2 className="text-2xl font-bold text-white mb-2">Your Progress</h2>
        </div>

        {stats ? (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-4 rounded-lg border border-white/20 text-center">
                <div className="text-2xl mb-1">📊</div>
                <div className="text-white font-semibold">{stats.totalSessions}</div>
                <div className="text-gray-300 text-sm">Total Sessions</div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg border border-white/20 text-center">
                <div className="text-2xl mb-1">⏱️</div>
                <div className="text-white font-semibold">{stats.totalMinutes}m</div>
                <div className="text-gray-300 text-sm">Total Minutes</div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg border border-white/20 text-center">
                <div className="text-2xl mb-1">📅</div>
                <div className="text-white font-semibold">{stats.weeklySessions}</div>
                <div className="text-gray-300 text-sm">This Week</div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg border border-white/20 text-center">
                <div className="text-2xl mb-1">📈</div>
                <div className="text-white font-semibold">{stats.averageSession}m</div>
                <div className="text-gray-300 text-sm">Avg Session</div>
              </div>
            </div>

            {/* Recent Sessions */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Recent Sessions</h3>
              {meditationHistory.slice(-5).reverse().map(session => (
                <div key={session.id} className="bg-white/10 p-3 rounded-lg border border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🧘‍♀️</span>
                      <div>
                        <div className="text-white font-medium">{session.duration}m Session</div>
                        <div className="text-gray-300 text-sm">
                          {new Date(session.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="text-green-400">✓</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center text-gray-300">
            <div className="text-6xl mb-4">🧘‍♀️</div>
            <p>Start your meditation journey to see your progress here!</p>
          </div>
        )}
      </motion.div>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center relative">
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">🧘‍♀️</div>
          <h2 className="text-2xl font-bold text-gray-800">Begin Your Meditation Journey</h2>
          <p className="text-gray-600 max-w-md">
            Log in to access guided meditations, breathing exercises, and track your mindfulness progress.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative text-white">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-20 -right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="absolute h-screen w-[96vw] rr bc rrCenter flex flex-col justify-center items-center overflow-hidden">
        <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-4">
          {/* Navigation Tabs - Only show on home view */}
          {currentView === 'home' && (
            <div className="flex gap-2 mb-8">
              {[
                { id: 'home', label: 'Hub', icon: Sparkles },
                { id: 'progress', label: 'Progress', icon: Award }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentView(tab.id)}
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
          )}

          {/* Content Area */}
          <div className="w-full max-w-2xl h-full flex flex-col">
            <AnimatePresence mode="wait">
              {currentView === 'home' && <HomeView key="home" />}
              {currentView === 'timer' && <TimerView key="timer" />}
              {currentView === 'guided' && <GuidedView key="guided" />}
              {currentView === 'breathing' && <BreathingView key="breathing" />}
              {currentView === 'progress' && <ProgressView key="progress" />}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Session Completion Message */}
      <AnimatePresence>
        {timeLeft === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <div className="bg-white/95 text-black p-8 rounded-xl text-center max-w-sm mx-4">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-xl font-bold mb-2">Session Complete!</h3>
              <p className="text-gray-600 mb-4">
                Great job! You've completed your {selectedDuration}-minute meditation session.
              </p>
              <button
                onClick={() => setCurrentView('home')}
                className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-all"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MeditationHub;
