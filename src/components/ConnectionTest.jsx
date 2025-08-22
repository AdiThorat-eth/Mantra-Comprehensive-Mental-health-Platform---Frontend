import React, { useState } from 'react';
import API_CONFIG from '../config/api';
import { useAuth } from '../context/AuthContext';

const ConnectionTest = () => {
  const { token, isAuthenticated, user } = useAuth();
  const [testResult, setTestResult] = useState('');
  const [isTesting, setIsTesting] = useState(false);

  const testConnection = async () => {
    setIsTesting(true);
    setTestResult('Testing connection...');
    
    try {
      console.log('Testing connection to:', API_CONFIG.BASE_URL);
      console.log('Token being sent:', token);
      console.log('Headers being sent:', API_CONFIG.getHeaders());
      
      // Test basic connectivity
      const response = await fetch(`${API_CONFIG.BASE_URL}/api/chatbot/message`, {
        method: 'POST',
        headers: API_CONFIG.getHeaders(),
        body: JSON.stringify({ message: 'test' })
      });
      
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        setTestResult(`✅ Connection successful! Response: ${JSON.stringify(data, null, 2)}`);
      } else {
        const errorText = await response.text();
        setTestResult(`❌ Server responded with ${response.status}: ${errorText}`);
      }
    } catch (error) {
      console.error('Connection test error:', error);
      setTestResult(`❌ Connection failed: ${error.message}`);
    } finally {
      setIsTesting(false);
    }
  };

  const testWithoutAuth = async () => {
    setIsTesting(true);
    setTestResult('Testing connection without auth...');
    
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/api/chatbot/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'test' })
      });
      
      if (response.ok) {
        const data = await response.json();
        setTestResult(`✅ Connection successful without auth! Response: ${JSON.stringify(data, null, 2)}`);
      } else {
        const errorText = await response.text();
        setTestResult(`❌ Server responded with ${response.status}: ${errorText}`);
      }
    } catch (error) {
      setTestResult(`❌ Connection failed: ${error.message}`);
    } finally {
      setIsTesting(false);
    }
  };

  const setTestToken = () => {
    // Set a test token for debugging
    const testToken = 'test-token-123';
    localStorage.setItem('token', testToken);
    localStorage.setItem('user', JSON.stringify({ email: 'test@example.com' }));
    window.location.reload(); // Reload to update auth context
  };

  const testBackendHealth = async () => {
    setIsTesting(true);
    setTestResult('Testing backend health...');
    
    try {
      // Test if backend is reachable
      const response = await fetch(`${API_CONFIG.BASE_URL}/api/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        const data = await response.json();
        setTestResult(`✅ Backend is healthy! Response: ${JSON.stringify(data, null, 2)}`);
      } else {
        const errorText = await response.text();
        setTestResult(`⚠️ Backend responded with ${response.status}: ${errorText}`);
      }
    } catch (error) {
      setTestResult(`❌ Backend not reachable: ${error.message}`);
    } finally {
      setIsTesting(false);
    }
  };

  const clearToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <div className="fixed top-4 left-4 z-50 bg-white p-4 rounded-lg shadow-lg border max-w-md">
      <h3 className="font-semibold text-lg mb-2">Connection Test</h3>
      <div className="space-y-2">
        <button
          onClick={testBackendHealth}
          disabled={isTesting}
          className="bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600 disabled:opacity-50"
        >
          Test Backend Health
        </button>
        <button
          onClick={testConnection}
          disabled={isTesting}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 disabled:opacity-50"
        >
          Test with Auth
        </button>
        <button
          onClick={testWithoutAuth}
          disabled={isTesting}
          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 disabled:opacity-50"
        >
          Test without Auth
        </button>
        <button
          onClick={clearToken}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
        >
          Clear Token
        </button>
      </div>
      {testResult && (
        <div className="mt-3 p-2 bg-gray-100 rounded text-xs">
          <pre className="whitespace-pre-wrap">{testResult}</pre>
        </div>
      )}
      <div className="mt-2 text-xs text-gray-600">
        <p>Backend URL: {API_CONFIG.BASE_URL}</p>
        <p>Endpoint: {API_CONFIG.ENDPOINTS.CHAT_MESSAGE}</p>
        <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
        <p>Token: {token ? 'Present' : 'Missing'}</p>
        <p>User: {user ? user.email || 'Logged in' : 'Not logged in'}</p>
        {token && (
          <p className="text-xs text-gray-500 mt-1">
            Token: {token.substring(0, 10)}...
          </p>
        )}
      </div>
    </div>
  );
};

export default ConnectionTest;
