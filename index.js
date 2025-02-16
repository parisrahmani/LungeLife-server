import express from "express";
import cors from "cors";
import "dotenv/config";

import userRoutes from "./routes/userRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import exerciseRoutes from "./routes/exerciseRoutes.js";

// import knex from "knex"; // Your database connection

const app = express();

const { PORT, CORS_ORIGIN } = process.env;

app.use(express.json());
app.use(cors({ origin: CORS_ORIGIN }));

// Routes
app.get("/", (req, res) => {
  res.send("Express is running...");
});
app.use("/api/users", userRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/images", express.static("public/images"));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(CORS_ORIGIN);
});
