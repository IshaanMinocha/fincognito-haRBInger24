const Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../../../config/config');

const signUp = async (res, parameters) => {
  const {
    password,
    passwordConfirmation,
    email,
    username,
    name,
    lastName,
  } = parameters;

  // Check if username or email already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    if (res) {
      return res.status(400).json({
        status: 400,
        message: 'Username or email already exists',
      });
    } else {
      throw new Error('Username or email already exists');
    }
  }

  if (password === passwordConfirmation) {
    const newUser = User({
      password: Bcrypt.hashSync(password, 10),
      email,
      username,
      name,
      lastName,
      balance: 0, // Initial balance
      complianceStatus: 'Pending', // Initial compliance status
    });

    try {
      const savedUser = await newUser.save();

      const token = jwt.sign(
        { email, id: savedUser.id, username },
        config.API_KEY_JWT,
        { expiresIn: config.TOKEN_EXPIRES_IN }
      );

      if (res) {
        return res.status(201).json({ token });
      } else {
        return { token };
      }
    } catch (error) {
      if (res) {
        return res.status(400).json({
          status: 400,
          message: error.message,
        });
      } else {
        throw error;
      }
    }
  }

  if (res) {
    return res.status(400).json({
      status: 400,
      message: 'Passwords are different, try again!!!',
    });
  } else {
    throw new Error('Passwords are different, try again!!!');
  }
};

const login = async (res, parameters) => {
  const { emailOrUsername, password } = parameters;

  try {
    // Check if the user exists
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return res.status(400).json({
        status: 400,
        message: 'User not found',
      });
    }

    // Verify the password
    const passwordMatch = await Bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        status: 400,
        message: 'Invalid password',
      });
    }

    // Generate and return a JWT token
    const token = jwt.sign(
      { email: user.email, id: user.id, username: user.username },
      config.API_KEY_JWT,
      { expiresIn: config.TOKEN_EXPIRES_IN }
    );

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
};

const userDetails = async (res, parameters) => {
  const { userId } = parameters;

  try {
    // Fetch user details based on userId
    const user = await User.findById(userId).populate('transactionHistory');

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
      });
    }

    // Return user details
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
};

const userDetailsByUsername = async (res, parameters) => {
  const { username } = parameters;

  try {
    // Fetch user details based on username
    const user = await User.findOne({ username }).populate('transactionHistory');

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
      });
    }

    // Return user details
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  signUp,
  login,
  userDetails,
  userDetailsByUsername,
};
