const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    image: String,
    username: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      unique: true
    }
  },
);

const User = model("User", userSchema);

module.exports = User;
