"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("./utils/pass");
const userit = require("./routes/userRoutes");
const blogs = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();
const port = 3000;
var path = require("path");

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded


app.use("/auth", authRoutes);
app.use("/blogs", blogs);
app.use("/user", passport.authenticate("jwt", { session: false }), userit);


// app.use("/login", express.static("public/login.html"))
// app.use("/register", express.static("public/register.html"))

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.post("/login", passport.authenticate("jwt"), function (req, res) {
  res.send(req.user);
});

/*app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/login.html"));
});*/

/*app.get("/register", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/register.html"));
});

app.get("/index", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});
*/

app.get("/blog", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/blog.html"));
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
