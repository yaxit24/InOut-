import express from 'express';
import cors from 'cors';
import { createAuthRoutes } from './routes/authRoutes';
import { createVisitRoutes } from './routes/visitRoutes';
import { createAdminRoutes } from './routes/adminRoutes';
import { errorHandler } from './middleware/errorHandler';
import { RegisterResidentUseCase } from '../../application/residents/RegisterResidentUseCase';
import { LoginUseCase } from '../../application/auth/LoginUseCase';
import { LogVisitUseCase } from '../../application/visits/LogVisitUseCase';
import { ApproveVisitUseCase } from '../../application/visits/ApproveVisitUseCase';
import { DenyVisitUseCase } from '../../application/visits/DenyVisitUseCase';
import { GetAllUsersUseCase } from '../../application/admin/GetAllUsersUseCase';
import { GetAllVisitsUseCase } from '../../application/admin/GetAllVisitsUseCase';
import { VerifyResidentUseCase } from '../../application/admin/VerifyResidentUseCase';
import { ITokenService } from '../../domain/interfaces/ITokenService';
import { IVisitRepository } from '../../domain/interfaces/IVisitRepository';

// Dependencies injected from main.ts — app factory pattern for testability
export interface AppDependencies {
    registerUseCase: RegisterResidentUseCase;
    loginUseCase: LoginUseCase;
    logVisitUseCase: LogVisitUseCase;
    approveVisitUseCase: ApproveVisitUseCase;
    denyVisitUseCase: DenyVisitUseCase;
    getAllUsersUseCase: GetAllUsersUseCase;
    getAllVisitsUseCase: GetAllVisitsUseCase;
    verifyResidentUseCase: VerifyResidentUseCase;
    tokenService: ITokenService;
    visitRepo: IVisitRepository;
}

export function createApp(deps: AppDependencies) {
    const app = express();

    // Global middleware
    app.use(cors());
    app.use(express.json());

    // Health check — useful for deployment probes
    app.get('/health', (_req, res) => {
        res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    // Routes
    app.use('/api/auth', createAuthRoutes(deps));
    app.use('/api/visits', createVisitRoutes(deps));
    app.use('/api/admin', createAdminRoutes(deps));

    // Catch-all error handler — must be registered LAST
    app.use(errorHandler);

    return app;
}
