"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVisitRoutes = createVisitRoutes;
const express_1 = require("express");
const schemas_1 = require("../validators/schemas");
const authMiddleware_1 = require("../middleware/authMiddleware");
function createVisitRoutes(deps) {
    const router = (0, express_1.Router)();
    const auth = (0, authMiddleware_1.createAuthMiddleware)(deps.tokenService);
    // POST /api/visits — guard logs a new visitor (status: PENDING)
    router.post('/', auth, (0, authMiddleware_1.requireRole)('guard'), async (req, res, next) => {
        try {
            const parsed = schemas_1.logVisitSchema.parse(req.body);
            const visit = await deps.logVisitUseCase.execute({
                ...parsed,
                guardId: req.user.sub,
                societyId: req.user.societyId,
            });
            res.status(201).json({
                id: visit.id,
                status: visit.status,
                message: 'Visit logged — waiting for resident approval',
            });
        }
        catch (err) {
            next(err);
        }
    });
    // PATCH /api/visits/:id/approve — resident approves a pending visit
    router.patch('/:id/approve', auth, (0, authMiddleware_1.requireRole)('resident'), async (req, res, next) => {
        try {
            await deps.approveVisitUseCase.execute({
                visitId: req.params.id,
                residentId: req.user.sub,
            });
            res.json({ message: 'Visit approved' });
        }
        catch (err) {
            next(err);
        }
    });
    // PATCH /api/visits/:id/deny — resident denies a pending visit
    router.patch('/:id/deny', auth, (0, authMiddleware_1.requireRole)('resident'), async (req, res, next) => {
        try {
            await deps.denyVisitUseCase.execute({
                visitId: req.params.id,
                residentId: req.user.sub,
            });
            res.json({ message: 'Visit denied' });
        }
        catch (err) {
            next(err);
        }
    });
    // GET /api/visits/my — resident views their visit history
    router.get('/my', auth, (0, authMiddleware_1.requireRole)('resident'), async (req, res, next) => {
        try {
            const visits = await deps.visitRepo.findByResidentId(req.user.sub);
            res.json(visits);
        }
        catch (err) {
            next(err);
        }
    });
    return router;
}
