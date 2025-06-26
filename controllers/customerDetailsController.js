const CustomerDetails = require('../Model/UserDetailsModel');
const User = require('../Model/User');

// ✅ Create CustomerDetails and link to User
exports.createCustomerDetails = async (req, res) => {
  try {
    const { userId, phone, DOB, gender } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Prevent duplicate detail creation
    if (user.userDetails) {
      return res.status(400).json({ message: 'Customer details already exist for this user' });
    }

    const details = await CustomerDetails.create({ userId, phone, DOB, gender });

    // Link details to user
    user.userDetails = details._id;
    await user.save();

    res.status(201).json({ message: 'Customer details created successfully', details });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create customer details', error: error.message });
  }
};

// ✅ Get CustomerDetails by User ID
// ✅ Get CustomerDetails by User ID (with user name & email)
// ✅ Get CustomerDetails by User ID (with user name & email)
exports.getCustomerDetailsByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const details = await CustomerDetails.findOne({ userId })
        .populate('userId', 'name email'); // 🟢 Populating name and email
  
      if (!details) return res.status(404).json({ message: 'Customer details not found' });
  
      res.status(200).json(details);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching customer details', error: error.message });
    }
  };
  
  

// ✅ Update CustomerDetails
exports.updateCustomerDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const { phone, DOB, gender } = req.body;

    const updated = await CustomerDetails.findOneAndUpdate(
      { userId },
      { phone, DOB, gender },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Customer details not found' });

    res.status(200).json({ message: 'Customer details updated', updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating customer details', error: error.message });
  }
};

// ✅ Delete CustomerDetails
exports.deleteCustomerDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    const deleted = await CustomerDetails.findOneAndDelete({ userId });
    if (!deleted) return res.status(404).json({ message: 'Customer details not found' });

    // Unlink from user
    await User.findByIdAndUpdate(userId, { $unset: { userDetails: "" } });

    res.status(200).json({ message: 'Customer details deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting customer details', error: error.message });
  }
};
exports.updateUserBasicInfo = async (req, res) => {
    try {
      const { userId } = req.params;
      const { name, email } = req.body;
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, email },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User info updated", updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Failed to update user info", error: error.message });
    }
  };
  