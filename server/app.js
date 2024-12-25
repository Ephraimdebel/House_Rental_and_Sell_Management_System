require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5500;
const dbConnection = require("./config/db");
const cors = require('cors')
app.use(express.json());
app.use(cors())

//user routes middleware
const userRoute = require("./app/routes/user_router");
app.use('/api/users',userRoute)

async function start() {
  try {
    const result = await dbConnection.execute("select 'test' ");
    app.listen(port);
    console.log("database connection established");
    console.log(`listening on port http://localhost:${port}`);
  } catch (error) {
    console.log(error.message);
  }
}
start()