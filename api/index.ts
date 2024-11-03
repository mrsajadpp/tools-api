require("dotenv").config();
const express = require("express");
const app = express();
const bp = require('body-parser');
const cors = require("cors");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY); // Replace with your actual API key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors({
    origin: "*", // Allow any origin
    methods: ["GET", "POST"], // Allow specific HTTP methods
    allowedHeaders: ["Content-Type"] // Allow specific headers
}));

app.get("/", (req, res) => res.send("Hello world"));

app.post("/api/pargraph/summery", async (req, res) => {
    try {
        if (!req.body.content) return res.status(400).json({ error: "Invalid Request", message: "Content is required for summarization." });
        const result = await model.generateContent(`Summarize the following text in a concise paragraph:\n\n${req.body.content}`);
        if (!result || !result.response || !result.response.candidates || !result.response.candidates[0]) return res.status(500).json({ error: "Processing Error", message: "Failed to generate summary. Please try again later." });

        res.status(200).json({ response: result.response.candidates[0].content.parts[0].text });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "An error occurred while processing your request. Please try again later."
        });
    }
});

app.post("/api/paragraph/generate", async (req, res) => {
    try {
        if (!req.body.content) return res.status(400).json({ error: "Invalid Request", message: "Content is required for paragraph generation" });
        const result = await model.generateContent(`Generate a well-constructed paragraph based on the following text:\n\n${req.body.content}`);
        if (!result || !result.response || !result.response.candidates || !result.response.candidates[0]) return res.status(500).json({ error: "Processing Error", message: "Failed to generate a paragraph. Please try again later." });

        res.status(200).json({ response: result.response.candidates[0].content.parts[0].text });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "An error occurred while processing your request. Please try again later."
        });
    }
});

app.post("/api/title/generate", async (req, res) => {
    try {
        if (!req.body.content) return res.status(400).json({ error: "Invalid Request", message: "Content is required for  title generation." });
        const result = await model.generateContent(`Generate one catchy and relevant title based on the following content:\n\n${req.body.content}`);
        if (!result || !result.response || !result.response.candidates || !result.response.candidates[0]) return res.status(500).json({ error: "Processing Error", message: "Failed to generate a title. Please try again later." });

        res.status(200).json({ response: result.response.candidates[0].content.parts[0].text });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "An error occurred while processing your request. Please try again later."
        });
    }
});

app.get("*", (req, res) => res.status(404).json({
    error: "Not Found",
    message: "The requested API route does not exist."
}));

app.post("*", (req, res) => res.status(404).json({
    error: "Not Found",
    message: "The requested API route does not exist."
}));

app.listen(3004, () => console.log("Server ready on port 3002."));

module.exports = app;