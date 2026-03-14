import "dotenv/config";
import readline from "readline/promises";
import { ChatMistralAI } from "@langchain/mistralai";
import {HumanMessage} from "langchain"

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

const message = []

const model = new ChatMistralAI({
  model: "mistral-small-latest",
});
while (true) {
  const userInput = await rl.question("You: ");
  message.push(new HumanMessage(userInput))
  const response = await model.invoke(message);
  message.push(response)
  console.log(response.text);
}
// const response = await model.invoke("What is the capital of Bangladesh")

console.log(response.text);
