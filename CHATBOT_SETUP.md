# Chatbot Integration Setup Guide

## Overview
The chatbot has been successfully integrated into your Mantra Mental Health Platform frontend. It provides mental health guidance and support through an interactive chat interface.

## Features
- ✅ Interactive chat interface
- ✅ Suggested topics for quick start
- ✅ Minimize/maximize functionality
- ✅ Real-time message exchange
- ✅ Loading states and error handling
- ✅ Responsive design
- ✅ Professional UI with gradient styling

## Configuration

### 1. Backend URL Configuration
Update the backend URL in `src/config/api.js`:
```javascript
const API_CONFIG = {
  BASE_URL: 'http://localhost:5000', // Change this to your backend URL
  // ... rest of config
};
```

### 2. Vite Proxy Configuration
The proxy is already configured in `vite.config.js` to forward `/api` requests to your backend:
```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000', // Change this to your backend URL
      changeOrigin: true,
      secure: false,
    }
  }
}
```

## Backend API Requirements

Your backend should have an endpoint at `/api/chatbot/message` that:

1. **Accepts POST requests** with the following body:
```json
{
  "message": "User's message here"
}
```

2. **Requires Authorization header**:
```
Authorization: Bearer <token>
```

3. **Returns JSON response**:
```json
{
  "response": "Bot's response message",
  "responseType": "RULE_BASED" // or "AI_RESPONSE"
}
```

## Usage

### Starting the Development Server
```bash
npm run dev
```

### Testing the Chatbot
1. Open your application in the browser
2. Look for the chat icon in the bottom-right corner
3. Click to open the chat interface
4. Start typing messages or use suggested topics

## Customization

### Changing the Chatbot Branding
Update the header in `src/components/Chatbot.jsx`:
```jsx
<h3 className="font-semibold">Mentra Chat Bot</h3>
<p className="text-xs opacity-90">Always here to help</p>
```

### Modifying Suggested Topics
Update the `suggestedTopics` array in the Chatbot component:
```javascript
const suggestedTopics = [
  { text: "I'm feeling stressed", emoji: "😰" },
  { text: "Help with sleep issues", emoji: "😴" },
  // Add more topics as needed
];
```

### Styling Customization
The chatbot uses Tailwind CSS classes. You can modify:
- Colors: Update gradient classes (`from-blue-500 to-purple-600`)
- Size: Change width/height classes (`w-96 h-[600px]`)
- Position: Modify positioning classes (`bottom-6 right-6`)

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your backend allows requests from your frontend domain
2. **401 Unauthorized**: Check if the token is properly stored in localStorage
3. **404 Not Found**: Verify the API endpoint URL in your backend
4. **Proxy Issues**: Make sure the target URL in vite.config.js matches your backend

### Debug Mode
The chatbot is set to open by default for easier testing. To change this:
```javascript
const [isOpen, setIsOpen] = useState(false); // Change to false for production
```

## Security Notes

- The chatbot includes a disclaimer about not being a replacement for professional therapy
- Token-based authentication is implemented
- Error handling prevents sensitive information leakage

## Next Steps

1. Test the integration with your backend
2. Customize the UI to match your brand
3. Add more suggested topics based on your mental health services
4. Consider adding user session management
5. Implement chat history persistence if needed
