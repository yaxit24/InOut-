import { Router, Response, NextFunction } from 'express';
import { createAuthMiddleware, requireRole, AuthenticatedRequest } from '../middleware/authMiddleware';
import { AppDependencies } from '../app';

export function createAdminRoutes(deps: AppDependencies): Router {
    const router = Router();
    const auth = createAuthMiddleware(deps.tokenService);

    // Apply strict auth matching 'admin'
    router.use(auth, requireRole('admin'));

    // GET /api/admin/users
    router.get('/users', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        try {
            const users = await deps.getAllUsersUseCase.execute();
            // Transform entities to JSON objects
            res.json(users.map(u => ({
                id: u.id,
                name: u.name,
                phone: u.phone.toString(),
                role: u.role,
                status: u.status,
                flatNumber: u.flatNumber,
                societyId: u.societyId,
            })));
        } catch (err) {
            next(err);
        }
    });

    // GET /api/admin/visits
    router.get('/visits', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        try {
            const visits = await deps.getAllVisitsUseCase.execute();
            res.json(visits.map(v => ({
                id: v.id,
                visitorName: v.visitorName,
                visitorPhone: v.visitorPhone.toString(),
                purpose: v.purpose,
                flatNumber: v.flatNumber,
                status: v.status,
                entryTime: v.createdAt,
                exitTime: v.exitTime,
                residentId: v.residentId,
                guardId: v.guardId,
            })));
        } catch (err) {
            next(err);
        }
    });

    // PATCH /api/admin/users/:id/verify
    router.patch('/users/:id/verify', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        try {
            await deps.verifyResidentUseCase.execute({ residentId: req.params.id as string });
            res.json({ message: 'User verified successfully' });
        } catch (err) {
            next(err);
        }
    });

    return router;
}
