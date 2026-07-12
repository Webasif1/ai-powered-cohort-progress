import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

let client: Client;

export const getMcpClient = () => {
  const transport = new StdioClientTransport({
    command: "npx",
    args: ["tsx", "../mcp_server/src/index.ts"],
  });

  client = new Client({
    name: "tiny-cats-clients",
    version: "1.0.0",
  });
};
