const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config();

// Check for required environment variables
const dbUrl = process.env.MONGO_URI || process.env.MONGO_URL;
if (!dbUrl) {
    console.error('FATAL ERROR: MONGO_URI or MONGO_URL is not defined in .env');
    process.exit(1);
}

if (!process.env.JWT_SECRET) {
    console.error('FATAL ERROR: JWT_SECRET is not defined in .env');
    process.exit(1);
}

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/pg', require('./routes/pgRoutes'));
app.use('/api/hostels', require('./routes/hostelRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('SERVER ERROR:', err.stack || err);
    res.status(500).json({
        message: err.message || 'Internal Server Error',
        error: err,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
