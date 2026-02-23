'use server';

import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are a friendly, helpful AI assistant for a freelance full-stack developer's portfolio.
Your goal is to generate a short, conversational CTA (max 60 characters) that encourages visitors to book a call or contact the developer.
Keep it casual, friendly, and not salesy. Examples: "Want to build something cool?", "Let's chat about your project!", "Got questions? I'm here to help!"

Respond with ONLY the CTA message, no explanation.`;

export async function generateAmbientMessage(
  section: string,
  context: string
): Promise<string> {
  if (!process.env.GROQ_API_KEY) {
    console.warn('GROQ_API_KEY not configured');
    return getFallbackMessage(section);
  }

  const userPrompt = `Generate a CTA for a visitor viewing the ${section} section of this portfolio.
Context: ${context}

Remember: max 60 characters, conversational, friendly.`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.8,
      max_tokens: 100,
    });

    const message = completion.choices[0]?.message?.content?.trim() || '';
    return message.length > 60 ? message.slice(0, 57) + '...' : message;
  } catch (error) {
    console.error('Groq API error:', error);
    return getFallbackMessage(section);
  }
}

function getFallbackMessage(section: string): string {
  const fallbacks: Record<string, string> = {
    services: 'Need help with any of these?',
    about: "Want to know if I'm the right fit?",
    experience: "Impressed? Let's discuss your project",
    projects: 'Want something similar for your business?',
    booking: "Ready to start? Let's talk!",
  };
  return fallbacks[section] || "Let's chat about your project!";
}
