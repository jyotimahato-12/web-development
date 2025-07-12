
//✅ ChatGPT Keyword Extraction Route
/*app.post("/api/chat", async (req, res) => {
  const userInput = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful shopping assistant. Extract the main product keyword from user input and reply in JSON:
{"reply": "...", "query": "..."}`,
        },
        { role: "user", content: userInput },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    const rawText = completion.choices[0].message.content;
    console.log("🧠 GPT raw:", rawText);


    try {
      const parsed = JSON.parse(rawText);
      res.json(parsed);
    } catch (jsonErr) {
      console.error("JSON parse error from GPT:", rawText);
      res.status(500).json({ error: "Invalid response format from GPT" });
    }
  } catch (err) {
    console.error("OpenAI error:", err.message);
    res.status(500).json({ error: "GPT processing failed" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});*/









/*const express=require("express");
const { get } = require("axios");
const cors= require("cors");
const { Configuration, OpenAIApi }= require("openai");

c

    const rawText = completion.data.choices[0].message.content;

    try {
      const parsed = JSON.parse(rawText);
      res.json(parsed); // send { reply: "...", query: "..." } to frontend
    } catch (jsonErr) {
      console.error("JSON parse error from GPT */
  

















      const express =require("express");
      const { get } =require("axios");
      const cors =require("cors");
      
      const app = express();
      const PORT = 5000;
      app.use(cors()); // Allow all origins temporarily for testing

      
        
      
      
      app.get("/api/products", async (req, res) => {
        const keyword = req.query.q || "";
      
        try {
          const response = await get(`https://dummyjson.com/products/search?q=${encodeURIComponent(keyword)}`);
      
      
          res.json(response.data.products);
        } catch (error) {
          console.error("API fetch error:", error.message);
          res.status(500).json({ error: "Failed to fetch products" });
        }
      });
      
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
      
      
      
      
  
      
