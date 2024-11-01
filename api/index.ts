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
        const result = await model.generateContent(req.body.prompt);
        res.status(200).json({ response: result.response.candidates[0].content.parts[0].text });
    } catch (error) {
        console.error("Error generating content:", error);
    }
})

app.listen(3002, () => console.log("Server ready on port 3002."));

module.exports = app;