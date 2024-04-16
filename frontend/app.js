const express = require("express");
const path = require("path");
const app = express();


// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, "public")));

// Serve the 'index.html' file for all routes
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
