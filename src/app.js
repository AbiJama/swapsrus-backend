const express = require("express");
const cors = require('cors')
const app = express();
const { createUser, getUsers, getUserById, getUserByUid, deleteUserById } = require("./controllers/user");
const { User, Toy } = require("./models");
const { createToy, getAllToys, deleteToyById, getToyById } = require("./controllers/toy");

app.use(cors())
app.use(express.json());

app.post("/users", createUser);

app.get("/users", getUsers)

app.get("/users/:id", getUserById)

app.get("/users/uid/:uid", getUserByUid)

app.delete("/users/:id", deleteUserById)


app.post("/toys", createToy)

app.get("/toys", getAllToys)

app.get("/toys/:id", getToyById)

app.delete("/toys/:id", deleteToyById)

module.exports = app;
