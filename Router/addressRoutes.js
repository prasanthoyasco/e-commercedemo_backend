const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');

// Create
router.post('/create', addressController.createCustomerAddress);

// Get by User ID
router.get('/:userId', addressController.getCustomerAddressByUserId);

// Update by User ID
router.put('/:userId', addressController.updateCustomerAddress);

// Delete by User ID
router.delete('/:userId', addressController.deleteCustomerAddress);

module.exports = router;
