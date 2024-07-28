const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema({
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
    required: [true, 'Transaction reference is required']
  },
  updatedFields: {
    type: Map,
    of: String,
    required: [true, 'Updated fields are required']
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  previousUpdate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Update'
  }
},
  {
    timestamps: true,
    collection: 'Update'
  });

module.exports = mongoose.model('Update', updateSchema);
