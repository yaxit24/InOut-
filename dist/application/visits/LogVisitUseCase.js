"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogVisitUseCase = void 0;
const Visit_1 = require("../../domain/entities/Visit");
class LogVisitUseCase {
    constructor(visitRepo) {
        this.visitRepo = visitRepo;
    }
    async execute(dto) {
        const visit = new Visit_1.Visit(crypto.randomUUID(), dto.visitorName, dto.visitorPhone, 'PENDING', dto.flatNumber, dto.purpose, dto.residentId, dto.guardId, dto.societyId, new Date(), new Date());
        await this.visitRepo.save(visit);
        return visit;
    }
}
exports.LogVisitUseCase = LogVisitUseCase;
