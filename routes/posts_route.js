import {
createPost,
getPostById,
deletePost,
getAllPosts,
updatePost,
getAllPostsBySenderId
} from "../controllers/posts_controller.js";
import express from "express";

const router = express.Router();

router.get("/:id", getPostById);
router.delete("/:id", deletePost);
router.get("/", getAllPosts);
router.post("/", createPost);
router.put("/:id", updatePost);

export default router;