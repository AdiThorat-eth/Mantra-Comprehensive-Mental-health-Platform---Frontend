// API Configuration
const API_CONFIG = {
  // Change this to your backend URL
  BASE_URL: 'http://localhost:8080',
  
  // API endpoints
  ENDPOINTS: {
    CHAT_MESSAGE: '/api/chatbot/message',
  },
  
  // Headers
  getHeaders: () => {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Only add Authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  },
  
  // Debug function to test connection
  testConnection: async () => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/api/health`, {
        method: 'GET',
        headers: API_CONFIG.getHeaders(),
      });
      return response.ok;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  },
};

export default API_CONFIG;
