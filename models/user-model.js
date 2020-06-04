const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  profileImg: String,
  googleId: String,
  selectedCoinsId: Array,
});

const User = mongoose.model("user", userSchema);
module.exports = User;
