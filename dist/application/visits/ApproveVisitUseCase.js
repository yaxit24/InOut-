"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApproveVisitUseCase = void 0;
class ApproveVisitUseCase {
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
        // Domain rule enforced here — see Visit.approve()
        visit.approve(resident); // throws ResidentNotVerifiedError or VisitNotPendingError
        await this.visitRepo.update(visit); // persist the status change
    }
}
exports.ApproveVisitUseCase = ApproveVisitUseCase;
