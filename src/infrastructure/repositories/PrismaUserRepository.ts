import { IResidentRepository } from '../../domain/interfaces/IResidentRepository';
import { Resident, ResidentStatus } from '../../domain/entities/Resident';
import { PhoneNumber } from '../../domain/value-objects/PhoneNumber';
import { PrismaClient } from '@prisma/client';

// Maps between Prisma's flat DB rows and our rich domain entity
export class PrismaUserRepository implements IResidentRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async findById(id: string): Promise<Resident | null> {
        const row = await this.prisma.user.findUnique({ where: { id } });
        return row ? this.toDomain(row) : null;
    }

    async findByPhone(phone: string): Promise<Resident | null> {
        const row = await this.prisma.user.findUnique({ where: { phone } });
        return row ? this.toDomain(row) : null;
    }

    async save(resident: Resident): Promise<void> {
        await this.prisma.user.create({
            data: {
                id: resident.id,
                name: resident.name,
                phone: resident.phone.toString(),
                role: 'resident',
                flatNumber: resident.flatNumber,
                societyId: resident.societyId,
                status: resident.status,
            },
        });
    }

    async update(resident: Resident): Promise<void> {
        await this.prisma.user.update({
            where: { id: resident.id },
            data: {
                name: resident.name,
                status: resident.status,
                flatNumber: resident.flatNumber,
            },
        });
    }

    async findAll(): Promise<Resident[]> {
        const rows = await this.prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return rows.map((r: any) => this.toDomain(r));
    }

    async updateStatus(id: string, status: ResidentStatus): Promise<void> {
        await this.prisma.user.update({
            where: { id },
            data: { status },
        });
    }

    // Hydrates a Prisma row into a domain Resident
    // PhoneNumber.create() won't throw here because the DB already validated it on save
    private toDomain(row: {
        id: string;
        name: string;
        phone: string;
        role: string;
        status: string;
        flatNumber: string | null;
        societyId: string;
    }): Resident {
        return new Resident(
            row.id,
            row.name,
            PhoneNumber.create(row.phone),
            row.role,
            row.status as ResidentStatus,
            row.flatNumber || '',
            row.societyId
        );
    }
}
