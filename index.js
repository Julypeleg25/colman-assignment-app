import express from "express";
import connectToDatabase from "./mongo/dbConnection.js";
import commentsRoute from "./routes/comments_route.js";
import postsRoute from "./routes/posts_route.js";

const app = express();
const PORT = process.env.PORT || 3000;

await connectToDatabase().catch((error) => {
  console.error("Failed to connect to the database:", error);
  process.exit(1);
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/comments", commentsRoute);
app.use("/posts", postsRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
