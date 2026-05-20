/**
 * SinergIA Webhook Utility
 * Sends data from the Frontend to the n8n / Make.com backend safely.
 */

// Replace this with your actual n8n or Make.com production Webhook URL
const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://n8n.sinergia.business/webhook/lead-capture';

export interface WebhookPayload {
  source: 'roi_calculator' | 'sinergia_bot' | 'checkout' | 'affiliate_request';
  leadData: {
    name?: string;
    whatsapp?: string;
    email?: string;
    company?: string;
  };
  eventData: any;
  timestamp: string;
}

export const sendWebhookEvent = async (payload: Omit<WebhookPayload, 'timestamp'>) => {
  try {
    let affiliateId = undefined;
    if (typeof window !== 'undefined') {
      affiliateId = localStorage.getItem('sinergia_affiliate_id') || undefined;
    }

    const fullPayload: WebhookPayload & { affiliate_id?: string } = {
      ...payload,
      timestamp: new Date().toISOString(),
      ...(affiliateId ? { affiliate_id: affiliateId } : {})
    };

    // In a real environment, this goes to Next.js API Routes to hide the webhook URL
    // For now, we simulate the direct HTTP POST to n8n
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fullPayload),
    });

    if (!response.ok) {
      console.warn('Webhook received non-200 code:', response.status);
    }

    console.log('[SinergIA Telemetry] Dados enviados ao n8n:', fullPayload);
    return true;

  } catch (error) {
    console.error('[SinergIA Telemetry] Webhook Error:', error);
    return false;
  }
};
