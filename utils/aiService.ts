// AI Service for Mambo AI Chat
// This file contains examples of how to integrate different AI APIs

// Example 1: OpenAI API Integration
export class OpenAIService {
  private apiKey: string;
  private baseUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async sendMessage(message: string, conversationHistory: any[] = []): Promise<string> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are Mambo, a personal safety assistant. Help users with emergency services, safety guidance, and connecting them with local authorities. Be helpful, concise, and professional.'
            },
            ...conversationHistory,
            {
              role: 'user',
              content: message
            }
          ],
          max_tokens: 150,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'Sorry, I could not process your request.';
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return 'I apologize, but I\'m having trouble connecting right now. Please try again later.';
    }
  }
}

// Example 2: Google Gemini API Integration
export class GeminiService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are Mambo, a personal safety assistant. Help users with emergency services and safety guidance. User message: ${message}`
            }]
          }]
        }),
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not process your request.';
    } catch (error) {
      console.error('Gemini API Error:', error);
      return 'I apologize, but I\'m having trouble connecting right now. Please try again later.';
    }
  }
}

// Example 3: Anthropic Claude API Integration
export class ClaudeService {
  private apiKey: string;
  private baseUrl = 'https://api.anthropic.com/v1/messages';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 150,
          messages: [{
            role: 'user',
            content: `You are Mambo, a personal safety assistant. Help users with emergency services and safety guidance. User message: ${message}`
          }]
        }),
      });

      if (!response.ok) {
        throw new Error(`Claude API error: ${response.status}`);
      }

      const data = await response.json();
      return data.content?.[0]?.text || 'Sorry, I could not process your request.';
    } catch (error) {
      console.error('Claude API Error:', error);
      return 'I apologize, but I\'m having trouble connecting right now. Please try again later.';
    }
  }
}

// Example 4: Local/Offline AI Integration (using a simple rule-based system)
export class LocalAIService {
  private responses = {
    emergency: [
      "I understand this is an emergency. Please call the local emergency number immediately.",
      "For immediate help, contact emergency services at 911 or your local emergency number.",
      "This sounds urgent. Let me help you connect with the right emergency service."
    ],
    police: [
      "I can help you find local police stations and contact information.",
      "For police assistance, I recommend contacting your local police department.",
      "Let me help you locate the nearest police station."
    ],
    fire: [
      "For fire emergencies, call the fire department immediately.",
      "I can help you find local fire stations and emergency contacts.",
      "Fire safety is important. Let me provide you with the right resources."
    ],
    medical: [
      "For medical emergencies, please call emergency medical services right away.",
      "I can help you find local hospitals and medical facilities.",
      "Your health is important. Let me connect you with medical resources."
    ],
    default: [
      "I'm here to help with emergency services and safety guidance. How can I assist you?",
      "I can provide information about local emergency services and safety tips.",
      "As your safety assistant, I'm ready to help with any emergency-related questions."
    ]
  };

  async sendMessage(message: string): Promise<string> {
    const lowerMessage = message.toLowerCase();
    
    // Simple keyword matching
    if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || lowerMessage.includes('help')) {
      return this.getRandomResponse('emergency');
    } else if (lowerMessage.includes('police') || lowerMessage.includes('crime') || lowerMessage.includes('theft')) {
      return this.getRandomResponse('police');
    } else if (lowerMessage.includes('fire') || lowerMessage.includes('smoke') || lowerMessage.includes('burn')) {
      return this.getRandomResponse('fire');
    } else if (lowerMessage.includes('medical') || lowerMessage.includes('hospital') || lowerMessage.includes('doctor')) {
      return this.getRandomResponse('medical');
    } else {
      return this.getRandomResponse('default');
    }
  }

  private getRandomResponse(category: keyof typeof this.responses): string {
    const categoryResponses = this.responses[category];
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
  }
}

// Configuration helper
export const AI_CONFIG = {
  // Add your API keys here (store securely in environment variables in production)
  OPENAI_API_KEY: 'your-openai-api-key-here',
  GEMINI_API_KEY: 'your-gemini-api-key-here',
  CLAUDE_API_KEY: 'your-claude-api-key-here',
  
  // Choose which AI service to use
  DEFAULT_SERVICE: 'local', // 'openai', 'gemini', 'claude', or 'local'
};

// Factory function to create AI service instance
export function createAIService() {
  switch (AI_CONFIG.DEFAULT_SERVICE) {
    case 'openai':
      return new OpenAIService(AI_CONFIG.OPENAI_API_KEY);
    case 'gemini':
      return new GeminiService(AI_CONFIG.GEMINI_API_KEY);
    case 'claude':
      return new ClaudeService(AI_CONFIG.CLAUDE_API_KEY);
    case 'local':
    default:
      return new LocalAIService();
  }
}
