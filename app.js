const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");

require("./routes/api-routes.js")(app);
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/skyline", { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log("Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});
