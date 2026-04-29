var mongoClient = require('mongodb').MongoClient;
var express = require('express');
var cors = require('cors');
var connectionString = 'mongodb://127.0.0.1:27017';
var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  let client;

  try {
    client = await mongoClient.connect(connectionString);
    const db = client.db("shopper");

    const products = await db.collection("products").find({}).toArray();

    res.json(products);
  } catch (err) {
    console.error("GET /products error:", err);
    res.status(500).send("Error fetching products");
  } finally {
    if (client) {
      await client.close();
    }
  }
});

app.get("/details/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  let client;

  try {
    client = await mongoClient.connect(connectionString);
    const db = client.db("shopper");

    const product = await db.collection("products").findOne({ ProductId: id });

    if (!product) {
      res.status(404).send("Product not found");
      return;
    }

    res.json(product);
  } catch (err) {
    console.error("GET /details/:id error:", err);
    res.status(500).send("Error fetching product details");
  } finally {
    if (client) {
      await client.close();
    }
  }
});

app.post("/addproduct", async (req, res) => {
  const product = {
    "ProductId": parseInt(req.body.ProductId),
    "Name": req.body.Name,
    "Price": parseFloat(req.body.Price),
    "Stock": req.body.Stock===true
  };
  let client;

  try {
    client = await mongoClient.connect(connectionString);
    const db = client.db("shopper");

    await db.collection("products").insertOne(product);
    res.status(201).json({
        message: "Product added successfully",
        product: product
    });
  } catch (err) {
    console.error("POST /addproduct error:", err);
    res.status(500).send("Error adding product");
  } finally {
    if (client) {
      await client.close();
    }
  }
});

app.put("/updateproduct", async (req, res) => {
  const id = parseInt(req.body.ProductId);
  const updatedProduct = {
    "Name": req.body.Name,
    "Price": parseFloat(req.body.Price),
    "Stock": req.body.Stock===true
  };
  let client;

  try {
    client = await mongoClient.connect(connectionString);
    const db = client.db("shopper");

    await db.collection("products").updateOne({ ProductId: id }, { $set: updatedProduct });
    res.send("Product updated successfully");
  } catch (err) {
    console.error("PUT /updateproduct/:id error:", err);
    res.status(500).send("Error updating product");
  } finally {
    if (client) {
      await client.close();
    }
  }
});

app.delete("/deleteproduct/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  let client;

  try {
    client = await mongoClient.connect(connectionString);
    const db = client.db("shopper");

    await db.collection("products").deleteOne({ ProductId: id });
    res.send("Product deleted successfully");
  } catch (err) {
    console.error("DELETE /deleteproduct/:id error:", err);
    res.status(500).send("Error deleting product");
  } finally {
    if (client) {
      await client.close();
    }
  }
});

app.get("/users", async (req, res) => {
  let client;

  try {
    client = await mongoClient.connect(connectionString);
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
    client = await mongoClient.connect(connectionString);
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
  console.log("Server is running at http://localhost:3500");
});

