const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  image: String,
}, { _id: false }); 

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    image: String,
    subcategories: [subcategorySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);