const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

require("./routes/api-routes.js")(app);

app.listen(PORT, () => {
  console.log("Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});
