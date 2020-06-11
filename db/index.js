const mongoose = require("mongoose");

const URI = process.env.PORT
  ? process.env.MONGO_URI
  : "mongodb://127.0.0.1:27017";
console.log(URI);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

mongoose.set("useFindAndModify", false);
const db = mongoose.connection;
module.exports = db;
