const jwt = require('jsonwebtoken');
const User = require('../models/User');

function authorizeRoles(...roles) {
    return (req, res, next) => {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = User.verifyJWT(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token.' });
        }

        req.user = decoded;

        if (!roles.some(role => req.user.roles.includes(role))) {
            return res.status(403).json({ message: 'Access denied. You do not have the required role.' });
        }

        next();
    };
}

module.exports = authorizeRoles;
