import { tavily } from "@tavily/core";

const tvly = tavily({
  apiKey: process.env.TAVILY_API_KEY,
});

export async function fetchInformation({ question }) {
  const details = await tvly.search(question);
  console.log("Tavily search result:");
  console.log(JSON.stringify(details, null, 2));

  return details.results.map((r) => r.content).join("\n");
}
