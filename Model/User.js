const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'customer'],
      default: 'customer'
    },
    otp: { type: String },
    otpExpires: { type: Date },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WishlistProduct' }],
    cartList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartPageItem' }],
    userDetails: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomerDetails' },
    customerAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomerAddress' },
    
  },
  { timestamps: true }
);


// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password check method
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
