import express from "express";
import {
  getMainCategories,
  getSideCategories,
  getAllCategories,
  createMainCategory,
  deleteMainCategory,
  createSideCategory,
  deleteSideCategory,
  updateSideCategory,
} from "../controllers/category.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

router.get("/main", getMainCategories);
router.get("/side", getSideCategories);
router.get("/all", getAllCategories);
router.post("/main", verifyToken, isAdmin, createMainCategory);
router.delete("/main", verifyToken, isAdmin, deleteMainCategory);
router.post("/side", verifyToken, isAdmin, createSideCategory);
router.delete("/side", verifyToken, isAdmin, deleteSideCategory);
router.put("/side/:oldId", verifyToken, isAdmin, updateSideCategory);

export default router;
