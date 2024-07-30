const mongoose = require("mongoose");

const collectiveDistributionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: "CollectiveDistribution",
  }
);

module.exports = mongoose.model(
  "CollectiveDistribution",
  collectiveDistributionSchema
);
