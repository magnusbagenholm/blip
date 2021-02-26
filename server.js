const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");  // Require mongoose library
require("dotenv").config();   // Require the dotenv
const userRoutes = require("./src/models/users/UserRoute");
const path = require('path');
const app = express();


// Cors

const corsOptions = {
	"credentials": true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

//****************************************
mongoose 
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })   
  .then(() => {
    console.log("Database connection Success!");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });
//******************************************
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api", [
	userRoutes,
]);

app.post("/ping", (req, res) => {
  return res.send({
    status: "Server is up and running",
  });
});

app.listen(PORT, () => {
  console.log("Server started listening on port : ", PORT);
});

app.use(express.static(path.join(__dirname, './build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});
