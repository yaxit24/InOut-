import { IResidentRepository } from '../../domain/interfaces/IResidentRepository';
import { IOtpService } from '../../domain/interfaces/IOtpService';
import { ITokenService } from '../../domain/interfaces/ITokenService';

export interface LoginDTO {
    phone: string;
    otp: string;
}

export interface LoginResult {
    token: string;
    residentId: string;
}

export class LoginUseCase {
    constructor(
        private readonly residentRepo: IResidentRepository,
        private readonly otpService: IOtpService,
        private readonly tokenService: ITokenService,
    ) { }

    async execute(dto: LoginDTO): Promise<LoginResult> {
        const resident = await this.residentRepo.findByPhone(dto.phone);
        if (!resident) throw new Error('No resident found for this phone');

        const valid = await this.otpService.verify(dto.phone, dto.otp);
        if (!valid) throw new Error('Invalid or expired OTP');

        // Sign JWT with resident's id and role
        const token = this.tokenService.sign({
            sub: resident.id,
            role: resident.role,
            societyId: resident.societyId,
        });

        return { token, residentId: resident.id };
    }
}
