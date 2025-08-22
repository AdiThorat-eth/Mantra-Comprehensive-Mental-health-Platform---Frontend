# 🔐 Authentication Fix Guide

## Current Issue: 401 Unauthorized Error

Your chatbot is getting a **401 Unauthorized** error because the authentication token isn't being sent properly to your backend.

## ✅ What I've Fixed

1. **Created Authentication Context** - Proper token management
2. **Updated Login Form** - Real authentication instead of demo
3. **Enhanced Debug Tools** - Better error tracking
4. **Added Test Token Feature** - For quick testing

## 🚀 Quick Fix Steps

### Step 1: Test Your Backend Authentication

First, check if your backend accepts the token format you're sending:

```bash
# Test with a simple token
curl -X POST http://localhost:8080/api/chatbot/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test-token-123" \
  -d '{"message": "hello"}'
```

### Step 2: Use the Debug Tools

1. **Click "Set Test Token"** in the Connection Test panel
2. **Click "Test with Auth"** to see if it works
3. **Check the console** for detailed logs

### Step 3: Configure Your Backend

Your backend needs to:

1. **Accept the token format**: `Bearer <token>`
2. **Validate the token** properly
3. **Return proper responses**

## 🔧 Backend Configuration Examples

### Python Flask Example:
```python
from flask import Flask, request, jsonify
from functools import wraps

app = Flask(__name__)

def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({"error": "No authorization header"}), 401
        
        try:
            token = auth_header.split(" ")[1]  # Remove "Bearer "
            # Add your token validation logic here
            if token == "test-token-123":  # Replace with real validation
                return f(*args, **kwargs)
            else:
                return jsonify({"error": "Invalid token"}), 401
        except:
            return jsonify({"error": "Invalid token format"}), 401
    
    return decorated

@app.route('/api/chatbot/message', methods=['POST'])
@require_auth
def chat_message():
    data = request.get_json()
    message = data.get('message', '')
    
    # Your chatbot logic here
    response = f"You said: {message}"
    
    return jsonify({
        "response": response,
        "responseType": "RULE_BASED"
    })

if __name__ == '__main__':
    app.run(port=8080, debug=True)
```

### Node.js Express Example:
```javascript
const express = require('express');
const app = express();

app.use(express.json());

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: "No authorization header" });
  }
  
  try {
    const token = authHeader.split(" ")[1]; // Remove "Bearer "
    
    // Add your token validation logic here
    if (token === "test-token-123") { // Replace with real validation
      next();
    } else {
      return res.status(401).json({ error: "Invalid token" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Invalid token format" });
  }
};

app.post('/api/chatbot/message', requireAuth, (req, res) => {
  const { message } = req.body;
  
  // Your chatbot logic here
  const response = `You said: ${message}`;
  
  res.json({
    response: response,
    responseType: "RULE_BASED"
  });
});

app.listen(8080, () => {
  console.log('Server running on port 8080');
});
```

## 🧪 Testing Steps

1. **Start your backend** on port 8080
2. **Refresh your frontend** (`npm run dev`)
3. **Click "Set Test Token"** in the debug panel
4. **Try sending a message** in the chatbot
5. **Check the console** for detailed logs

## 🔍 Debug Information

The enhanced debugging now shows:
- ✅ Authentication status
- ✅ Token presence
- ✅ User information
- ✅ Detailed API call logs
- ✅ Specific error messages

## 🎯 Expected Behavior

After fixing:
1. **Login form** should actually authenticate
2. **Token should be stored** in localStorage
3. **Chatbot should work** without 401 errors
4. **Connection test** should show "Authenticated: Yes"

## 🚨 Common Issues

### Issue 1: Backend Not Accepting Token Format
**Solution**: Ensure your backend expects `Authorization: Bearer <token>`

### Issue 2: Token Validation Logic
**Solution**: Implement proper token validation in your backend

### Issue 3: CORS Issues
**Solution**: Add CORS headers to allow requests from your frontend

### Issue 4: Wrong Endpoint
**Solution**: Verify your backend has `/api/chatbot/message` endpoint

## 📞 Next Steps

1. **Test with the debug tools** first
2. **Configure your backend** to accept the token format
3. **Implement proper authentication** in your login system
4. **Remove debug components** once everything works

Let me know what you see in the debug panel and console logs!
