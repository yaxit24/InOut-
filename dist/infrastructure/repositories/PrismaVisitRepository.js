"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaVisitRepository = void 0;
const Visit_1 = require("../../domain/entities/Visit");
class PrismaVisitRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        const row = await this.prisma.visit.findUnique({ where: { id } });
        return row ? this.toDomain(row) : null;
    }
    async findByResidentId(residentId) {
        const rows = await this.prisma.visit.findMany({
            where: { residentId },
            orderBy: { createdAt: 'desc' },
        });
        return rows.map((r) => this.toDomain(r));
    }
    async save(visit) {
        await this.prisma.visit.create({
            data: {
                id: visit.id,
                visitorName: visit.visitorName,
                visitorPhone: visit.visitorPhone,
                purpose: visit.purpose,
                flatNumber: visit.flatNumber,
                status: visit.status,
                residentId: visit.residentId,
                guardId: visit.guardId,
            },
        });
    }
    async update(visit) {
        await this.prisma.visit.update({
            where: { id: visit.id },
            data: {
                status: visit.status,
                exitTime: visit.exitTime,
            },
        });
    }
    toDomain(row) {
        return new Visit_1.Visit(row.id, row.visitorName, row.visitorPhone, row.status, row.flatNumber, row.purpose, row.residentId, row.guardId, '', // societyId — not stored in visits table, can be derived from resident
        row.createdAt, row.updatedAt, row.exitTime);
    }
}
exports.PrismaVisitRepository = PrismaVisitRepository;
