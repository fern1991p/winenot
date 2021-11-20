const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const wineSchema = new Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
    unique: true,
  },
  sweetness: {
    type: String,
    enum: ["Dry", "Half dry", "Medium sweet", "Sweet"],
    required: true,
  },
  price: {
    type: Number,
    unique: true,
  },
  matches: {
    type: String,
    unique: true,
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
