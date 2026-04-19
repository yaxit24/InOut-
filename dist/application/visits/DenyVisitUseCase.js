"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DenyVisitUseCase = void 0;
class DenyVisitUseCase {
    constructor(visitRepo, residentRepo) {
        this.visitRepo = visitRepo;
        this.residentRepo = residentRepo;
    }
    async execute(dto) {
        const visit = await this.visitRepo.findById(dto.visitId);
        if (!visit)
            throw new Error(`Visit ${dto.visitId} not found`);
        const resident = await this.residentRepo.findById(dto.residentId);
        if (!resident)
            throw new Error(`Resident ${dto.residentId} not found`);
        visit.deny(resident); // domain rule: must be PENDING + VERIFIED
        await this.visitRepo.update(visit);
    }
}
exports.DenyVisitUseCase = DenyVisitUseCase;
