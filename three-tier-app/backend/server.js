const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

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
