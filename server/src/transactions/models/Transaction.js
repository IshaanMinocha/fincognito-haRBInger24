const mongoose = require('mongoose');
const crypto = require('crypto');

const transactionSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Sender is required']
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Recipient is required']
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount must be a positive number']
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  hash: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending'
  },
  token: {
    type: String,
    required: true
  },
  complianceCheck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ComplianceCheck'
  },
  isUpdated: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  isFlagged: {
    type: Boolean,
    default: false
  },
  //TODO: to be populated by aman,s compliance check
  isCompleted: {
    type: Boolean,
    default: false
  },
  updates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Update'
  }]
}, {
  timestamps: true,
  collection: 'Transaction'
});

transactionSchema.pre('validate', function(next) {
  if (!this.hash) {
    const transactionString = `${this.sender}-${this.recipient}-${this.amount}-${this.timestamp}`;
    this.hash = crypto.createHash('sha256').update(transactionString).digest('hex');
    console.log('Hash generated:', this.hash);  // Logging the hash value
  } else {
    console.log('Hash already set:', this.hash);  // Logging if the hash is already set
  }
  next();
});

module.exports = mongoose.model('Transaction', transactionSchema);
