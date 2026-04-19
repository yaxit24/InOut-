"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = require("./routes/authRoutes");
const visitRoutes_1 = require("./routes/visitRoutes");
const errorHandler_1 = require("./middleware/errorHandler");
function createApp(deps) {
    const app = (0, express_1.default)();
    // Global middleware
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    // Health check — useful for deployment probes
    app.get('/health', (_req, res) => {
        res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });
    // Routes
    app.use('/api/auth', (0, authRoutes_1.createAuthRoutes)(deps));
    app.use('/api/visits', (0, visitRoutes_1.createVisitRoutes)(deps));
    // Catch-all error handler — must be registered LAST
    app.use(errorHandler_1.errorHandler);
    return app;
}
