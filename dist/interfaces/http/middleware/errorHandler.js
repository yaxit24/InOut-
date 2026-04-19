"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const DomainError_1 = require("../../../domain/errors/DomainError");
const InvalidPhoneNumberError_1 = require("../../../domain/errors/InvalidPhoneNumberError");
const ResidentNotVerifiedError_1 = require("../../../domain/errors/ResidentNotVerifiedError");
const VisitNotPendingError_1 = require("../../../domain/errors/VisitNotPendingError");
const UnauthorizedOperationError_1 = require("../../../domain/errors/UnauthorizedOperationError");
// Maps domain errors to HTTP status codes
// Unknown errors default to 500 to avoid leaking internals
function errorHandler(err, _req, res, _next) {
    console.error(`[Error] ${err.name}: ${err.message}`);
    if (err instanceof InvalidPhoneNumberError_1.InvalidPhoneNumberError) {
        res.status(400).json({ error: err.message });
        return;
    }
    if (err instanceof ResidentNotVerifiedError_1.ResidentNotVerifiedError) {
        res.status(403).json({ error: err.message });
        return;
    }
    if (err instanceof UnauthorizedOperationError_1.UnauthorizedOperationError) {
        res.status(403).json({ error: err.message });
        return;
    }
    if (err instanceof VisitNotPendingError_1.VisitNotPendingError) {
        res.status(409).json({ error: err.message });
        return;
    }
    if (err instanceof DomainError_1.DomainError) {
        res.status(400).json({ error: err.message });
        return;
    }
    // Generic application errors (e.g., 'Resident not found')
    if (err.message.includes('not found')) {
        res.status(404).json({ error: err.message });
        return;
    }
    if (err.message.includes('already exists')) {
        res.status(409).json({ error: err.message });
        return;
    }
    // Fallback — never leak stack traces in production
    res.status(500).json({
        error: process.env.NODE_ENV === 'development'
            ? err.message
            : 'Internal server error',
    });
}
