"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockOtpService = void 0;
// Dev-only mock: always accepts '123456' as a valid OTP
// Replace with Twilio / MSG91 adapter for production
const MOCK_OTP = '123456';
class MockOtpService {
    async send(phone, _otp) {
        console.log(`[MockOTP] OTP for ${phone}: ${MOCK_OTP}`);
    }
    async verify(_phone, otp) {
        return otp === MOCK_OTP;
    }
}
exports.MockOtpService = MockOtpService;
