import express from "express";
import {
  getVariants,
  createVariant,
  deleteVariant,
} from "../controllers/variant.controllers.js";
import verifyToken from "../middlewares/verifyToken.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

router.get("/", getVariants);
router.post("/", verifyToken, isAdmin, createVariant);
router.delete("/:id", verifyToken, isAdmin, deleteVariant);

export default router;
