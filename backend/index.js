const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT , () => console.log("Server has started"));

mongoose.connect(process.env.MONGODB_CONNECTION_STRING,
{
  useNewUrlParser: true,
  UseUnifiedTopology: true,
  UsecreateIndexes: true,
}, (err) =>{
  if(err) throw err;
  console.log("Connection Established");
});

app.use("/users", require("./routes/UserRouter"));
