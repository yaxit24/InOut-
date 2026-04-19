"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterResidentUseCase = void 0;
const Resident_1 = require("../../domain/entities/Resident");
const PhoneNumber_1 = require("../../domain/value-objects/PhoneNumber");
class RegisterResidentUseCase {
    constructor(residentRepo) {
        this.residentRepo = residentRepo;
    }
    async execute(dto) {
        // Throws InvalidPhoneNumberError if invalid — domain enforces it
        const phone = PhoneNumber_1.PhoneNumber.create(dto.phone);
        const existing = await this.residentRepo.findByPhone(phone.toString());
        if (existing)
            throw new Error('Resident with this phone already exists');
        const resident = new Resident_1.Resident(crypto.randomUUID(), dto.name, phone, 'PENDING', // admin must verify separately
        dto.flatNumber, dto.societyId);
        await this.residentRepo.save(resident);
        return resident;
    }
}
exports.RegisterResidentUseCase = RegisterResidentUseCase;
