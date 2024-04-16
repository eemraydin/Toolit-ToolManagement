const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./routes");
const cors = require("cors");
const imageupload = require('express-fileupload');
const cookieParser = require("cookie-parser");
require("./models/db");

const allowedOrigins = process.env.FRONTEND_URL.toString().split(',');
// app.set("view engine", "ejs");

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use(imageupload());

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});



app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/", router);

// app.get("/", (req, res) => {
//   res.render("index");
// });

app.get("/*", (req, res, next) => {
  res.status(404).json({ error: "Page not found" });
});

app.listen(8080, () => {
  console.log("Server running on port 8080.");
});
