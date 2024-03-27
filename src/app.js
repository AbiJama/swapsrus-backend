const express = require("express");
const app = express();
const { createUser, getUsers, getUserById, deleteUserById } = require("./controllers/user");
const { User, Toy } = require("./models");

app.use(express.json());

app.post("/users", createUser);

app.get("/users", getUsers)

app.get("/users/:id", getUserById)

app.delete("/users/:id", deleteUserById)

module.exports = app;
