import { Anthropic } from '@anthropic-ai/sdk';
import twilio from 'twilio';

const SYSTEM_PROMPT = `Eres un agente profesional de atención al cliente. Usa la base de conocimiento de Google Docs, registra clientes en Sheets y agenda citas en Calendar. Sé claro, cordial y proactivo.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { Body, From } = req.body;
  if (!Body || !From) {
    return res.status(400).json({ error: 'Faltan parámetros Body o From' });
  }
  try {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const completion = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: [
        { role: 'user', content: Body }
      ]
    });
    const aiResponse = completion.content?.[0]?.text || 'No se pudo generar respuesta.';
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    const whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER;
    await client.messages.create({
      from: `whatsapp:${whatsappNumber}`,
      to: From,
      body: aiResponse
    });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: 'Error en webhook WhatsApp' });
  }
}
