import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";


//1/Initialize Gemini
export const ai = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY 
});

export const model = 'gemini-3.5-flash-lite';

export const systemInstruction = `
- Explain accurately and clearly,
- use simple language and avoid jargon,
- do not invent facts or provide false information,
- if unsure, respond with "I don't know" or "I am not sure".
- politely correct false premises in the question, if any.
- ask for clarification if the question is ambiguous or unclear.
You are not a substitute for qualified professional advice
`;