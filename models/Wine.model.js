const { Schema, model } = require("mongoose");

const wineSchema = new Schema({
  image: { type: String, default: "images/default_image.jpg" },

  name: {
    type: String,
    required: true,
  },
  sweetness: {
    type: String,
    enum: ["Dry", "Half dry", "Medium sweet", "Sweet"],
  },
  price: {
    type: Number,
  },
  matches: {
    type: String,
  },
  comment: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Wine = model("Wine", wineSchema);
module.exports = Wine;
