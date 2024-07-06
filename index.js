const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const {test} = require("./configs/db");

const app = express();
app.use(express.json());

//! routers
const areaRouter = require("./routes/area_router");

app.use("/area", areaRouter);


// ! Testing the connection
app.get("/", async (req, res) => {
  const result = await test();
  res.send(result);
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
