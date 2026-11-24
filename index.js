import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";

//1/Initialize Gemini
const ai = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY 
});

const numberofQ=3;
const noOfOp=4;
const topicForQuiz= "coding skills";
const resSchema = {
            type: "object",
            properties: {
                questions: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            question: { type: "string" },
                            options: { type: "array", items: { type: "string" } },
                            correct_Answer: { type: "string" },
                            difficulty: { type: "string", enum: ["easy", "medium", "hard"] }
                        },
                        required: ["question", "options", "correct_Answer","difficulty"]
                    }
                }
            },
            required: ["questions"]
        }
const configuration = {
        // outputFormat: "json", //text or json
        responseMimeType: "application/json", //text/plain or application/json
        temperature: 2.0, //float between 0.0 and 2.0, higher values means more creative responses
        systemInstruction: `You are a helpful quiz generator. Generate a quiz with ${numberofQ} questions and ${noOfOp} options for each question. Provide the correct answer for each question.`,
        responseSchema: resSchema,
    }


//2/Make our first API call
async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: `On ${topicForQuiz}.`,
    config: configuration
  });
  //3/Display the response
  const quiz=JSON.parse(response.text);;
  quiz.questions.forEach((q, index) => {
    console.log(`Question ${index + 1}: ${q.question}`);
    q.options.forEach((option, optionIndex) => {
      console.log(`  Option ${optionIndex + 1}: ${option}`);
    });
    console.log(`  Correct Answer: ${q.correct_Answer}`);
    console.log(`  Difficulty: ${q.difficulty}`);
    console.log(''); // Add a blank line for better readability
  });
  console.log(response.text);
}

await main();