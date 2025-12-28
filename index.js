const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ⚠️ NEVER hardcode keys in production
const OPENROUTER_KEY = "apisk-or-v1-e95039ae23443c2b65e38997485f295bd94ab5564c019112b73a7398b19f5927"; // replace with real key or env var

app.post("/chatProxy", async (req, res) => {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          // ✅ FIXED: Authorization must be a STRING
          "Authorization": `Bearer ${OPENROUTER_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: req.body.messages,
          max_tokens: req.body.max_tokens ?? 120,
        }),
      }
    );

    const data = await response.json();

    // ✅ IMPORTANT: return OpenRouter response directly
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      choices: [
        {
          message: {
            content: "I’m here with you 🌿.",
          },
        },
      ],
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);