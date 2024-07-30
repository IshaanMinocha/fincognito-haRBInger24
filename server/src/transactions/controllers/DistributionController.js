const { pushDataToClusters } = require("../../../utils/distritbution");
const UserTransaction = require("../models/CollectiveDistributionModel");

exports.storeUserTransaction = async (req, res) => {
  const { user, transaction } = req.body;
  const userTransaction = new UserTransaction({ user, transaction });
  await userTransaction.save();
  await pushDataToClusters(userTransaction);
  res.status(200).send("UserTransaction stored and distributed successfully");
};

exports.retrieveUserTransaction = async (req, res) => {
  const { userId } = req.params;
  const userTransactions = await UserTransaction.find({
    user: userId,
  }).populate("transaction");
  if (userTransactions.length > 0) {
    res.status(200).send(userTransactions);
  } else {
    res.status(404).send("No transactions found for this user");
  }
};
