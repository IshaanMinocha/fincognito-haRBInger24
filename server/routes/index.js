const status = require('../src/health/routes');
const users = require('../src/users/routes');
const transactions = require('../src/transactions/transactionRoutes');
// const validateAuth = require('../middlewares/validateAuth');
// const getData = require('../middlewares/getData');
const transactionRouter = require("../src/transactions/routes/TransactionRoute");
const dhtRoutes = require("../src/transactions/routes/dhtRoutes");
const userTransactionRoutes = require("../src/transactions/routes/DistributionRoute");

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('Welcome to fincognito!')
  })
  app.use('/users', users);
  app.use('/transaction-old', transactions);
  app.use('/compliance', status);
  // app.use("/transactions", transactionRouter);
  app.use("/dht", dhtRoutes);
  app.use("/user-transactions", userTransactionRoutes);
  app.use('/status', status);
  app.use('*', (req, res, next) => {
    // For all other URLs, return a 404 response
    res.status(404).send('Not found!!!');
  });
};
