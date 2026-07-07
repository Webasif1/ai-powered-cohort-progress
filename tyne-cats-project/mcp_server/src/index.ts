import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { recommendCatsTool } from "./tools/recommendCat.tool.ts";


// Create server instance
const server = new McpServer({
  name: "tiny_cats",
  version: "1.0.0",
});


server.registerTool("recommend_cats", {
  title:"recommend_cats",
  description: "Recommend a best cat according to inputs",
  inputSchema:{
    kidsFriendly: z.boolean(),
    apartmentFriendly: z.boolean()
  }
},async ({kidsFriendly,apartmentFriendly})=>{
  const result = await recommendCatsTool(kidsFriendly,apartmentFriendly);

  return {
    content:[
      {
        type: "text",
        text: JSON.stringify(result)
      }
    ]
  }
})

const transporter = new StdioServerTransport();

await server.connect(transporter);


console.error("mcp server is running...")
