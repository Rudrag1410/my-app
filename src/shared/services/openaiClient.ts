import OpenAI from 'openai';

const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('EXPO_PUBLIC_OPENAI_API_KEY is not set.');
}

export const openaiClient = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true,
});
export const CHAT_MODEL = 'gpt-4o';
