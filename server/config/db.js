const { default: mongoose } = require("mongoose");
const config = require("./config.js");

const mongoUri = config.dbUrlMongoDB;

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(mongoUri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDb;
