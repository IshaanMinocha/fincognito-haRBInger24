const status = require('../src/health/routes');
const users = require('../src/users/routes');
// const validateAuth = require('../middlewares/validateAuth');
// const getData = require('../middlewares/getData');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('Welcome to fincognito!')
  })
  app.use('/users', users);
  app.use('/status', status);
  app.use('/transaction', status);
  app.use('/compliance', status);
  app.use('*', (req, res, next) => {
    // if (req.originalUrl.startsWith('/admin')) {
    //   return next(); // Pass the request to the next middleware
    // }

    // For all other URLs, return a 404 response
    res.status(404).send('Not found!!!');
  });
};
