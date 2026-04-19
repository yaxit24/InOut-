import { Visit } from '../../domain/entities/Visit';
import { IVisitRepository } from '../../domain/interfaces/IVisitRepository';

export interface LogVisitDTO {
    visitorName: string;
    visitorPhone: string;
    flatNumber: string;
    purpose: string;
    residentId: string;
    guardId: string;        // from JWT — the guard who logged this
    societyId: string;
}

export class LogVisitUseCase {
    constructor(private readonly visitRepo: IVisitRepository) { }

    async execute(dto: LogVisitDTO): Promise<Visit> {
        const visit = new Visit(
            crypto.randomUUID(),
            dto.visitorName,
            dto.visitorPhone,
            'PENDING',
            dto.flatNumber,
            dto.purpose,
            dto.residentId,
            dto.guardId,
            dto.societyId,
            new Date(),
            new Date(),
        );

        await this.visitRepo.save(visit);
        return visit;
    }
}
