const crypto = require('crypto');
const Transaction = require('../src/transactions/models/Transaction');

const generateToken = (transactionId, isCompleted, isFlagged) => {
  const tokenData = `${transactionId}-${isCompleted}-${isFlagged}`;
  const token = crypto.createHash('sha256').update(tokenData).digest('hex');
  return token;
};

const saveTokenToTransaction = async (transactionId, token, isCompleted, isFlagged) => {
  try {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) throw new Error('Transaction not found');

    transaction.token = token;
    transaction.isCompleted = isCompleted;
    transaction.isFlagged = isFlagged;
    
    await transaction.save();
    return { success: true, message: 'Token saved to transaction', transaction };
  } catch (error) {
    console.error('Error saving token to transaction:', error.message);
    return { success: false, message: error.message };
  }
};

const verifyToken = async (transactionId, token) => {
  try {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) throw new Error('Transaction not found');

    const expectedToken = generateToken(transactionId, transaction.isCompleted, transaction.isFlagged);
    if (expectedToken === token) {
      return {
        success: true,
        isCompleted: transaction.isCompleted,
        isFlagged: transaction.isFlagged
      };
    } else {
      return { success: false, message: 'Invalid token' };
    }
  } catch (error) {
    console.error('Error verifying token:', error.message);
    return { success: false, message: error.message };
  }
};

module.exports = { generateToken, saveTokenToTransaction, verifyToken };
