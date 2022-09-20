const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let listSchema = Schema({
  id: String,
  content: String,
  completed: Boolean,
  createdBy: String
});

module.exports = mongoose.model("List", listSchema);
