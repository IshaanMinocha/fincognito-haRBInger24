const express = require('express');
const { initiateTransaction, complianceCheck, verifyTransactionToken, getUserTransactions, markComplianceCompleted } = require('./controllers/TransactionControllers');
const { checkIfAuthenticated } = require('../../middlewares/validateAuth');
// const schemas = require('../validation/schemas'); // Define schemas for transactions if necessary
// const { validate } = require('../utils/validate');

const router = express.Router();

router.post('/transaction', initiateTransaction);
router.post('/compliance-check', complianceCheck);
router.post('/verify-zkp-token', verifyTransactionToken);
router.get('/api/v1/transactions',
    // checkIfAuthenticated, 
    getUserTransactions);
router.post('/api/v1/mark-compliance', checkIfAuthenticated, markComplianceCompleted);

module.exports = router;
