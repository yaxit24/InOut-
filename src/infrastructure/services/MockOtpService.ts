import { IOtpService } from '../../domain/interfaces/IOtpService';

// Dev-only mock: always accepts '123456' as a valid OTP
// Replace with Twilio / MSG91 adapter for production
const MOCK_OTP = '123456';

export class MockOtpService implements IOtpService {
    async send(phone: string, _otp: string): Promise<void> {
        console.log(`[MockOTP] OTP for ${phone}: ${MOCK_OTP}`);
    }

    async verify(_phone: string, otp: string): Promise<boolean> {
        return otp === MOCK_OTP;
    }
}
