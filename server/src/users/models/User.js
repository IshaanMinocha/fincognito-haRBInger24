const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: String,
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    complianceStatus: {
      type: String,
      enum: ['Compliant', 'Non-Compliant', 'Pending'],
      default: 'Pending',
    },
    transactionHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
