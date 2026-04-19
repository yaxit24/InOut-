import { IVisitRepository } from '../../domain/interfaces/IVisitRepository';

export class GetAllVisitsUseCase {
    constructor(private visitRepository: IVisitRepository) {}

    async execute() {
        return await this.visitRepository.findAll();
    }
}
