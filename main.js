import { ai, model, systemInstruction } from './assistant.js';

async function main() {
    const response = await ai.models.generateContent({
        model: model,
        contents: 'Explain why photosynthesis happens at night in exactly one sentence, including the second sentence',
        config: {
            systemInstruction: systemInstruction,

            // request JSON output
            responseMimeType: "application/json",

            // Define the expected JSON structure  
            responseSchema: {
                type: "object",
                properties: {
                    questions: {
                        type: "string",
                    },
                    answers: {
                        type: "string",
                    },
                },
                required: ["questions", "answers"],
            },
        },
    });

    //parse gemini response and display the questions and answers
    const result = JSON.parse(response.text);
    console.log("Questions:", result.questions);
    console.log("Answers:", result.answers);

}

main();