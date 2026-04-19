import { IVisitRepository } from '../../domain/interfaces/IVisitRepository';
import { Visit, VisitStatus } from '../../domain/entities/Visit';
import { PrismaClient } from '@prisma/client';

export class PrismaVisitRepository implements IVisitRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async findById(id: string): Promise<Visit | null> {
        const row = await this.prisma.visit.findUnique({ where: { id } });
        return row ? this.toDomain(row) : null;
    }

    async findByResidentId(residentId: string): Promise<Visit[]> {
        const rows = await this.prisma.visit.findMany({
            where: { residentId },
            orderBy: { createdAt: 'desc' },
        });
        return rows.map((r: any) => this.toDomain(r));
    }

    async save(visit: Visit): Promise<void> {
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

    async update(visit: Visit): Promise<void> {
        await this.prisma.visit.update({
            where: { id: visit.id },
            data: {
                status: visit.status,
                exitTime: visit.exitTime,
            },
        });
    }

    async findAll(): Promise<Visit[]> {
        const rows = await this.prisma.visit.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return rows.map((r: any) => this.toDomain(r));
    }

    private toDomain(row: {
        id: string;
        visitorName: string;
        visitorPhone: string;
        status: string;
        flatNumber: string;
        purpose: string;
        residentId: string;
        guardId: string;
        entryTime: Date;
        exitTime: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }): Visit {
        return new Visit(
            row.id,
            row.visitorName,
            row.visitorPhone,
            row.status as VisitStatus,
            row.flatNumber,
            row.purpose,
            row.residentId,
            row.guardId,
            '',                  // societyId — not stored in visits table, can be derived from resident
            row.createdAt,
            row.updatedAt,
            row.exitTime,
        );
    }
}
