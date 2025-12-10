import postsModel from "../models/post_model.js";

const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await postsModel.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ message: `Post with id '${postId}' was not found` });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await postsModel.find();

    if (!posts) {
      return res
        .status(404)
        .json({ message: "No posts were found to retrieve" });
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { postId, content, sender, title } = req.body;
    const newPost = new postsModel({ postId, content, sender, title });
    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedData = req.body;
    if(Object.hasOwn(updatedData, 'sender')) {
      return res.status(400).json({ message: "Updating 'sender' field is not allowed" });
    }
    const updatedPost = await postsModel.findByIdAndUpdate(
      postId,
      updatedData,
      { new: true }
    );

    if (!updatedPost)
      return res.status(404).json({
        message: `No post with id '${postId}' was found to update`,
      });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await postsModel.findByIdAndDelete(postId);

    if (!deletedPost)
      return res.status(404).json({
        message: `No post with id '${postId}' was found to delete`,
      });

    res.status(201).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllPostsBySenderId = async (req, res) => {
  try {
    const senderId = req.params.sender;
    const posts = await postsModel.find({ senderId });

    if (!posts || posts.length === 0) {
      return res.status(404).json({
        message: `No posts found for sender with id '${senderId}'`,
      });
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export {
  getPostById,
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  getAllPostsBySenderId
};
