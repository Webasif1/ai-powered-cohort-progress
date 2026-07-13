import type { Request, Response } from "express";
import { getMcpClient } from "../services/mcp.srvice.ts"

export const testMcpTestController = async(req:Request, res:Response) =>{
  const client = await getMcpClient();

  const tools = await client.listTools();

  return res.json({
    success:true,
    tools
  })
}
