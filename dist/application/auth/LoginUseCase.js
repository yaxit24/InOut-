"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCase = void 0;
class LoginUseCase {
    constructor(residentRepo, otpService, tokenService) {
        this.residentRepo = residentRepo;
        this.otpService = otpService;
        this.tokenService = tokenService;
    }
    async execute(dto) {
        const resident = await this.residentRepo.findByPhone(dto.phone);
        if (!resident)
            throw new Error('No resident found for this phone');
        const valid = await this.otpService.verify(dto.phone, dto.otp);
        if (!valid)
            throw new Error('Invalid or expired OTP');
        // Sign JWT with resident's id and role
        const token = this.tokenService.sign({
            sub: resident.id,
            role: 'RESIDENT',
            societyId: resident.societyId,
        });
        return { token, residentId: resident.id };
    }
}
exports.LoginUseCase = LoginUseCase;
