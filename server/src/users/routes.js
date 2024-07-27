const express = require('express');

const controller = require('./controller/UserController');
const validateSchemas = require('../../middlewares/validateSchemas');
const schemas = require('./utils/schemasValidation');
const validateAuth = require('../../middlewares/validateAuth');

const router = express.Router();

router.post(
  '/api/v1/signup',
  validateSchemas.inputs(schemas.signUp, 'body'),
  (req, res) => {
    controller.signUp(res, req.body);
  }
);

// API : Login router
router.post(
  '/api/v1/login',
  validateSchemas.inputs(schemas.login, 'body'),
  (req, res) => {
    controller.login(res, req.body);
  }
);

// API : User Details router
router.get(
  '/api/v1/user/details',
  validateAuth.checkIfAuthenticated,
  (req, res) => {
    // Use req.user to access the authenticated user's information
    res.json({ user: req.user });
  }
);

// API : user details
router.post(
  '/:username',
  validateAuth.checkIfAuthenticated,
  async (req, res) => {
    const { username } = req.params;
    try {
      const result = await controller.userDetailsByUsername(res, { username });
      return result;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return res.status(500).json({
        status: 500,
        message: 'Internal server error',
      });
    }
  }
);

module.exports = router;
