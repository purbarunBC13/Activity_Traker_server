const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const mysql = require("mysql2");
const { test } = require("./configs/db");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

//! routers
const areaRouter = require("./routes/area_router");
const authRouter = require("./routes/auth_router");

app.use("/area", areaRouter);
app.use("/auth", authRouter);

// ! Testing the connection
app.get("/", async (req, res) => {
  const result = await test();
  res.send(result);
});

const connecton = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
});

const port = process.env.PORT || 5000;

connecton.connect((err) => {
  if (err) {
    console.log("Databse Connection failed");
    console.log(err);
    return;
  }
  console.log("Database Connection successful");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
