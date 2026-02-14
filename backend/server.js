// Main server file to initialize Express app, connect to MongoDB, and start the server

const app = require('./src/app');
const config = require('./src/config/environment');
const connectDB = require('./src/config/database');
const { initializeFirebase } = require('./src/config/firebase');
const logger = require('./src/utils/logger');

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    logger.error(error.name, error.message);
    process.exit(1);
});

// Start server function
const startServer = async () => {
    try {
        // 1. Connect to MongoDB
        logger.info('Connecting to MongoDB...');
        await connectDB();

        // 2. Initialize Firebase Admin
        logger.info('Initializing Firebase Admin...');
        initializeFirebase();

        // 3. Start Express server
        const PORT = config.port;
        const server = app.listen(PORT, () => {
            logger.success(`Server running on port ${PORT}`);
            logger.info(`Environment: ${config.nodeEnv}`);
            logger.info(`API URL: http://localhost:${PORT}/api`);
            logger.info(`Health check: http://localhost:${PORT}/api/health`);
            console.log('\nServer is ready to accept requests!\n');
        });

        // Handle unhandled promise rejections
        process.on('unhandledRejection', (error) => {
            logger.error('UNHANDLED REJECTION! Shutting down...');
            logger.error(error);
            server.close(() => {
                process.exit(1);
            });
        });

        // Handle SIGTERM
        process.on('SIGTERM', () => {
            logger.info('SIGTERM received. Shutting down gracefully...');
            server.close(() => {
                logger.info('Process terminated!');
            });
        });

    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Start the server
startServer();