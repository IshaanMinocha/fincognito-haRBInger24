const express = require('express');
const { initiateTransaction, complianceCheck, verifyTransactionToken } = require('./controllers/TransactionControllers');
// const schemas = require('../validation/schemas'); // Define schemas for transactions if necessary
// const { validate } = require('../utils/validate');

const router = express.Router();

router.post('/transaction', initiateTransaction);
router.post('/compliance-check', complianceCheck);
router.post('/verify-zkp-token', verifyTransactionToken);

module.exports = router;
