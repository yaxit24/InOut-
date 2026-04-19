import { Router, Response, NextFunction } from 'express';
import { logVisitSchema } from '../validators/schemas';
import { createAuthMiddleware, requireRole, AuthenticatedRequest } from '../middleware/authMiddleware';
import { AppDependencies } from '../app';

export function createVisitRoutes(deps: AppDependencies): Router {
    const router = Router();
    const auth = createAuthMiddleware(deps.tokenService);

    // POST /api/visits — guard logs a new visitor (status: PENDING)
    router.post(
        '/',
        auth,
        requireRole('guard'),
        async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
            try {
                const parsed = logVisitSchema.parse(req.body);
                const visit = await deps.logVisitUseCase.execute({
                    ...parsed,
                    guardId: req.user!.sub,
                    societyId: req.user!.societyId,
                });
                res.status(201).json({
                    id: visit.id,
                    status: visit.status,
                    message: 'Visit logged — waiting for resident approval',
                });
            } catch (err) {
                next(err);
            }
        },
    );

    // PATCH /api/visits/:id/approve — resident approves a pending visit
    router.patch(
        '/:id/approve',
        auth,
        requireRole('resident'),
        async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
            try {
                await deps.approveVisitUseCase.execute({
                    visitId: req.params.id as string,
                    residentId: req.user!.sub,
                });
                res.json({ message: 'Visit approved' });
            } catch (err) {
                next(err);
            }
        },
    );

    // PATCH /api/visits/:id/deny — resident denies a pending visit
    router.patch(
        '/:id/deny',
        auth,
        requireRole('resident'),
        async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
            try {
                await deps.denyVisitUseCase.execute({
                    visitId: req.params.id as string,
                    residentId: req.user!.sub,
                });
                res.json({ message: 'Visit denied' });
            } catch (err) {
                next(err);
            }
        },
    );

    // GET /api/visits/my — resident views their visit history
    router.get(
        '/my',
        auth,
        requireRole('resident'),
        async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
            try {
                const visits = await deps.visitRepo.findByResidentId(req.user!.sub);
                res.json(visits);
            } catch (err) {
                next(err);
            }
        },
    );

    return router;
}
