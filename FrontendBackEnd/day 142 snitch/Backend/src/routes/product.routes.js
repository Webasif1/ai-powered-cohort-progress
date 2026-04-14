import { Router } from "express";
import { authenticateSeller } from "../middleware/auth.middleware.js";
import { createProductController } from "../controllers/product.controller.js";

const router = Router();

router.post("/", authenticateSeller, createProductController);

export default router;
