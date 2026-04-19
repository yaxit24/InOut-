import { Resident, ResidentStatus } from '../entities/Resident';

export interface IResidentRepository {
    findById(id: string): Promise<Resident | null>;
    findByPhone(phone: string): Promise<Resident | null>;
    save(resident: Resident): Promise<void>;
    update(resident: Resident): Promise<void>;
    findAll(): Promise<Resident[]>;
    updateStatus(id: string, status: ResidentStatus): Promise<void>;
}