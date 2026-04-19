"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthRoutes = createAuthRoutes;
const express_1 = require("express");
const schemas_1 = require("../validators/schemas");
function createAuthRoutes(deps) {
    const router = (0, express_1.Router)();
    // POST /api/auth/register — create a new resident (starts as PENDING)
    router.post('/register', async (req, res, next) => {
        try {
            const parsed = schemas_1.registerResidentSchema.parse(req.body);
            const resident = await deps.registerUseCase.execute(parsed);
            res.status(201).json({
                id: resident.id,
                name: resident.name,
                phone: resident.phone.toString(),
                status: resident.status,
                message: 'Registration successful — pending admin verification',
            });
        }
        catch (err) {
            next(err);
        }
    });
    // POST /api/auth/login — OTP-based login, returns JWT
    router.post('/login', async (req, res, next) => {
        try {
            const parsed = schemas_1.loginSchema.parse(req.body);
            const result = await deps.loginUseCase.execute(parsed);
            res.json({
                token: result.token,
                residentId: result.residentId,
            });
        }
        catch (err) {
            next(err);
        }
    });
    return router;
}
