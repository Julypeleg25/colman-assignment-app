import commentsModel from "../models/comment_model.js";

const getCommentById = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await commentsModel.findById(commentId);

    if (!comment) {
      return res
        .status(404)
        .json({ message: `Comment with id '${commentId}' was not found` });
    }

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await commentsModel.find();

    if (!comments) {
      return res
        .status(404)
        .json({ message: "No comments were found to retrieve" });
    }

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createComment = async (req, res) => {
  try {
    const { postId, content, sender } = req.body;
    const newComment = new commentsModel({ postId, content, sender });
    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const updatedData = req.body;
    const updatedComment = await commentsModel.findByIdAndUpdate(
      commentId,
      updatedData,
      { new: true }
    );

    if (!updatedComment)
      return res.status(404).json({
        message: `No comment with id '${commentId}' was found to update`,
      });

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const deletedComment = await commentsModel.findByIdAndDelete(commentId);

    if (!deletedComment)
      return res.status(404).json({
        message: `No comment with id '${commentId}' was found to delete`,
      });

    res.status(201).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllCommentsByPostId = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await commentsModel.find({ postId });

    if (!comments || comments.length === 0) {
      return res.status(404).json({
        message: `No comments found for post with id '${postId}'`,
      });
    }

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export {
  getCommentById,
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
  getAllCommentsByPostId
};
