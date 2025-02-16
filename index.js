import express from "express";
import cors from "cors";
import "dotenv/config";

import knex from "knex"; // Your database connection

const app = express();

const { PORT, CORS_ORIGIN } = process.env;

app.use(express.json());
app.use(cors({ CORS_ORIGIN }));

// ✅ Serve static images from the "public/images" folder
app.use("/images", express.static("public/images"));

// Other routes
app.get("/", (req, res) => {
  res.send("Express is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(CORS_ORIGIN);
});
