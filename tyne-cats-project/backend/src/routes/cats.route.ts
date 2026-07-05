import express from "express";
import {
  createCatController,
  getAllCatsController,
  getSingleCatController,
  recommendCatsController,
  searchCatsController,
} from "../controllers/cat.controller.ts";

const router = express.Router();

router.post("/create", createCatController);
router.get("/search/all", searchCatsController);
router.get("/", getAllCatsController);
router.get("/:id", getSingleCatController);
router.post("/recommend", recommendCatsController)

export default router;
