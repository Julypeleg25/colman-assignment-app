import { get } from "mongoose";
import {
  createComment,
  deleteComment,
  getAllComments,
  getCommentById,
  updateComment,
} from "../controllers/comments_controller.js";
import express from "express";

const router = express.Router();

router.get("/:id", getCommentById);
router.delete("/:id", deleteComment);
router.get("/", getAllComments);
router.post("/", createComment);
router.put("/:id", updateComment);

export default router;
