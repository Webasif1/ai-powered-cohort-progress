import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage } from "langchain";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

export async function generateResponse(message) {
  const response = await geminiModel.invoke([new HumanMessage(message)]);

  return response.text;
}

export async function generateChatTitle(message) {
  const response = await mistralModel.invoke([
    new SystemMessage(`You are helpful assistant that generate concise and descriptive title for chat conversation

      User will provide you with the first message of a chat conversation, and you will generate a title that capture the essence of the of the conversation in 2-4 word. The title should be clear, relevant and engaging, giving us a quick understand of the chat's topic.
      `),

    new HumanMessage(
      `Generate a title for a chat conversation base on the following first message : "${message}"`,
    ),
  ]);

  return response.text;
}
