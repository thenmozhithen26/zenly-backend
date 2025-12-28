// index.js — Zenly Backend (FIXED)

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;

console.log("OPENROUTER KEY PRESENT:", !!OPENROUTER_KEY);

app.post("/chatProxy", async (req, res) => {
  if (!OPENROUTER_KEY) {
    return res.status(500).json({
      error: "OpenRouter API key missing in backend",
    });
  }

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://srimathimoon.github.io",
          "X-Title": "Zenly App",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: req.body.messages,
          max_tokens: req.body.max_tokens ?? 120,
        }),
      }
    );

    const data = await response.json();
    return res.json(data);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      choices: [
        {
          message: { content: "I’m here with you 🌿." },
        },
      ],
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅ Zenly backend running on port ${PORT}`)
);










