const mongoose = require('mongoose');
const crypto = require('crypto');

const transactionSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: [true, 'Sender is required'],
        trim: true
    },
    recipient: {
        type: String,
        required: [true, 'Recipient is required'],
        trim: true
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
    isUpdated: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    updates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Update'
    }]
},
    {
        timestamps: true,
        collection: 'Transaction'
    });

transactionSchema.pre('save', function (next) {
    const transactionString = `${this.sender}-${this.recipient}-${this.amount}-${this.timestamp}`;
    this.hash = crypto.createHash('sha256').update(transactionString).digest('hex');
    next();
});

module.exports = mongoose.model('Transaction', transactionSchema);
