import { IResidentRepository } from '../../domain/interfaces/IResidentRepository';

interface VerifyResidentDTO {
    residentId: string;
}

export class VerifyResidentUseCase {
    constructor(private residentRepository: IResidentRepository) {}

    async execute(dto: VerifyResidentDTO) {
        const resident = await this.residentRepository.findById(dto.residentId);
        if (!resident) {
            throw new Error('Resident not found');
        }

        // Only admins can do this, the route will guarantee an admin is calling
        await this.residentRepository.updateStatus(dto.residentId, 'VERIFIED');
    }
}
