# Mambo AI Integration Guide

## Overview
This guide explains how to integrate AI APIs with your Mambo AI chat interface.

## Available AI Services

### 1. OpenAI (Recommended)
- **API**: GPT-3.5-turbo or GPT-4
- **Cost**: Pay-per-use
- **Setup**: Get API key from [OpenAI](https://platform.openai.com/)

```typescript
// In utils/aiService.ts
const openaiService = new OpenAIService('your-api-key-here');
```

### 2. Google Gemini
- **API**: Gemini Pro
- **Cost**: Free tier available
- **Setup**: Get API key from [Google AI Studio](https://makersuite.google.com/)

```typescript
// In utils/aiService.ts
const geminiService = new GeminiService('your-api-key-here');
```

### 3. Anthropic Claude
- **API**: Claude 3 Haiku
- **Cost**: Pay-per-use
- **Setup**: Get API key from [Anthropic](https://console.anthropic.com/)

```typescript
// In utils/aiService.ts
const claudeService = new ClaudeService('your-api-key-here');
```

### 4. Local AI (Fallback)
- **No API key required**
- **Rule-based responses**
- **Always works offline**

## Setup Instructions

### Step 1: Choose Your AI Service
Edit `utils/aiService.ts` and update the configuration:

```typescript
export const AI_CONFIG = {
  OPENAI_API_KEY: 'your-openai-api-key-here',
  GEMINI_API_KEY: 'your-gemini-api-key-here', 
  CLAUDE_API_KEY: 'your-claude-api-key-here',
  
  // Change this to your preferred service
  DEFAULT_SERVICE: 'openai', // 'openai', 'gemini', 'claude', or 'local'
};
```

### Step 2: Get API Key
1. **OpenAI**: Sign up at [OpenAI Platform](https://platform.openai.com/)
2. **Gemini**: Get free API key at [Google AI Studio](https://makersuite.google.com/)
3. **Claude**: Sign up at [Anthropic Console](https://console.anthropic.com/)

### Step 3: Add API Key
Replace `'your-api-key-here'` with your actual API key.

### Step 4: Test the Integration
1. Run your app: `npx expo start`
2. Navigate to Mambo AI tab
3. Send a message to test the AI response

## Security Best Practices

### For Production:
1. **Never commit API keys to git**
2. **Use environment variables**:
   ```bash
   # Create .env file
   OPENAI_API_KEY=your-actual-key-here
   ```

3. **Add to .gitignore**:
   ```
   .env
   .env.local
   ```

4. **Use secure storage** for mobile apps:
   ```typescript
   import * as SecureStore from 'expo-secure-store';
   
   // Store API key securely
   await SecureStore.setItemAsync('openai_key', apiKey);
   
   // Retrieve API key
   const apiKey = await SecureStore.getItemAsync('openai_key');
   ```

## Customizing AI Responses

### Modify System Prompt
Edit the system message in each AI service:

```typescript
// Example for OpenAI
{
  role: 'system',
  content: 'You are Mambo, a personal safety assistant specialized in emergency services for the Philippines. Help users with police, fire, medical, and rescue services. Be helpful, concise, and culturally appropriate.'
}
```

### Add Context Awareness
Include conversation history for better responses:

```typescript
// Pass conversation history to AI
const aiResponse = await aiService.sendMessage(
  userMessage.text, 
  conversationHistory
);
```

## Cost Management

### OpenAI Pricing (as of 2024):
- **GPT-3.5-turbo**: $0.002 per 1K tokens
- **GPT-4**: $0.03 per 1K tokens

### Gemini Pricing:
- **Free tier**: 60 requests per minute
- **Paid**: $0.0005 per 1K characters

### Cost Optimization:
1. **Limit message length** (max 500 characters in UI)
2. **Use GPT-3.5-turbo** instead of GPT-4 for lower costs
3. **Implement rate limiting** to prevent abuse
4. **Cache common responses** for frequently asked questions

## Troubleshooting

### Common Issues:
1. **API Key Invalid**: Check if key is correctly set
2. **Rate Limit Exceeded**: Implement retry logic with exponential backoff
3. **Network Error**: Check internet connection
4. **Response Too Long**: Adjust max_tokens parameter

### Debug Mode:
Add logging to see what's happening:

```typescript
console.log('Sending message to AI:', message);
console.log('AI Response:', response);
```

## Advanced Features

### Voice Input Integration:
```typescript
import * as Speech from 'expo-speech';

const handleVoiceInput = async () => {
  const { status } = await Speech.requestPermissionsAsync();
  if (status === 'granted') {
    // Implement voice-to-text
  }
};
```

### Message Persistence:
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Save messages
await AsyncStorage.setItem('chat_history', JSON.stringify(messages));

// Load messages
const savedMessages = await AsyncStorage.getItem('chat_history');
```

### Real-time Emergency Integration:
```typescript
// Connect to emergency services
const handleEmergencyCall = async (message: string) => {
  if (message.toLowerCase().includes('emergency')) {
    // Auto-dial emergency number
    Linking.openURL('tel:911');
  }
};
```

## Support
For issues with AI integration, check:
1. API documentation for your chosen service
2. Network connectivity
3. API key validity
4. Rate limits and quotas

Happy coding! 🚀

