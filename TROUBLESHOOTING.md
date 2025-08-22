# Chatbot Connection Troubleshooting Guide

## Current Issue: Connection Error
You're seeing: "I'm sorry, I'm having trouble connecting right now. Please try again or contact our support team."

## Quick Fixes to Try

### 1. **Check Your Backend Server**
Make sure your backend is running on port 8000:
```bash
# Check if your backend is running
curl http://localhost:8080/api/health
# or
curl http://localhost:8080/api/chatbot/message
```

### 2. **Verify Backend URL Configuration**
Your current configuration:
- **API Config**: `http://localhost:8080` ✅
- **Vite Proxy**: `http://localhost:8080` ✅

### 3. **Test Connection Using the Debug Tool**
I've added a connection test component to your app. Look for the "Connection Test" box in the top-left corner of your browser. Use it to:
- Test connection with authentication
- Test connection without authentication
- See detailed error messages

### 4. **Check Browser Console**
Open Developer Tools (F12) and check the Console tab for detailed error messages.

## Common Issues and Solutions

### Issue 1: Backend Not Running
**Symptoms**: "Failed to fetch" error
**Solution**: Start your backend server on port 8000

### Issue 2: Wrong Backend URL
**Symptoms**: Connection timeout
**Solution**: Update the URL in `src/config/api.js`:
```javascript
BASE_URL: 'http://localhost:YOUR_PORT'
```

### Issue 3: CORS Issues
**Symptoms**: CORS error in console
**Solution**: Add CORS headers to your backend:
```python
# Python Flask example
from flask_cors import CORS
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])
```

### Issue 4: Authentication Issues
**Symptoms**: 401 Unauthorized error
**Solution**: 
1. Check if token exists in localStorage
2. Verify token format in backend
3. Test without authentication first

### Issue 5: Wrong API Endpoint
**Symptoms**: 404 Not Found error
**Solution**: Verify your backend has the endpoint `/api/chatbot/message`

## Backend API Requirements

Your backend should have this endpoint:

```python
# Python Flask example
@app.route('/api/chatbot/message', methods=['POST'])
def chat_message():
    data = request.get_json()
    message = data.get('message')
    
    # Your chatbot logic here
    response = "This is a test response"
    
    return jsonify({
        "response": response,
        "responseType": "RULE_BASED"
    })
```

## Testing Steps

1. **Start your backend server** on port 8000
2. **Start your frontend**: `npm run dev`
3. **Open browser console** (F12)
4. **Use the Connection Test** component
5. **Try sending a message** in the chatbot
6. **Check console logs** for detailed error information

## Debug Information

The chatbot now includes enhanced debugging:
- Console logs for all API calls
- Detailed error messages
- Connection test component
- Better error handling

## Quick Test Commands

Test your backend directly:
```bash
# Test basic connectivity
curl -X POST http://localhost:8080/api/chatbot/message \
  -H "Content-Type: application/json" \
  -d '{"message": "hello"}'

# Test with auth (if required)
curl -X POST http://localhost:8080/api/chatbot/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"message": "hello"}'
```

## Next Steps

1. **Check if your backend is running** on the correct port
2. **Use the Connection Test component** to diagnose issues
3. **Check browser console** for detailed error messages
4. **Verify your backend API endpoint** matches `/api/chatbot/message`
5. **Test with and without authentication**

## Remove Debug Components

Once everything is working, remove the debug components:
1. Delete `src/components/ConnectionTest.jsx`
2. Remove the import and component from `App.jsx`
3. Remove console.log statements from `Chatbot.jsx`

Let me know what error messages you see in the console or connection test!
