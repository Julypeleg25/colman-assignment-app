const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Posts",
  },
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
});

const Comments = mongoose.model("Comments", commentsSchema);

module.exports = Comments;
