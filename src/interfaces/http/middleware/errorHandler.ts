import { Request, Response, NextFunction } from 'express';
import { DomainError } from '../../../domain/errors/DomainError';
import { InvalidPhoneNumberError } from '../../../domain/errors/InvalidPhoneNumberError';
import { ResidentNotVerifiedError } from '../../../domain/errors/ResidentNotVerifiedError';
import { VisitNotPendingError } from '../../../domain/errors/VisitNotPendingError';
import { UnauthorizedOperationError } from '../../../domain/errors/UnauthorizedOperationError';

// Maps domain errors to HTTP status codes
// Unknown errors default to 500 to avoid leaking internals
export function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
): void {
    console.error(`[Error] ${err.name}: ${err.message}`);

    if (err instanceof InvalidPhoneNumberError) {
        res.status(400).json({ error: err.message });
        return;
    }

    if (err instanceof ResidentNotVerifiedError) {
        res.status(403).json({ error: err.message });
        return;
    }

    if (err instanceof UnauthorizedOperationError) {
        res.status(403).json({ error: err.message });
        return;
    }

    if (err instanceof VisitNotPendingError) {
        res.status(409).json({ error: err.message });
        return;
    }

    if (err instanceof DomainError) {
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
