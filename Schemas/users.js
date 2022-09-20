const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let userSchema = Schema({
  username:String,
  password:String
});

module.exports = mongoose.model("User", userSchema);
