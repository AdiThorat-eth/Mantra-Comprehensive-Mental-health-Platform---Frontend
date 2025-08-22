# 🤖 Chatbot AI Integration Fix Guide

## 🔍 Issues Found in Your ChatbotService

### 1. **API Key Configuration Issue**
```java
if ("YOUR_GEMINI_API_KEY_HERE".equals(geminiApiKey)) {
    return "I understand you're looking for support...";
}
```
**Problem**: This check prevents the AI from ever being called.

### 2. **Response Parsing Issue**
```java
// Parse the response (simplified - you might want to use a JSON library)
// For now, return a meaningful response
return "Thank you for sharing that with me...";
```
**Problem**: The actual Gemini response is never parsed or used.

### 3. **Error Handling**
The method always falls back to default responses instead of actually calling the API.

## 🛠️ Fixes Needed

### Step 1: Update API Key Check
```java
private String getAIResponse(String message) {
    try {
        // Remove this check or make it more specific
        if (geminiApiKey == null || geminiApiKey.isEmpty() || "YOUR_GEMINI_API_KEY_HERE".equals(geminiApiKey)) {
            return "I understand you're looking for support. While I'm still learning to provide personalized AI responses, I'm here to help you. Based on your message, I'd recommend exploring our meditation resources or connecting with one of our professional therapists. You can also try asking me about specific topics like stress, anxiety, or sleep issues for more targeted guidance.";
        }

        // Actual Gemini API integration
        return callGeminiAPI(message);

    } catch (Exception e) {
        return "I'm here to support you through whatever you're experiencing. While I'm having trouble accessing my advanced responses right now, I can still help you. Would you like me to suggest some meditation resources, or would you prefer information about booking a session with one of our professional therapists?";
    }
}
```

### Step 2: Fix Response Parsing
```java
private String callGeminiAPI(String userMessage) {
    try {
        WebClient webClient = webClientBuilder.build();

        // Construct the request body for Gemini API
        Map<String, Object> requestBody = new HashMap<>();
        Map<String, Object> contents = new HashMap<>();
        Map<String, Object> parts = new HashMap<>();

        String prompt = "You are a compassionate mental health support chatbot named Mantra. " +
                "Respond helpfully and empathetically to the user's message. " +
                "Keep responses supportive, professional, and under 150 words. " +
                "If appropriate, suggest meditation, therapy, or community support. " +
                "User message: " + userMessage;

        parts.put("text", prompt);
        contents.put("parts", new Object[]{parts});
        requestBody.put("contents", new Object[]{contents});

        // Make the API call
        String response = webClient.post()
                .uri(geminiApiUrl + "?key=" + geminiApiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // Parse the actual Gemini response
        return parseGeminiResponse(response);

    } catch (Exception e) {
        return "I appreciate you reaching out to me. While I'm having some technical difficulties right now, " +
                "I want you to know that your feelings are valid and support is available. " +
                "Please consider exploring our meditation resources or booking a session with one of our professional therapists. " +
                "You deserve care and support.";
    }
}

private String parseGeminiResponse(String response) {
    try {
        // Use Jackson or Gson to parse the JSON response
        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.readTree(response);
        
        // Extract the text from Gemini response
        JsonNode candidates = rootNode.get("candidates");
        if (candidates != null && candidates.isArray() && candidates.size() > 0) {
            JsonNode content = candidates.get(0).get("content");
            if (content != null) {
                JsonNode parts = content.get("parts");
                if (parts != null && parts.isArray() && parts.size() > 0) {
                    return parts.get(0).get("text").asText();
                }
            }
        }
        
        // Fallback if parsing fails
        return "Thank you for sharing that with me. It takes courage to reach out for support. " +
                "Based on what you've told me, I'd recommend taking some time for self-care and mindfulness. " +
                "Our meditation library has some great resources that might help, and if you'd like to talk to someone professionally, " +
                "our therapists are here to support you. Remember, you're not alone in this journey.";
                
    } catch (Exception e) {
        return "Thank you for sharing that with me. It takes courage to reach out for support. " +
                "Based on what you've told me, I'd recommend taking some time for self-care and mindfulness. " +
                "Our meditation library has some great resources that might help, and if you'd like to talk to someone professionally, " +
                "our therapists are here to support you. Remember, you're not alone in this journey.";
    }
}
```

## 🔧 Required Dependencies

Add to your `pom.xml`:
```xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
</dependency>
```

## 📝 Configuration

Make sure your `application.properties` or `application.yml` has:
```properties
gemini.api.key=your_actual_gemini_api_key_here
gemini.api.url=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
```

## 🚀 Testing Steps

1. **Set your actual Gemini API key** in the configuration
2. **Test with a message** that doesn't match rule-based responses (like "hi" or "hello")
3. **Check the logs** for any API call errors
4. **Verify** you get actual AI-generated responses

## 🎯 Expected Results

After fixing:
- ✅ Rule-based responses still work for keywords
- ✅ AI responses work for non-keyword messages
- ✅ Proper error handling for API failures
- ✅ Actual Gemini API integration


