const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const mongoAdminURI = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongodb:27017/admin`;
const mongoUserURI = process.env.MONGO_URI;

async function createMongoUser() {
  try {
    console.log("Connecting to MongoDB as admin...");
    const adminConn = await mongoose.createConnection(mongoAdminURI).asPromise();

    const adminDb = adminConn.useDb("admin");
    const users = await adminDb.command({ usersInfo: process.env.MONGO_APP_USER });

    if (users.users.length === 0) {
      console.log("User does not exist. Creating user...");
      await adminDb.command({
        createUser: process.env.MONGO_APP_USER,
        pwd: process.env.MONGO_APP_PASSWORD,
        roles: [{ role: "readWrite", db: process.env.MONGO_APP_DB }]
      });
      console.log("MongoDB user created successfully!");
    } else {
      console.log("MongoDB user already exists.");
    }

    await adminConn.close();
  } catch (error) {
    console.error("Error creating MongoDB user:", error);
  }
}

async function connectToDatabase() {
  await createMongoUser();

  mongoose.connect(mongoUserURI)
    .then(() => console.log("Connected to MongoDB successfully!"))
    .catch(err => console.error("MongoDB connection error:", err));
}

connectToDatabase();

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    res.json({ message: "Hello, World!" });
  } else {
    res.status(400).json({ message: "Invalid Credentials" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
