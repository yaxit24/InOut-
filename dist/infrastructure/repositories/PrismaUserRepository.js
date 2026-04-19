"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserRepository = void 0;
const Resident_1 = require("../../domain/entities/Resident");
const PhoneNumber_1 = require("../../domain/value-objects/PhoneNumber");
// Maps between Prisma's flat DB rows and our rich domain entity
class PrismaUserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        const row = await this.prisma.user.findUnique({ where: { id } });
        return row ? this.toDomain(row) : null;
    }
    async findByPhone(phone) {
        const row = await this.prisma.user.findUnique({ where: { phone } });
        return row ? this.toDomain(row) : null;
    }
    async save(resident) {
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
    async update(resident) {
        await this.prisma.user.update({
            where: { id: resident.id },
            data: {
                name: resident.name,
                status: resident.status,
                flatNumber: resident.flatNumber,
            },
        });
    }
    // Hydrates a Prisma row into a domain Resident
    // PhoneNumber.create() won't throw here because the DB already validated it on save
    toDomain(row) {
        return new Resident_1.Resident(row.id, row.name, PhoneNumber_1.PhoneNumber.create(row.phone), row.status, row.flatNumber ?? '', row.societyId);
    }
}
exports.PrismaUserRepository = PrismaUserRepository;
