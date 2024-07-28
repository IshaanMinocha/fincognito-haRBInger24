const mongoose = require('mongoose');

const ComplianceCheckSchema = new mongoose.Schema(
  {
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction',
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    reasons: [String], // Reasons for rejection, if any
  },
  { timestamps: true }
);

const ComplianceCheck = mongoose.model('ComplianceCheck', ComplianceCheckSchema);

module.exports = ComplianceCheck;
