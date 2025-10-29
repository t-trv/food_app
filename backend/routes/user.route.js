import express from "express";
import {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.get("/", verifyToken, getUsers);
router.delete("/:id", verifyToken, deleteUser);
router.put("/:id", verifyToken, updateUser);

export default router;
