import "dotenv/config";
import readline from "readline/promises";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, tool, createAgent } from "langchain";
import { sendEmail } from "./mailer.service.js";
import * as z from "zod";

const messages = [];

const emailTool = tool(sendEmail, {
  name: "emailTool",
  description: "Use this tool to send an email.",
  schema: z.object({
    to: z.string().describe("The recipient's email address"),
    html: z.string().describe("The HTML content of the email"),
    subject: z.string().describe("The subject of the email"),
  }),
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// function askQuestion(question) {
//   return new Promise((resolve) => {
//     rl.question(question, (answer) => {
//       resolve(answer);
//     });
//   });
// }

// async function main() {
//   const name = await askQuestion("Enter your name: ");
//   console.log(`Hello, ${name}`);

//   rl.close();
// }

// main();

// rl.question("What is your name? ", (name) => {
//   console.log(`Hello, ${name}`);
//   rl.close();
// });

const model = new ChatMistralAI({
  model: "mistral-small-latest",
});

const agent = createAgent({
  model,
  tools: [emailTool],
});

while (true) {
  const userInput = await rl.question("You: ");
  messages.push(new HumanMessage(userInput));
  const response = await agent.invoke({
    messages: [{ role: "user", content: "What is my name?" }],
  });
  messages.push(response);
  console.log(response.messages[response.messages.length - 1].text);
}
// const response = await model.invoke("What is the capital of Bangladesh")

