const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const Roles = Object.freeze({
    ADMIN: 'admin',
    USER: 'user'
});

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    publicKey: { type: String, required: true },
    privateKey: { type: String, required: true },
    balance: { type: Number, default: 0 },
    roles: { enum: Object.values(Roles), default: [Roles.USER] }
});

Object.assign(userSchema.statics, { Roles });

userSchema.pre('save', async function(next) {
    if (this.isModified('passwordHash')) {
        this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.passwordHash);
};

userSchema.methods.generateJWT = function() {
    const payload = {
        id: this._id,
        username: this.username,
        roles: this.roles
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

userSchema.statics.verifyJWT = function(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null;
    }
};

const User = mongoose.model('User', userSchema);
module.exports = User;
