import express from "express";
import connectToDatabase from "./mongoose/mongooseConnection.js";

const app = express();
const PORT = process.env.PORT || 3000;

await connectToDatabase().catch((error) => {
  console.error("Failed to connect to the database:", error);
  process.exit(1);
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("App initialized and running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
