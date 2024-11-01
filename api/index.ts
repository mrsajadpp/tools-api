require("dotenv").config();
const express = require("express");
const app = express();
const bp = require('body-parser');

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY); // Replace with your actual API key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.get("/", (req, res) => res.send("Express on Vercel"));

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

app.listen(3002, () => console.log("Server ready on port 3002."));

module.exports = app;