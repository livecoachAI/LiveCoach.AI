const mongoose = require('mongoose');
const config = require('./environment');

// MongoDB connection
const options = {

    useNewUrlParser: true,
    useUnifiedTopology: true,

    maxPoolSize: 10,
    minPoolSize: 5,

    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
};

const connectDB = async () => {
    try {
        // Attempt to connect
        await mongoose.connect(config.mongoUri, options);

        console.log('MongoDB Connected Successfully');
        console.log(`Database: ${mongoose.connection.name}`);

    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);

        // Exit process
        process.exit(1);
    }
};

// Connection event listeners
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from MongoDB');
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
});

module.exports = connectDB;