const app = require('./app');
const config = require('./config/config');
const connectDb = require('./config/db');

const PORT = process.env.PORT || config.port;

const startServer = async () => {
    try {
        await connectDb();
        app.listen(PORT, () =>
            console.log(`Server running on port http://localhost:${PORT}`)
        )
    } catch (error) {
        console.error('DB connection failed:', error.message);
    }
};

startServer();
