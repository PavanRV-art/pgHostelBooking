const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || process.env.MONGO_URL;
        if (!mongoURI) {
            console.error('Error: Neither MONGO_URI nor MONGO_URL is defined in .env file');
            process.exit(1);
        }
        const conn = await mongoose.connect(mongoURI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
