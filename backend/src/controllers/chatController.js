import OpenAI from 'openai';

const SYSTEM_PROMPT = `You are a compassionate and empathetic AI therapist assistant 
for InnerHue, an emotional wellness platform. Your role is to:
- Listen actively and validate the user's emotions
- Provide thoughtful, supportive responses
- Ask gentle follow-up questions to help users explore their feelings
- Suggest healthy coping strategies when appropriate
- Never diagnose or replace professional mental health care
- Keep responses concise (2-4 sentences) and warm in tone
- Always prioritize the user's emotional safety`;

export async function handleChat(req, res, next) {
  try {
    const { messages, emotion } = req.validatedBody;

    // Check if OpenAI is configured before initializing client
    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({
        error: 'AI service is not configured. Please set OPENAI_API_KEY.',
      });
    }

    // Initialize client only when a real API key is present
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `${SYSTEM_PROMPT}\n\nThe user is currently feeling: ${emotion}.`,
        },
        ...messages,
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content?.trim();

    if (!reply) {
      return res.status(500).json({ error: 'No response from AI service.' });
    }

    return res.status(200).json({ reply });
  } catch (error) {
    if (error?.status === 401) {
      return res.status(503).json({ error: 'Invalid OpenAI API key.' });
    }
    if (error?.status === 429) {
      return res.status(429).json({ error: 'AI service rate limit exceeded.' });
    }
    next(error);
  }
}