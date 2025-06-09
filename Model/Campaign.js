const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ["Active", "Paused", "Completed"], default: "Active" },
  budget: { type: Number, required: true },
  spent: { type: Number, default: 0 },
  ctr: { type: Number, default: 0 }, // Click-through rate
  conversions: { type: Number, default: 0 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  platforms: [{ type: String, enum: ["Google Ads", "Facebook", "Instagram", "YouTube"] }],
  targetType: { type: String, enum: ["Product", "Category"], required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Campaign", campaignSchema);
