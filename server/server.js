

var MongoClient = require("mongodb").MongoClient;
var express = require("express");
var cors = require("cors");
var connectionString = "mongodb://127.0.0.1:27017";
var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/users", async (req, res) => {
  let client;

  try {
    client = await MongoClient.connect(connectionString);
    const db = client.db("shopper");

    const users = await db.collection("users").find({}).toArray();
    res.json(users);
  } catch (err) {
    console.error("GET /users error:", err);
    res.status(500).send("Error fetching users");
  } finally {
    if (client) {
      await client.close();
    }
  }
});
app.post("/registeruser", async (req, res) => {
  var newUser = {
    "UserId": req.body.UserId,
    "UserName": req.body.UserName,
    "Email": req.body.Email,
    "Password": req.body.Password,
    "Age": parseInt(req.body.Age),
    "Phone": req.body.Phone
  };
  let client;

  try {
    client = await MongoClient.connect(connectionString);
    const db = client.db("shopper");

    const result = await db.collection("users").insertOne(newUser);
    res.status(201).json({
      message: "User registered successfully",
      insertedId: result.insertedId,
      user: newUser
    });
  } catch (err) {
    console.error("POST /registeruser error:", err);
    res.status(500).send("Error creating user");
  } finally {
    if (client) {
      await client.close();
    }
  }
});

app.listen(3500, () => {
    console.log("Server is running at http://127.0.0.1:3500");
});