const express = require('express');
const router = express.Router();
const dhtController = require('../controllers/dhtController');


router.post('/store', dhtController.storeData);

router.get('/retrieve/:key', dhtController.retrieveData);

module.exports = router;
