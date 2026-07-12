import express from "express";
import { testMcpTestController } from "../controllers/test-mcp.controller.ts";

const router = express.Router();

router.get("/test-mcp", testMcpTestController)

export default router;
