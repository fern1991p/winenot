const { Schema, model } = require("mongoose");

const apiWineSchema = new Schema({
  imageUrl: { type: String, default: "images/default_image.jpg" },

  title: {},
  type: String,
  price: {
    type: String,
  },

  description: {
    type: String,
  },

  ratingCount: {
    type: String,
  },

  link: {
    type: String,
  },
});

const ApiWine = model("ApiWine", apiWineSchema);
module.exports = ApiWine;
