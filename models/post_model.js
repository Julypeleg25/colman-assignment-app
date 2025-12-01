const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
  sender: {
    type: String,
    required: true,
    
  },
});

const Posts = mongoose.model("Posts", postsSchema);

export default Posts;
