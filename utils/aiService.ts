// AI Service for Mambo AI Chat
// Now includes GitHub Models integration (hardcoded token)

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
              content: 'You are Mambo, a personal safety assistant. Help users with emergency services, safety guidance, and connecting them with local authorities.'
            },
            ...conversationHistory,
            { role: 'user', content: message }
          ],
          max_tokens: 150,
          temperature: 0.7,
        }),
      });

      if (!response.ok) throw new Error(`OpenAI API error: ${response.status}`);

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `You are Mambo, a safety assistant. User: ${message}` }] }]
        }),
      });

      if (!response.ok) throw new Error(`Gemini API error: ${response.status}`);

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not process your request.';
    } catch (error) {
      console.error('Gemini API Error:', error);
      return 'Connection issue. Please try again later.';
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
          messages: [{ role: 'user', content: `You are Mambo, a safety assistant. User: ${message}` }],
        }),
      });

      if (!response.ok) throw new Error(`Claude API error: ${response.status}`);

      const data = await response.json();
      return data.content?.[0]?.text || 'Sorry, I could not process your request.';
    } catch (error) {
      console.error('Claude API Error:', error);
      return 'Connection issue. Please try again later.';
    }
  }
}

// Example 4: GitHub Models AI Integration
export class GitHubAIService {
  private apiKey: string;
  private baseUrl = 'https://models.inference.ai.azure.com/chat/completions';

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
          model: 'gpt-4o-mini', // free GitHub AI model
          messages: [
            {
              role: 'system',
              content: 'You are Mambo, a personal safety assistant for emergencies and safety guidance.'
            },
            ...conversationHistory,
            { role: 'user', content: message }
          ],
          max_tokens: 150,
          temperature: 0.7,
        }),
      });

      if (!response.ok) throw new Error(`GitHub Models API error: ${response.status}`);

      const data = await response.json();
      return data.choices?.[0]?.message?.content || 'Sorry, I could not process your request.';
    } catch (error) {
      console.error('GitHub Models API Error:', error);
      return 'Connection issue. Please try again later.';
    }
  }
}

// Example 5: Local/Offline AI Integration
export class LocalAIService {
  private responses = {
    emergency: [
      "Please contact your local emergency hotline immediately.",
      "This sounds urgent. Call 911 or your local emergency number.",
      "Emergency detected. Let me connect you to the right service."
    ],
    default: [
      "I'm your safety assistant Mambo. How can I help you today?",
      "Need help with an emergency, safety tips, or local services?",
      "Mambo here ΓÇö your safety is my priority. WhatΓÇÖs happening?"
    ]
  };

  async sendMessage(message: string): Promise<string> {
    const lower = message.toLowerCase();
    if (lower.includes('help') || lower.includes('emergency')) {
      return this.getRandomResponse('emergency');
    }
    return this.getRandomResponse('default');
  }

  private getRandomResponse(category: keyof typeof this.responses): string {
    const list = this.responses[category];
    return list[Math.floor(Math.random() * list.length)];
  }
}

// CONFIGURATION
export const AI_CONFIG = {
  OPENAI_API_KEY: '', // put if you use OpenAI
  GEMINI_API_KEY: '', // put if you use Gemini
  CLAUDE_API_KEY: '', // put if you use Claude
  GITHUB_MODELS_TOKEN: '', // your GitHub AI token here
  DEFAULT_SERVICE: 'github', // change to 'local', 'openai', 'gemini', etc.
};

// FACTORY FUNCTION
export function createAIService() {
  switch (AI_CONFIG.DEFAULT_SERVICE) {
    case 'openai':
      return new OpenAIService(AI_CONFIG.OPENAI_API_KEY);
    case 'gemini':
      return new GeminiService(AI_CONFIG.GEMINI_API_KEY);
    case 'claude':
      return new ClaudeService(AI_CONFIG.CLAUDE_API_KEY);
    case 'github':
      return new GitHubAIService(AI_CONFIG.GITHUB_MODELS_TOKEN);
    case 'local':
    default:
      return new LocalAIService();
  }
}