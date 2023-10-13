import OpenAI from "openai";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const openai = new OpenAI({
  apiKey: "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",
});

const roleInformation = "Du bist ein ChatBot, der Informationen zu Produkten im Möbelsortiment von Check24 ausgeben soll. Dir werden Informationen zu den einzelnen Produkten geschickt, die dir beim beantworten der Fragen helfen.";

const data = readJSONFile(path.resolve(__dirname, "./dataset-shopping.json"));

console.log("First data element: ", data[0]);

function getProductByCsin(csin) {
  const product = data.filter((element) => element.product_csin == csin);
  console.log(product)
  return product
}

const chatCompletion = await openai.chat.completions.create({
  messages: [
    {role: "system", content: roleInformation},
    {role: "user", content: "Hier sind einige Infos über das Produkt: " + JSON.stringify(getProductByCsin("4E0878B5768A79"))},
    {role: "user", content: "Bitte "}
],
  model: "gpt-3.5-turbo-16k",
});

console.log(chatCompletion.choices[0].message.content);

function readJSONFile(filename) {
  let result = JSON.parse(fs.readFileSync(filename, 'utf-8'));
  return result;
}