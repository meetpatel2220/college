const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");


//bring all routes
const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const tcp = require("./routes/api/tcp");

const app = express();

//Middleware for bodyparser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//Passport middleware
app.use(passport.initialize());

//Config for JWT strategy
require("./strategies/jsonwtStrategy")(passport);

const db = require("./setup/myurl").mongoURL;

mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Hey there college placement");
  });


  //actual routes
app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/tcp", tcp);
var port = process.env.PORT || 3000;

  app.listen(port, () => console.log(`App is running at 3000`));

