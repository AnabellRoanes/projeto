import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateReply(userText, context = []) {
  try {
    const messages = [
      { role: 'system', content: 'Você é um assistente útil e conciso.' },
      ...context.reverse().map(m => ({
        role: m.fromMe ? 'assistant' : 'user',
        content: m.body
      })),
      { role: 'user', content: userText }
    ];

    const resp = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.4,
      max_tokens: 200
    });

    return resp.choices[0].message.content?.trim() || 'Ok!';
  } catch (err) {
    console.error('Erro ao gerar resposta:', err.message);
    // Fallback quando estourar cota
    return `Resposta simulada (fallback): "${userText}"`;
  }
}

