import express from "express";
import {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/user.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.get("/", verifyToken, isAdmin, getUsers);
router.delete("/:id", verifyToken, isAdmin, deleteUser);
router.put("/:id", verifyToken, isAdmin, updateUser);

export default router;
