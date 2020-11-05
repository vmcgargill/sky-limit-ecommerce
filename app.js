const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("./config/passport");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("upload"));
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

require("./routes/api-routes.js")(app);
require("./routes/product-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/skyline", { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log("Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});
