const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./oauth/passport.setup");
// const isLoggedIn = require("./middlewares/isLoggedIn");

const db = require("./db");
const cryptoRouter = require("./routes/crypto-router");
const authRouter = require("./routes/auth-router");
const app = express();
//serve front end

const apiPort = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 7 * 24 * 60 * 60 * 1000,
    name: "crypto-session",
    keys: [process.env.CRYPTO_SESSION_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/auth", authRouter);

app.use("/crypto", cryptoRouter);
app.use(express.static("build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
