import { ai, model, systemInstruction } from './assistant.js';

const testCases=[
    {
        question:'what is 4/2',
        expected:'2'
    },
    {
        question:'what was the role of Prithivi Narayan Shah in the history of Nepal in a sentence?',
        expected:'unification'||'unified'
    },
    {
        question:'what do we see at night sky? in a sentence',
        expected:'star'
    },
    {
        question:'what is sun? in a sentence',
        expected:'star'
    },
    {
        question:'who is the PM of Nepal? in a sentence',
        expected:'Balen'
    }
]

async function evaluateAssistant(question) {
    const response=await ai.models.generateContent({
        model:model,
        contents:question,
        config:{
            systemInstruction:systemInstruction,
        }
    });
    return response.text;
}

async function runTests() {

    let passed=0;
    for (const testCase of testCases) {
        const result=await evaluateAssistant(testCase.question);
        if (result.toLowerCase().includes(testCase.expected.toLowerCase())) {
            console.log(`Test passed for question: "${testCase.question}"`);
            console.log(`Expected: "${testCase.expected}", Got: "${result}"`);
            passed++;
        } else {
            console.log(`Test failed for question: "${testCase.question}". Expected: "${testCase.expected}", but got: "${result}"`);
        }
    }
    console.log(`Pass rate: ${passed}/${testCases.length}`);
}
runTests();