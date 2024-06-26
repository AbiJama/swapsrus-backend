const express = require("express");
const cors = require('cors')
const app = express();
const { createUser, getUsers, getUserById, getUserByUid, deleteUserById } = require("./controllers/user");
const { User, Toy } = require("./models");
const { createToy, createToyByUserUid, getAllToys, deleteToyById, getToyById, getToyByUserUid } = require("./controllers/toy");

const admin = require("firebase-admin");

const serviceAccount = require("../firebase-admin-config.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(cors())
app.use(express.json());

app.post("/users", createUser);

app.get("/users", getUsers)

app.get("/users/:id", getUserById)

app.get("/users/uid/:uid", getUserByUid)

app.delete("/users/:id", deleteUserById)


app.post("/toys/user/:uid", createToy)

app.post("/toys/users/uid/:/uid", createToyByUserUid)

app.get("/toys", getAllToys)

app.get("/toys/:id", getToyById)

app.get("./toys/users/uid/:uid", getToyByUserUid)

app.delete("/toys/:id", deleteToyById)

module.exports = app;
