import OpenAI from 'openai';

export const CHAT_MODEL = 'gpt-4o';

let cachedClient: OpenAI | null = null;

export const getOpenAIClient = (): OpenAI => {
  if (cachedClient) {
    return cachedClient;
  }
  const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('EXPO_PUBLIC_OPENAI_API_KEY is not set.');
  }
  cachedClient = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
  return cachedClient;
};
