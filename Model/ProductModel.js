const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  images: [{ type: String }],
  name: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String },
  productVideoUrl: { type: String },
  variant: [
    {
      name: { type: String },
      value: { type: String }
    }
  ],
  shipping: {
    weight: { type: Number }, // in grams
    size: {
      width: Number,
      height: Number,
      length: Number,
      unit: { type: String, enum: ["inch", "meter", "feet"], default: "inch" }
    }
  },
  stock: { type: Number, default: 0 },
  price: { type: String },
  SKU: { type: String },
  status: { type: String, enum: ["Active", "Inactive"], default: "Inactive" }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
