import { IResidentRepository } from '../../domain/interfaces/IResidentRepository';

export class GetAllUsersUseCase {
    constructor(private residentRepository: IResidentRepository) {}

    async execute() {
        return await this.residentRepository.findAll();
    }
}
