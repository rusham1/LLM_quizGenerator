import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";


//1/Initialize Gemini
export const ai = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY 
});

export const model = 'gemini-3.1-flash-lite';

export const systemInstruction = ``;