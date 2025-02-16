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

// Routes
app.get("/", (req, res) => {
  res.send("Express is running...");
});

// USERS ROUTES
app.post("/users", async (req, res) => {
  try {
    const { name, email, password, preferences } = req.body;
    const [user] = await knex("users").insert(
      {
        id: knex.raw("UUID()"),
        name,
        email,
        password,
        preferences: JSON.stringify(preferences),
      },
      ["id", "name", "email"]
    );
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await knex("users").select("*");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PROGRESS ROUTES
app.post("/progress", async (req, res) => {
  try {
    const { user_id, exercise_id, date, weight, reps, sets, prs } = req.body;
    const [progress] = await knex("progress").insert(
      {
        id: knex.raw("UUID()"),
        user_id,
        exercise_id,
        date,
        weight,
        reps,
        sets,
        prs,
      },
      ["id", "user_id", "exercise_id", "date"]
    );
    res.status(201).json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/progress/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const progress = await knex("progress").where({ user_id }).select("*");
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(CORS_ORIGIN);
});
