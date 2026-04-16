import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

export const validateRegister = [
  body("email").isEmail().withMessage("Invalid email formate"),
  body("contact")
    .notEmpty()
    .withMessage("Contact is required")
    .isMobilePhone("bn-BD")
    .withMessage("Invalid phone number"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at list 6 character long"),
  body("fullName").notEmpty().withMessage("Full name is required"),
  body("role").optional().isIn(["buyer", "seller"]).withMessage("Invalid role"),

  validateRequest,
];
