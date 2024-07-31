const { saveTokenToTransaction, generateToken, verifyToken } = require('../../../utils/zkpToken');
const User = require('../../users/models/User');
const ComplianceCheck = require('../models/ComplianceCheck');
const Transaction = require('../models/Transaction');

const complianceCheck = async (req, res) => {
  const { transactionId, status, reasons } = req.body;

  try {
    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({ status: 404, message: 'Transaction not found' });
    }

    const complianceCheck = new ComplianceCheck({ transaction: transactionId, status, reasons });
    await complianceCheck.save();

    transaction.complianceCheck = complianceCheck._id;
    await transaction.save();

    const token = generateToken(transaction._id, transaction.isCompleted, transaction.isFlagged);
    await saveTokenToTransaction(transaction._id, token, transaction.isCompleted, transaction.isFlagged);

    return res.status(200).json({ status: 200, message: 'Compliance check completed', complianceCheck, token });
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Internal server error', error: error.message });
  }
};

const verifyTransactionToken = async (req, res) => {
  const { transactionId, token } = req.body;

  try {
    const verificationResult = await verifyToken(transactionId, token);

    if (verificationResult.success) {
      return res.status(200).json({ status: 200, message: 'Token verified', ...verificationResult });
    } else {
      return res.status(400).json({ status: 400, message: verificationResult.message });
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Internal server error', error: error.message });
  }
};

const initiateTransaction = async (req, res) => {
  const { senderId, receiverId, amount } = req.body;

  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(400).json({ status: 400, message: 'Invalid sender or receiver' });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ status: 400, message: 'Insufficient balance' });
    }

    let transaction = new Transaction({ sender: senderId, recipient: receiverId, amount });
    console.log('Transaction before save:', transaction);

    await transaction.validate();

    await transaction.save();

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    await saveTokenToTransaction(transaction._id, transaction.token, transaction.isCompleted, transaction.isFlagged);

    return res.status(200).json({ status: 200, message: 'Transaction successful', transaction, token: transaction.token });
  } catch (error) {
    console.error('Error during transaction:', error.message);
    return res.status(500).json({ status: 500, message: 'Internal server error', error: error.message });
  }
};

const getUserTransactions = async (req, res) => {
  try {
    const {userId} = req.body;  // Assumes req.user is populated by the authenticate middleware
    const transactions = await Transaction.find({ sender: userId });
    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const markComplianceCompleted = async (req, res) => {
  try {
    const userId = req.user.id;  // Assumes req.user is populated by the authenticate middleware
    const user = await User.findById(userId);
    user.complianceCheck = 'completed';
    await user.save();
    res.status(200).json({ message: 'Compliance status marked as completed' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = {
  initiateTransaction,
  complianceCheck,
  verifyTransactionToken,
  markComplianceCompleted,
  getUserTransactions
};
