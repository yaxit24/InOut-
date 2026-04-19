import { Request, Response, NextFunction } from 'express';
import { ITokenService } from '../../../domain/interfaces/ITokenService';

// Extends Express Request to carry decoded JWT payload
export interface AuthenticatedRequest extends Request {
    user?: {
        sub: string;
        role: string;
        societyId: string;
    };
}

// Factory: returns middleware pre-bound with the token service
export function createAuthMiddleware(tokenService: ITokenService) {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
        const header = req.headers.authorization;
        if (!header || !header.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Missing or malformed Authorization header' });
            return;
        }

        const token = header.slice(7); // strip "Bearer "

        try {
            const payload = tokenService.verify(token);
            req.user = {
                sub: payload.sub as string,
                role: payload.role as string,
                societyId: payload.societyId as string,
            };
            next();
        } catch {
            res.status(401).json({ error: 'Invalid or expired token' });
        }
    };
}

// Role guard — wraps authMiddleware to also check role
export function requireRole(...roles: string[]) {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({
                error: `Requires one of roles: ${roles.join(', ')}`,
            });
            return;
        }
        next();
    };
}
