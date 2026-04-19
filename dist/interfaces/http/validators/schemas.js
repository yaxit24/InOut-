"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logVisitSchema = exports.loginSchema = exports.registerResidentSchema = void 0;
const zod_1 = require("zod");
exports.registerResidentSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    phone: zod_1.z.string().min(10, 'Phone must be at least 10 digits'),
    flatNumber: zod_1.z.string().min(1, 'Flat number is required'),
    societyId: zod_1.z.string().min(1, 'Society ID is required'),
});
exports.loginSchema = zod_1.z.object({
    phone: zod_1.z.string().min(10),
    otp: zod_1.z.string().length(6, 'OTP must be 6 digits'),
});
exports.logVisitSchema = zod_1.z.object({
    visitorName: zod_1.z.string().min(1, 'Visitor name is required'),
    visitorPhone: zod_1.z.string().min(10, 'Visitor phone is required'),
    flatNumber: zod_1.z.string().min(1, 'Flat number is required'),
    purpose: zod_1.z.string().min(1, 'Purpose is required'),
    residentId: zod_1.z.string().uuid('Resident ID must be a valid UUID'),
});
