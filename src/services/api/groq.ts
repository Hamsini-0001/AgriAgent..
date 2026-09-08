import { StorageService } from '../storage';
import { AgentTools } from '../ai/tools';
import { AgentActionLog } from '../../types';

export interface BackendAiStatus {
  configured: boolean;
  provider?: string;
  activeModel: string;
  availableModels: Array<{
    id: string;
    name: string;
    tagline: string;
    latencyMs: number;
    reasoningScore: string;
    mandiAccuracy: string;
    costPerMillionTokens: string;
    recommendedFor: string;
  }>;
}

export class GroqService {
  /**
   * Check if backend has GROQ_API_KEY configured
   */
  public static async checkBackendStatus(): Promise<BackendAiStatus> {
    try {
      const res = await fetch('/api/ai/status');
      if (!res.ok) {
        return { configured: false, activeModel: 'qwen/qwen3.8-27b', availableModels: [] };
      }
      return await res.json();
    } catch {
      return { configured: false, activeModel: 'qwen/qwen3.8-27b', availableModels: [] };
    }
  }

  /**
   * Send prompt to backend Groq AI service with live marketplace context
   */
  public static async generateAgentResponse(
    prompt: string,
    cropListingId: string = 'crop_1',
    selectedModel: string = 'qwen/qwen3.8-27b'
  ): Promise<{
    replyText: string;
    model: string;
    toolsUsed: string[];
    actionLogs: AgentActionLog[];
  }> {
    const crops = StorageService.getCrops();
    const activeCrop = crops.find(c => c.id === cropListingId) || crops[0];
    const comparison = AgentTools.compare_offers(activeCrop.id);
    const marketPrices = StorageService.getMarketPrices().slice(0, 5);
    const vehicles = StorageService.getVehicles();

    const groundedContext = `
FARMER PROFILE & LISTING:
- Farmer: Ravi Kumar (Shamshabad, Hyderabad)
- Crop: ${activeCrop.quantity} ${activeCrop.unit} ${activeCrop.crop} (${activeCrop.variety})
- Grade: ${activeCrop.grade}
- Floor Minimum: ₹${activeCrop.minPrice}/kg
- Target Price: ₹${activeCrop.expectedPrice}/kg

APMC MANDI RATES:
- Local Mandi Modal Rate: ₹26/kg (+₹2 today, High demand)
- Regional Mandis: ${marketPrices.map(p => `${p.marketName}: ₹${p.currentPrice}/kg`).join(', ')}

MATCHED BUYER OFFERS:
${comparison.offers.map((o, i) => `
Buyer ${i + 1}: ${o.offer.companyName}
- Price: ₹${o.offer.offeredPrice}/kg
- Distance: ${o.offer.distanceKm} km (Transport: ₹${o.offer.estimatedTransportCost})
- Trust Score: ${o.offer.buyerReliability}%
- Net Take-Home: ₹${o.netProfit.netRevenue.toLocaleString('en-IN')} (₹${o.netProfit.effectiveRatePerKg}/kg)
`).join('\n')}

TRANSPORT FLEET:
${vehicles.map(v => `${v.type} (${v.capacityKg} kg, Driver: ${v.driverName})`).join(', ')}
`;

    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        context: groundedContext,
        model: selectedModel
      })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      if (data.error === 'API_KEY_NOT_CONFIGURED') {
        throw new Error('BACKEND_KEY_REQUIRED');
      }
      throw new Error(data.message || 'AI backend request failed');
    }

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const actionLogs: AgentActionLog[] = [
      {
        id: 'log_' + Date.now(),
        timestamp,
        toolName: 'groq_inference',
        input: { model: selectedModel, prompt },
        output: { status: 'success', tokens: data.usage?.total_tokens },
        reasoning: `Groq ${selectedModel} queried with live APMC mandi prices, buyer offers, and freight economics.`
      }
    ];

    return {
      replyText: data.replyText,
      model: data.model || selectedModel,
      toolsUsed: ['groq_api', 'compare_offers', 'calculate_net_profit'],
      actionLogs
    };
  }
}

export const GeminiService = GroqService;
