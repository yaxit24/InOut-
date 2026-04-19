import { IVisitRepository } from '../../domain/interfaces/IVisitRepository';
import { IResidentRepository } from '../../domain/interfaces/IResidentRepository';

// Input shape — what the controller hands in
export interface ApproveVisitDTO {
    visitId: string;
    residentId: string; // extracted from JWT by the controller
}

export class ApproveVisitUseCase {
    constructor(
        private readonly visitRepo: IVisitRepository,
        private readonly residentRepo: IResidentRepository,
    ) { }

    async execute(dto: ApproveVisitDTO): Promise<void> {
        const visit = await this.visitRepo.findById(dto.visitId);
        if (!visit) throw new Error(`Visit ${dto.visitId} not found`);

        const resident = await this.residentRepo.findById(dto.residentId);
        if (!resident) throw new Error(`Resident ${dto.residentId} not found`);

        // Domain rule enforced here — see Visit.approve()
        visit.approve(resident); // throws ResidentNotVerifiedError or VisitNotPendingError

        await this.visitRepo.update(visit); // persist the status change
    }
}
