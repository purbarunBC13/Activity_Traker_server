const express = require("express");
const path = require("path");
const DBTest = require("./configs/db");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  const result = await DBTest();
  res.send(result);
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
