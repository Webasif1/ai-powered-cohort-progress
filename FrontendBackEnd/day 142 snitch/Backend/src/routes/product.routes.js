import { Router } from "express";
import { authenticateSeller } from "../middleware/auth.middleware.js";
import { createProductController } from "../controllers/product.controller.js";
import { productValidator } from "../validator/product.validator.js";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

const router = Router();

router.post(
  "/",
  authenticateSeller,
  productValidator,
  upload.array("images", 5),
  createProductController,
);

export default router;
