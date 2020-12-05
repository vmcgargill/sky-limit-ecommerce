const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("./config/passport");
const fs = require("fs");
const path = require("path");
const OUTPUT_DIR = path.resolve(__dirname, "upload");
const routes = require("./routes");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR)
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("upload"));
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/client/build"));
} else {
  require('dotenv').config();
}

app.use(routes)

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/skylimit", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.listen(PORT, () => {
  console.log("Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});
