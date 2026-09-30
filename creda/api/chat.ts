// Vercel serverless function: proxies chat to Gemini so the API key stays on the server.
// Env vars (Vercel): GEMINI_API_KEY, optional GEMINI_MODEL, VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const key = process.env.GEMINI_API_KEY;
  if (!key) return res.status(503).json({ error: 'AI assistant is not configured.' });

  // Only signed-in users may call this endpoint
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  const sbUrl = process.env.VITE_SUPABASE_URL;
  const sbKey = process.env.VITE_SUPABASE_ANON_KEY;
  if (!token || !sbUrl || !sbKey) return res.status(401).json({ error: 'Unauthorized' });
  const who = await fetch(`${sbUrl}/auth/v1/user`, { headers: { Authorization: `Bearer ${token}`, apikey: sbKey } });
  if (!who.ok) return res.status(401).json({ error: 'Unauthorized' });

  const { messages = [], context = '' } = req.body || {};
  const system =
    'You are Creda AI, a financial assistant for small businesses in Ghana. Amounts are in Ghana cedis (GH¢). ' +
    'Answer using ONLY the business data provided below. If the data is missing or insufficient, say so plainly and ' +
    'suggest what to record. Do not invent numbers. You are not a licensed financial adviser.\n\nBUSINESS DATA:\n' + context;

  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: messages.slice(-12).map((m: any) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: String(m.text).slice(0, 4000) }],
        })),
      }),
    }
  );
  if (!r.ok) return res.status(502).json({ error: 'The AI service is unavailable right now.' });
  const data = await r.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join('') || '';
  return res.status(200).json({ text });
}
