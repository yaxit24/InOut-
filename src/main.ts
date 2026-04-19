import { config } from './shared/config/env'; // loads .env + validates — must be first import
import prisma from './infrastructure/database/prisma';
import { PrismaUserRepository } from './infrastructure/repositories/PrismaUserRepository';
import { PrismaVisitRepository } from './infrastructure/repositories/PrismaVisitRepository';
import { JwtTokenService } from './infrastructure/services/JwtTokenService';
import { MockOtpService } from './infrastructure/services/MockOtpService';
import { RegisterResidentUseCase } from './application/residents/RegisterResidentUseCase';
import { LoginUseCase } from './application/auth/LoginUseCase';
import { LogVisitUseCase } from './application/visits/LogVisitUseCase';
import { ApproveVisitUseCase } from './application/visits/ApproveVisitUseCase';
import { DenyVisitUseCase } from './application/visits/DenyVisitUseCase';
import { GetAllUsersUseCase } from './application/admin/GetAllUsersUseCase';
import { GetAllVisitsUseCase } from './application/admin/GetAllVisitsUseCase';
import { VerifyResidentUseCase } from './application/admin/VerifyResidentUseCase';
import { createApp } from './interfaces/http/app';

// ─── Manual DI: wire infrastructure → use cases → app ───
const userRepo = new PrismaUserRepository(prisma);
const visitRepo = new PrismaVisitRepository(prisma);
const tokenService = new JwtTokenService();
const otpService = new MockOtpService();

const registerUseCase = new RegisterResidentUseCase(userRepo);
const loginUseCase = new LoginUseCase(userRepo, otpService, tokenService);
const logVisitUseCase = new LogVisitUseCase(visitRepo);
const approveVisitUseCase = new ApproveVisitUseCase(visitRepo, userRepo);
const denyVisitUseCase = new DenyVisitUseCase(visitRepo, userRepo);
const getAllUsersUseCase = new GetAllUsersUseCase(userRepo);
const getAllVisitsUseCase = new GetAllVisitsUseCase(visitRepo);
const verifyResidentUseCase = new VerifyResidentUseCase(userRepo);

const app = createApp({
    registerUseCase,
    loginUseCase,
    logVisitUseCase,
    approveVisitUseCase,
    denyVisitUseCase,
    getAllUsersUseCase,
    getAllVisitsUseCase,
    verifyResidentUseCase,
    tokenService,
    visitRepo,
});

// ─── Start server ───
app.listen(config.port, () => {
    console.log(`🚪 MyGate API running on http://localhost:${config.port}`);
    console.log(`   Environment: ${config.nodeEnv}`);
    console.log(`   Health check: http://localhost:${config.port}/health`);
});
