import express from 'express';
import envConfig from './config/dotenv.js';
import connectDb from './config/db.js';
import cors from 'cors';

envConfig();

const server = express();

const port = process.env.PORT || 8000;

server.use(cors({
    origin: '*'
}));
server.use(express.json());

const startServer = async () => {
    try {
        await connectDb();
        server.listen(port, () =>
            console.log(`Server running on port http://localhost:${port}`)
        )
    } catch (error) {
        console.error('DB connection failed:', error.message);
    }
};

startServer();

server.get('/', (req,res) => {
    res.send("Server Started!")
})