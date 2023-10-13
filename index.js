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

const userQuery = "·         Produkt: product_csin 4F9B41080E0C12 -   Wie heißt die Marke?-   Wie teuer ist das Produkt?-   Passen 5 Leute gleichzeitig drauf?-   Wird mir der Esszimmertisch bis hoch in die Wohnung geliefert?";

function getCsinFromString(string) {
  const regex = /product_csin\s([A-Z0-9]+)/;
  const match = string.match(regex);
  
  if (match && match[1]) {
    const csin = match[1];
    console.log(csin); // Here is the extracted csin
      return csin;
  } else {
    console.log('csin not found in the text');
  }


}

function getProductByCsin(csin) {
  console.log(csin);
  const product = data.filter((element) => element.product_csin == csin);
  console.log(product)
  return product
}

const chatCompletion = await openai.chat.completions.create({
  messages: [
    {role: "system", content: roleInformation},
    {role: "user", content: "Hier sind einige Infos über das Produkt: " + JSON.stringify(getProductByCsin(getCsinFromString(userQuery)))},
    {role: "user", content: "Bitte beantworte mir folgende Fragen zum Produkt: " + userQuery}
],
  model: "gpt-3.5-turbo-16k",
});

console.log(chatCompletion.choices[0].message.content);

function readJSONFile(filename) {
  let result = JSON.parse(fs.readFileSync(filename, 'utf-8'));
  return result;
}