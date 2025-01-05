require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5500;
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//user routes middleware
const userRoute = require("./app/routes/user_router");
app.use("/api/users", userRoute);
// house routes middleware
const houseRoute = require("./app/routes/house_router");
app.use("/api", houseRoute);
// house photo post and delete routes middleware
// const s3PostHandler = require("./app/routes/s3_post_router");
// app.use("/api", s3PostHandler);

async function start() {
  try {
    // const result = await dbConnection.execute("select 'test' ");
    app.listen(port);
    console.log("database connection established");
    console.log(`listening on port http://localhost:${port}`);
  } catch (error) {
    console.log(error.message);
  }
}
start();
