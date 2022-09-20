const mongoose = require("mongoose");
const List = require("./Schemas/list");
const User = require("./Schemas/users");
const url = "mongodb://0.0.0.0:27017/todoshnikOnKoa";

module.exports = (app) => {
  mongoose.connect(url, function (err) {
    if (err) {
      throw err;
    }
    console.log("Connected sucsessfully");
  });
  app.List = List;
  app.User = User;
};
