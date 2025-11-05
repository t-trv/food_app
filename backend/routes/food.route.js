import express from "express";
import {
  getFood,
  getFoodBySlug,
  getFoods,
  createFood,
  deleteFood,
  updateFood,
  getFoodsByCategory,
  getFoodsBySideCategory,
} from "../controllers/food.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

router.get("/:id", getFood);
router.get("/slug/:slug", getFoodBySlug);
router.get("/", getFoods);
router.post("/", verifyToken, isAdmin, createFood);
router.delete("/:id", verifyToken, isAdmin, deleteFood);
router.put("/:id", verifyToken, isAdmin, updateFood);

router.get("/by-category/:category_id", getFoodsByCategory);
router.get("/by-side-category/:side_category_id", getFoodsBySideCategory);

export default router;
