import { IVisitRepository } from '../../domain/interfaces/IVisitRepository';
import { IResidentRepository } from '../../domain/interfaces/IResidentRepository';

export interface DenyVisitDTO {
    visitId: string;
    residentId: string;
}

export class DenyVisitUseCase {
    constructor(
        private readonly visitRepo: IVisitRepository,
        private readonly residentRepo: IResidentRepository,
    ) { }

    async execute(dto: DenyVisitDTO): Promise<void> {
        const visit = await this.visitRepo.findById(dto.visitId);
        if (!visit) throw new Error(`Visit ${dto.visitId} not found`);

        const resident = await this.residentRepo.findById(dto.residentId);
        if (!resident) throw new Error(`Resident ${dto.residentId} not found`);

        visit.deny(resident); // domain rule: must be PENDING + VERIFIED

        await this.visitRepo.update(visit);
    }
}
