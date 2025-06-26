const CustomerAddress = require('../Model/deliveryAddress');
const User = require('../Model/User');

// ✅ Create Address and Link to User
exports.createCustomerAddress = async (req, res) => {
    try {
      const { userId, houseNo, street, landMark, city, district, state, pincode } = req.body;
  
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const address = await CustomerAddress.create({
        userId,
        houseNo,
        street,
        landMark,
        city,
        district,
        state,
        pincode,
      });
  
      // Optional: Link the most recent address to user (can be removed if not needed)
      user.customerAddress = address._id;
      await user.save();
  
      res.status(201).json({ message: 'Address created successfully', address });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create address', error: error.message });
    }
  };
  

// ✅ Get Address by User ID (with user name/email)
exports.getCustomerAddressByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const address = await CustomerAddress.findOne({ userId })
      .populate('userId', 'name email');

    if (!address) return res.status(404).json({ message: 'Address not found' });

    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching address', error: error.message });
  }
};

// ✅ Update Address by User ID
exports.updateCustomerAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const { houseNo, street, landMark, city, district, state, pincode } = req.body;

    const updated = await CustomerAddress.findOneAndUpdate(
      { userId },
      { houseNo, street, landMark, city, district, state, pincode },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Address not found' });

    res.status(200).json({ message: 'Address updated successfully', updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating address', error: error.message });
  }
};

// ✅ Delete Address by User ID
exports.deleteCustomerAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    const deleted = await CustomerAddress.findOneAndDelete({ userId });
    if (!deleted) return res.status(404).json({ message: 'Address not found' });

    // Unlink from user
    await User.findByIdAndUpdate(userId, { $unset: { customerAddress: "" } });

    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting address', error: error.message });
  }
};
