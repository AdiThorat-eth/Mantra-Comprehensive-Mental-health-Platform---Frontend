import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X, Minimize2, Maximize2 } from 'lucide-react';
import API_CONFIG from '../config/api';
import { useAuth } from '../context/AuthContext';
import { LoginModal, RegisterModal } from './RegisterModel';

const Chatbot = () => {
  const { isAuthenticated } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm here to support you with mental health guidance. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'INITIAL'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  // Open by default while debugging visibility issues
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [authModalType, setAuthModalType] = useState(null); // 'login' | 'register' | null

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedTopics = [
    { text: "I'm feeling stressed", emoji: "😰" },
    { text: "Help with sleep issues", emoji: "😴" },
    { text: "Managing anxiety", emoji: "💭" },
    { text: "I need meditation guidance", emoji: "🧘‍♀" }
  ];

  const sendMessage = async (messageText = inputText) => {
    if (!isAuthenticated) {
      setAuthModalType('login');
      return;
    }
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      console.log('Sending message to:', `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CHAT_MESSAGE}`);
      console.log('Headers:', API_CONFIG.getHeaders());
      
      const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CHAT_MESSAGE}`, {
        method: 'POST',
        headers: API_CONFIG.getHeaders(),
        body: JSON.stringify({ message: messageText })
      });

      console.log('Response status:', res.status);
      console.log('Response headers:', res.headers);

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Server error:', errorText);
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }
      
      const data = await res.json();
      console.log('Response data:', data);
      console.log('Response data keys:', Object.keys(data));
      console.log('Response data type:', typeof data);

      // Handle different response formats from your backend
      let responseText = 'No response received';
      let responseType = 'AI_RESPONSE';
      
      if (data.data && data.data.response) {
        responseText = data.data.response;
        responseType = data.data.responseType || 'AI_RESPONSE';
      } else if (data.response) {
        responseText = data.response;
        responseType = data.responseType || 'AI_RESPONSE';
      } else if (data.message && data.message !== 'Message processed successfully') {
        responseText = data.message;
      } else if (data.aiResponse) {
        responseText = data.aiResponse;
      } else if (data.content) {
        responseText = data.content;
      } else if (data.text) {
        responseText = data.text;
      } else if (data.message === 'Message processed successfully') {
        responseText = "I understand your message. Let me think about how to best help you with that. Could you please provide more details about what you're looking for?";
      }

      const botMessage = {
        id: Date.now() + 1,
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
        type: responseType
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      let errorText = "I'm sorry, I'm having trouble connecting right now. Please try again or contact our support team.";
      
      if (error.message.includes('Failed to fetch')) {
        errorText = "Unable to connect to the server. Please check if your backend is running on http://localhost:8080";
      } else if (error.message.includes('401')) {
        errorText = "Authentication required. Please log in again.";
      } else if (error.message.includes('404')) {
        errorText = "Chat endpoint not found. Please check your backend API configuration.";
      }
      
      const errorMessage = {
        id: Date.now() + 1,
        text: errorText,
        sender: 'bot',
        timestamp: new Date(),
        type: 'ERROR'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedTopic = (topic) => {
    sendMessage(topic.text);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => {
            if (!isAuthenticated) {
              setAuthModalType('login');
              return;
            }
            setIsOpen(true);
          }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        >
          <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
        </button>

        {/* Auth Modals when user is not authenticated */}
        {authModalType === 'login' && (
          <LoginModal
            isOpen={true}
            onClose={() => setAuthModalType(null)}
            onSwitchToRegister={() => setAuthModalType('register')}
          />
        )}
        {authModalType === 'register' && (
          <RegisterModal
            isOpen={true}
            onClose={() => setAuthModalType(null)}
            onSwitchToLogin={() => setAuthModalType('login')}
          />
        )}
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
      }`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div>
              <h3 className="font-semibold">Mentra Chat Bot</h3>
              <p className="text-xs opacity-90">Always here to help</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-96">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <div className={`flex items-center mt-1 space-x-1 ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}>
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {message.type && message.sender === 'bot' && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          message.type === 'RULE_BASED' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          {message.type === 'RULE_BASED' ? 'Quick Help' : 'AI Response'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl rounded-bl-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Suggested Topics */}
              {messages.length === 1 && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 text-center">Try asking about:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {suggestedTopics.map((topic, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedTopic(topic)}
                        className="flex items-center space-x-2 p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left text-sm"
                      >
                        <span>{topic.emoji}</span>
                        <span className="text-gray-700">{topic.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message here..."
                    className="w-full resize-none border border-gray-300 rounded-full px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm max-h-20"
                    rows="1"
                    disabled={isLoading || !isAuthenticated}
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!inputText.trim() || isLoading || !isAuthenticated}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-1.5 rounded-full hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>
              {!isAuthenticated && (
                <p className="text-xs text-red-500 mt-2 text-center">
                  Please log in to use the chatbot.
                </p>
              )}
              <p className="text-xs text-gray-500 mt-2 text-center">
                This chatbot provides support guidance and is not a replacement for professional therapy.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Auth Modals when user is not authenticated */}
      {authModalType === 'login' && (
        <LoginModal
          isOpen={true}
          onClose={() => setAuthModalType(null)}
          onSwitchToRegister={() => setAuthModalType('register')}
        />
      )}
      {authModalType === 'register' && (
        <RegisterModal
          isOpen={true}
          onClose={() => setAuthModalType(null)}
          onSwitchToLogin={() => setAuthModalType('login')}
        />
      )}
    </div>
  );
};

export default Chatbot;
