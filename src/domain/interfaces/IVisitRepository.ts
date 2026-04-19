import { Visit } from '../entities/Visit'

export interface IVisitRepository {
    findById(id: string): Promise<Visit | null>;
    findByResidentId(residentId: string): Promise<Visit[]>;
    save(visit: Visit): Promise<void>;
    update(visit: Visit): Promise<void>;
    findAll(): Promise<Visit[]>;
}
