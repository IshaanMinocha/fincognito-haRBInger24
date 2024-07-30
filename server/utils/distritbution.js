const mongoose = require("mongoose");
const crypto = require("crypto");
const clusterURIs = require("../constants/clusterUri");
const UserTransaction = require("../src/transactions/models/CollectiveDistributionModel");

function hashKey(key) {
  return (
    parseInt(crypto.createHash("sha256").update(key).digest("hex"), 16) % 2 ** 160
  );
}

async function pushDataToClusters(userTransaction) {
  const sessions = [];
  const connections = [];
  try {
    for (const uri of clusterURIs) {
      const conn = await mongoose.createConnection(uri);
      connections.push(conn);
      const session = await conn.startSession();
      session.startTransaction();
      sessions.push({ conn, session });
    }

    for (const { conn, session } of sessions) {
      const UserTransactionModel = conn.model(
        "UserTransaction",
        UserTransaction.schema
      );
      await UserTransactionModel.create([userTransaction], { session });
    }

    for (const { session } of sessions) {
      await session.commitTransaction();
    }
  } catch (error) {
    for (const { session } of sessions) {
      await session.abortTransaction();
    }
    console.error("Transaction aborted due to an error: ", error);
  } finally {
    for (const { conn, session } of sessions) {
      session.endSession();
      await conn.close();
    }
  }
}

async function checkAndRestoreData() {
  const primaryURI = clusterURIs[0];
  let primaryData;

  try {
    const primaryConn = await mongoose.createConnection(primaryURI);
    const PrimaryModel = primaryConn.model(
      "UserTransaction",
      UserTransaction.schema
    );
    primaryData = await PrimaryModel.find().lean();
    await primaryConn.close();
  } catch (error) {
    console.error("Error fetching data from primary cluster: ", error);
    return;
  }

  for (const uri of clusterURIs.slice(1)) {
    try {
      const conn = await mongoose.createConnection(uri);
      const UserTransactionModel = conn.model(
        "UserTransaction",
        UserTransaction.schema
      );
      const data = await UserTransactionModel.find().lean();

      if (JSON.stringify(primaryData) !== JSON.stringify(data)) {
        await UserTransactionModel.deleteMany({});
        await UserTransactionModel.insertMany(primaryData);
        console.log(`Restored data in cluster ${uri} from primary cluster`);
      } else {
        console.log(`Data is consistent in cluster ${uri}`);
      }
      await conn.close();
    } catch (error) {
      console.error(
        `Error during data integrity check for cluster ${uri}: `,
        error
      );
    }
  }
}

setInterval(checkAndRestoreData, 60000);

module.exports = {
  pushDataToClusters,
  checkAndRestoreData,
};
