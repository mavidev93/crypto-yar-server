const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

mongoose.set("useFindAndModify", false);
const db = mongoose.connection;
module.exports = db;
