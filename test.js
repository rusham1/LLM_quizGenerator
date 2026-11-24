import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";
import fs from 'fs';

const ai= new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const imagePath='./images/random.jpg';
const imageData=fs.readFileSync(imagePath).toString('base64');

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

async function main() {
    const response=await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: prompt,//we cannot add image with the text prompt:`Describe the image: ${imageData}` 
                        // because the image data is too long and will exceed the maximum prompt length.
                        // So we need to use inlineData to send the image data separately.
    });
    console.log(response.text);
}
main();