const mongoose = require('mongoose');

const customerDetailSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // link to user
    phone: { type: Number, required: true },
    DOB: { type: Date, required: true },
    gender: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CustomerDetails', customerDetailSchema);
