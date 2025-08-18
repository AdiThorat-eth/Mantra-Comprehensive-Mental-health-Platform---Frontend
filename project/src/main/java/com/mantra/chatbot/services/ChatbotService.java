package com.mantra.chatbot.services;

import com.mantra.auth.entities.User;
import com.mantra.chatbot.dto.ChatRequest;
import com.mantra.chatbot.dto.ChatResponse;
import com.mantra.chatbot.entities.ChatMessage;
import com.mantra.chatbot.repositories.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ChatbotService {

    private final ChatMessageRepository chatMessageRepository;
    private final WebClient.Builder webClientBuilder;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    private final Map<String, String> ruleBased = Map.of(
            "stressed", "It's okay to feel stressed. Try deep breathing for 5 minutes. Inhale for 4 counts, hold for 4, and exhale for 4.",
            "sleep", "Avoid screens before bedtime and try a relaxation meditation. Consider establishing a bedtime routine.",
            "anxiety", "When feeling anxious, ground yourself by naming 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.",
            "depressed", "Remember that seeking help is a sign of strength. Consider talking to a therapist or counselor. You're not alone.",
            "meditation", "Meditation can help reduce stress and improve mental clarity. Start with just 5 minutes a day.",
            "help", "I'm here to support you. You can talk to me about stress, anxiety, sleep issues, or book a session with one of our therapists."
    );

    public ChatResponse processMessage(ChatRequest request) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        String response = getRuleBased(request.getMessage().toLowerCase());
        String responseType = "RULE_BASED";

        if (response == null) {
            response = getAIResponse(request.getMessage());
            responseType = "AI_GENERATED";
        }

        // Save conversation history
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setUser(currentUser);
        chatMessage.setUserMessage(request.getMessage());
        chatMessage.setBotResponse(response);
        chatMessage.setResponseType(responseType);
        chatMessageRepository.save(chatMessage);

        return new ChatResponse(response, responseType);
    }

    private String getRuleBased(String message) {
        for (Map.Entry<String, String> entry : ruleBased.entrySet()) {
            if (message.contains(entry.getKey())) {
                return entry.getValue();
            }
        }
        return null;
    }

    private String getAIResponse(String message) {
        try {
            // Note: This is a simplified implementation
            // In production, you would integrate with the actual Gemini API
            if ("YOUR_GEMINI_API_KEY_HERE".equals(geminiApiKey)) {
                return "I understand you're looking for support. While I'm still learning to provide AI responses, I'm here to help. Would you like me to connect you with one of our meditation resources or therapists?";
            }

            WebClient webClient = webClientBuilder.build();
            
            Map<String, Object> requestBody = new HashMap<>();
            Map<String, Object> contents = new HashMap<>();
            Map<String, Object> parts = new HashMap<>();
            parts.put("text", "You are a mental health support chatbot. Respond compassionately and helpfully to: " + message);
            contents.put("parts", new Object[]{parts});
            requestBody.put("contents", new Object[]{contents});

            // This would be the actual API call to Gemini
            // For demo purposes, returning a default response
            return "Thank you for sharing with me. It's important to acknowledge your feelings. Based on what you've told me, I recommend taking some time for self-care. Would you like some meditation suggestions or information about our therapy services?";
            
        } catch (Exception e) {
            return "I'm here to support you. Let me know if you'd like to explore our meditation resources or book a session with one of our therapists.";
        }
    }
}