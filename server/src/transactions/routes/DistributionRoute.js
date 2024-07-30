const express = require('express');
const router = express.Router();
const userTransactionController = require('../controllers/DistributionController');

router.post('/store', userTransactionController.storeUserTransaction);

router.get('/retrieve/:userId', userTransactionController.retrieveUserTransaction);

module.exports = router;
