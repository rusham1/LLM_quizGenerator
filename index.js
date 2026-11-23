import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";

//1/Initialize Gemini
const ai = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY 
});


//2/Make our first API call
async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: "On coding skills.",
    config:{
        temperature: 0.7,
        systemInstruction: "You are a helpful quiz generator. Generate a quiz with 3 questions and 4 options for each question. Provide the correct answer for each question.",
    }
  });
  //3/Display the response
  console.log(response.text);
}

await main();