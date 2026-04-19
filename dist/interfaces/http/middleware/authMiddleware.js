"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthMiddleware = createAuthMiddleware;
exports.requireRole = requireRole;
// Factory: returns middleware pre-bound with the token service
function createAuthMiddleware(tokenService) {
    return (req, res, next) => {
        const header = req.headers.authorization;
        if (!header || !header.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Missing or malformed Authorization header' });
            return;
        }
        const token = header.slice(7); // strip "Bearer "
        try {
            const payload = tokenService.verify(token);
            req.user = {
                sub: payload.sub,
                role: payload.role,
                societyId: payload.societyId,
            };
            next();
        }
        catch {
            res.status(401).json({ error: 'Invalid or expired token' });
        }
    };
}
// Role guard — wraps authMiddleware to also check role
function requireRole(...roles) {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({
                error: `Requires one of roles: ${roles.join(', ')}`,
            });
            return;
        }
        next();
    };
}
