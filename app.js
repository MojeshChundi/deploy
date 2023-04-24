const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/user");
const sequelize = require("./utils/database");
const app = express();
app.use(cors());

//BODY PARSER

app.use(bodyParser.json());

//ROUTES

app.use(userRoutes);

//SERVER
sequelize
  .sync()
  .then((result) => {
    app.listen(4000);
  })
  .catch((err) => console.log(err));
