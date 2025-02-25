// api/gemini.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config(); // Important: Keep this for your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY);

module.exports = async (req, res) => {  // Vercel Function handler
    if (req.method === 'POST') { // Only handle POST requests
        try {
            // console.log(req.body.history);
            // console.log(req.body.message);
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const chat = model.startChat({ history: req.body.history || [] }); // Handle empty history
            const msg = req.body.message;

            const result = await chat.sendMessage(msg);
            const response = await result.response;
            const text = await response.text(); // Make sure to await the promise

            res.send(text); // Send the text response

        } catch (error) {
            console.error("Gemini API Error:", error);
            res.status(500).json({ error: "Error communicating with Gemini API" });
        }
    } else {
        res.status(405).end(); // Method Not Allowed for other requests
    }
};