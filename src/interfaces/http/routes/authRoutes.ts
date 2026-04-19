import { Router, Request, Response, NextFunction } from 'express';
import { registerResidentSchema, loginSchema } from '../validators/schemas';
import { AppDependencies } from '../app';

export function createAuthRoutes(deps: AppDependencies): Router {
    const router = Router();

    // POST /api/auth/register — create a new resident (starts as PENDING)
    router.post(
        '/register',
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const parsed = registerResidentSchema.parse(req.body);
                const resident = await deps.registerUseCase.execute(parsed);
                res.status(201).json({
                    id: resident.id,
                    name: resident.name,
                    phone: resident.phone.toString(),
                    status: resident.status,
                    message: 'Registration successful — pending admin verification',
                });
            } catch (err) {
                next(err);
            }
        },
    );

    // POST /api/auth/login — OTP-based login, returns JWT
    router.post(
        '/login',
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const parsed = loginSchema.parse(req.body);
                const result = await deps.loginUseCase.execute(parsed);
                res.json({
                    token: result.token,
                    residentId: result.residentId,
                });
            } catch (err) {
                next(err);
            }
        },
    );

    return router;
}
