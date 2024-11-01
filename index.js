const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY); // Replace with your actual API key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = `Summarize the following text in a concise paragraph:\n\nYes, you can use Google Gemini if you have access to its API. The Gemini API offers a variety of AI-driven functionalities, including text and multimodal generation (text-and-image). Setting up involves acquiring API keys from Google AI Studio, which will then allow you to interact with the models using Node.js or other platforms of your choice.

A popular configuration for developers on Node.js is to clone an existing setup repository for Gemini (such as 
GITHUB
ps://github.com/samson-shukla/google-gemini-ai)), which guides through installing dependencies, configuring environment variables (like GEMINI_API_KEY), and establishing endpoints for requests. Once set up, you'll be able to submit prompts or images to Gemini to generate responses based on your input model type.

This could be an efficient way to integrate Gemini’s capabilities into your projects!`;

(async () => {
  try {
    const result = await model.generateContent(prompt);
    console.log(result.response.candidates[0].content.parts[0].text); // Assuming `response` has a text property
  } catch (error) {
    console.error("Error generating content:", error);
  }
})();
