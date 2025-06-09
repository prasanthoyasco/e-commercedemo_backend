const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  buyer: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Processing", "Completed", "Cancelled"], default: "Pending" },
  paymentMethod: { type: String, required: true },
  paymentDate: Date,
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    }
  ],
  total: Number
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
