import { z } from 'zod';

export const registerResidentSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    phone: z.string().min(10, 'Phone must be at least 10 digits'),
    flatNumber: z.string().min(1, 'Flat number is required'),
    societyId: z.string().min(1, 'Society ID is required'),
});

export const loginSchema = z.object({
    phone: z.string().min(10),
    otp: z.string().length(6, 'OTP must be 6 digits'),
});

export const logVisitSchema = z.object({
    visitorName: z.string().min(1, 'Visitor name is required'),
    visitorPhone: z.string().min(10, 'Visitor phone is required'),
    flatNumber: z.string().min(1, 'Flat number is required'),
    purpose: z.string().min(1, 'Purpose is required'),
    residentId: z.string().uuid('Resident ID must be a valid UUID'),
});
