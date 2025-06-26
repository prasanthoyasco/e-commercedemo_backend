const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerDetailsController');

router.post('/create', customerController.createCustomerDetails);

router.get('/:userId', customerController.getCustomerDetailsByUserId);

router.put('/:userId', customerController.updateCustomerDetails);

router.delete('/:userId', customerController.deleteCustomerDetails);

router.put('/update-info/:userId',customerController.updateUserBasicInfo);


module.exports = router;
