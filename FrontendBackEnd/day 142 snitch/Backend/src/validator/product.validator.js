import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

export const productValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("priceAmount").isNumeric().withMessage("Price is required"),
  body("priceCurrency").notEmpty().withMessage("Price is required"),
  body("image").notEmpty().withMessage("Image is required"),
  validateRequest,
];
