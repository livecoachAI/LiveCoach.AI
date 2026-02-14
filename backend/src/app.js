// Main Express application setup
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config/environment');
const routes = require('./routes');
const { notFoundHandler, globalErrorHandler } = require('./middleware/errorHandler');

// Create Express app
const app = express();

// ===== SECURITY MIDDLEWARE =====
app.use(helmet());

// ===== CORS CONFIGURATION =====
app.use(cors({
    origin: config.frontendUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ===== BODY PARSING MIDDLEWARE =====
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ===== LOGGING MIDDLEWARE =====
if (config.isDevelopment) {
    app.use(morgan('dev')); // Colored output for development
} else {
    app.use(morgan('combined')); // Standard Apache format for production
}

// ===== REQUEST LOGGING =====
app.use((req, res, next) => {
    console.log(`📥 ${req.method} ${req.originalUrl}`);
    next();
});

// ===== ROUTES =====
app.use('/api', routes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to Coaching App API',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            auth: {
                register: 'POST /api/auth/register',
                login: 'POST /api/auth/login',
                verify: 'GET /api/auth/verify',
                checkUser: 'POST /api/auth/check-user',
                completeOnboarding: 'POST /api/auth/complete-onboarding',
            },
            user: {
                profile: 'GET /api/user/profile',
                updateProfile: 'PUT /api/user/profile',
                deleteProfile: 'DELETE /api/user/profile',
                getUserById: 'GET /api/user/:userId',
            },
        },
    });
});

// ===== ERROR HANDLING =====
// 404 handler (must be after all routes)
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(globalErrorHandler);

module.exports = app;