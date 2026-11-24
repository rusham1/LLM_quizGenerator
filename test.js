import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";
import fs from 'fs';

const ai= new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const imagePath='./images/random.jpg';
const imageData=fs.readFileSync(imagePath).toString('base64');
// Image and text are sent as separate parts of the same prompt.
// Embedding base64 in a text string would make the model read it as plain
// characters, not as an image, so we use inlineData with a mimeType instead.
// Each part can hold only one type of data (text OR inlineData).
const prompt = [
    {
        inlineData: {
            mimeType: 'image/jpeg',
            data: imageData
        }
    },
    {
        text: 'Describe the image:'
    }
];

const follow_up_prompt = ["what color is it?"];

async function main() {
    const history = []; //the whole conversation history, starts empty
    history.push({ role: 'user', parts: prompt });

    const response=await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: history,
    });
    console.log(response.text);

    history.push({ role: 'model', parts: [{ text: response.text }] });

    for (const follow_up of follow_up_prompt) {
        history.push({ role: 'user', parts: [{ text: follow_up }] });
        const response2=await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: history,
    });
    console.log(response2.text);
    history.push({ role: 'model', parts: [{ text: response2.text }] });
    }
   }
main();