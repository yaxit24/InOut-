"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./shared/config/env"); // loads .env + validates — must be first import
const prisma_1 = __importDefault(require("./infrastructure/database/prisma"));
const PrismaUserRepository_1 = require("./infrastructure/repositories/PrismaUserRepository");
const PrismaVisitRepository_1 = require("./infrastructure/repositories/PrismaVisitRepository");
const JwtTokenService_1 = require("./infrastructure/services/JwtTokenService");
const MockOtpService_1 = require("./infrastructure/services/MockOtpService");
const RegisterResidentUseCase_1 = require("./application/residents/RegisterResidentUseCase");
const LoginUseCase_1 = require("./application/auth/LoginUseCase");
const LogVisitUseCase_1 = require("./application/visits/LogVisitUseCase");
const ApproveVisitUseCase_1 = require("./application/visits/ApproveVisitUseCase");
const DenyVisitUseCase_1 = require("./application/visits/DenyVisitUseCase");
const app_1 = require("./interfaces/http/app");
// ─── Manual DI: wire infrastructure → use cases → app ───
const userRepo = new PrismaUserRepository_1.PrismaUserRepository(prisma_1.default);
const visitRepo = new PrismaVisitRepository_1.PrismaVisitRepository(prisma_1.default);
const tokenService = new JwtTokenService_1.JwtTokenService();
const otpService = new MockOtpService_1.MockOtpService();
const registerUseCase = new RegisterResidentUseCase_1.RegisterResidentUseCase(userRepo);
const loginUseCase = new LoginUseCase_1.LoginUseCase(userRepo, otpService, tokenService);
const logVisitUseCase = new LogVisitUseCase_1.LogVisitUseCase(visitRepo);
const approveVisitUseCase = new ApproveVisitUseCase_1.ApproveVisitUseCase(visitRepo, userRepo);
const denyVisitUseCase = new DenyVisitUseCase_1.DenyVisitUseCase(visitRepo, userRepo);
const app = (0, app_1.createApp)({
    registerUseCase,
    loginUseCase,
    logVisitUseCase,
    approveVisitUseCase,
    denyVisitUseCase,
    tokenService,
    visitRepo,
});
// ─── Start server ───
app.listen(env_1.config.port, () => {
    console.log(`🚪 MyGate API running on http://localhost:${env_1.config.port}`);
    console.log(`   Environment: ${env_1.config.nodeEnv}`);
    console.log(`   Health check: http://localhost:${env_1.config.port}/health`);
});
