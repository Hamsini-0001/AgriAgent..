import { ChatMessage, AgentActionLog } from '../../types';
import { GroqService } from '../api/groq';

export interface AgentProcessResult {
  message: ChatMessage;
  actionLogs: AgentActionLog[];
  isLocked?: boolean;
}

export class AgentEngine {
  /**
   * Process a farmer prompt via backend Groq AI
   */
  public static async processPrompt(
    prompt: string,
    contextCropId: string = 'crop_1',
    selectedModel: string = 'qwen/qwen3.8-27b'
  ): Promise<AgentProcessResult> {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    try {
      const groqRes = await GroqService.generateAgentResponse(prompt, contextCropId, selectedModel);
      
      return {
        message: {
          id: 'msg_' + Date.now(),
          sender: 'agent',
          text: `⚡ **${groqRes.model.toUpperCase()} (Live Groq AI)**\n\n${groqRes.replyText}`,
          timestamp,
          toolsUsed: groqRes.toolsUsed,
          recommendationData: {
            crop: 'Tomato',
            recommendedPrice: '₹27–₹28/kg',
            bestBuyer: 'FreshMart Foods Pvt Ltd',
            netRevenue: 20530,
            confidence: 96,
            actionType: 'compare'
          }
        },
        actionLogs: groqRes.actionLogs
      };
    } catch (err: any) {
      if (err.message === 'BACKEND_KEY_REQUIRED') {
        const lockedText = `🔒 **AI Market Agent Inactive — Backend Groq API Key Required**\n\n` +
          `In this production system, AI reasoning runs securely on the backend server and strictly requires a configured Groq API key to operate.\n\n` +
          `**How to activate:**\n` +
          `1. Open the project's root **\`.env\`** file.\n` +
          `2. Add your Groq API key:\n` +
          `   \`\`\`bash\n   GROQ_API_KEY=gsk_your_groq_api_key_here\n   \`\`\`\n` +
          `3. Save the file. The backend will instantly recognize the key.\n\n` +
          `*(Need an API key? You can generate a free, high-speed key at [Groq Console](https://console.groq.com/keys).)*\n\n` +
          `Once your backend key is configured, the agent will activate ultra-fast market price analysis, buyer offer economics, and autonomous price negotiation.`;

        return {
          message: {
            id: 'msg_locked_' + Date.now(),
            sender: 'agent',
            text: lockedText,
            timestamp
          },
          actionLogs: [
            {
              id: 'log_err_' + Date.now(),
              timestamp,
              toolName: 'backend_auth_check',
              input: { status: 'unauthorized' },
              output: { error: 'GROQ_API_KEY_MISSING' },
              reasoning: 'AI model locked: Backend GROQ_API_KEY environment variable is not configured in .env file.'
            }
          ],
          isLocked: true
        };
      }

      // Other backend error
      return {
        message: {
          id: 'msg_err_' + Date.now(),
          sender: 'agent',
          text: `⚠️ **AI Service Error:**\n\n${err.message || 'Unable to connect to backend AI server. Please verify your GROQ_API_KEY in the backend .env file.'}`,
          timestamp
        },
        actionLogs: []
      };
    }
  }

  /**
   * Text-to-Speech synthesis
   */
  public static speakText(text: string) {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanText = text
        .replace(/[#*•_`]/g, '')
        .replace(/₹/g, 'Rupees ')
        .replace(/kg/g, 'kilo');

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }

  public static stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}
