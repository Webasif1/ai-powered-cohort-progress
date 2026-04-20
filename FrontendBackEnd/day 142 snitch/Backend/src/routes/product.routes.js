import { Router } from "express";
import { authenticateSeller } from "../middleware/auth.middleware.js";
import {
  createProduct,
  getSellerProducts,
  getAllProducts,
  getSingleProduct,
} from "../controllers/product.controller.js";
import { productValidator } from "../validator/product.validator.js";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

const router = Router();

/**
 * @description Create product
 * @route POST /api/products
 * @access Private
 */
router.post(
  "/",
  authenticateSeller,
  upload.array("images", 5),
  productValidator,
  createProduct,
);
/**
 * @description Get all products
 * @route GET /api/products
 * @access Public
 */
router.get("/", getAllProducts);
/**
 * @description Get seller products
 * @route GET /api/products/seller
 * @access Private
 */
router.get("/seller", authenticateSeller, getSellerProducts);

/**
 * @description single product
 * @route GET /api/products/:id
 * @access Public
 */
router.get("/:id", getSingleProduct);

export default router;
