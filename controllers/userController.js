//import knex from "../models/knex.js"; // Assuming knex instance is exported from models

import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

export const createUser = async (req, res) => {
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
};

export const getUsers = async (req, res) => {
  try {
    const users = await knex("users").select("*");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
