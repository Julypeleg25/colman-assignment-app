import {
  createComment,
  deleteComment,
  getAllComments,
  getCommentById,
  updateComment,
  getAllCommentsByPostId
} from "../controllers/comments_controller.js";
import express from "express";

const router = express.Router();

router.get("/:id", getCommentById);
router.delete("/:id", deleteComment);
router.get("/", getAllComments);
router.post("/", createComment);
router.put("/:id", updateComment);
router.get("/post/:postId", getAllCommentsByPostId);

export default router;
