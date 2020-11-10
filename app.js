const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("./config/passport");
const fs = require("fs");
const path = require("path");
const OUTPUT_DIR = path.resolve(__dirname, "upload");

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
  app.use(express.static("client/build"));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

require("./routes/api-routes.js")(app);
require("./routes/product-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/skyline", { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log("Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});
