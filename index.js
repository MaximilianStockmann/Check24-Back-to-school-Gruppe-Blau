import fetch from "node-fetch";
import OpenAI from "openai";

function sendRequest(url, payload) {
  const apiKey = process.env.API_KEY;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify(payload)
  })  
}

/* fetch("https://www.google.de", {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  },
}).then((response) => {
  console.log(response);
}) */

const openai = new OpenAI({
  apiKey: "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",
});

const chatCompletion = await openai.chat.completions.create({
  messages: [{ role: "user", content: "Say this is a test" }],
  model: "gpt-3.5-turbo",
});

console.log(chatCompletion.choices[0].message.content);