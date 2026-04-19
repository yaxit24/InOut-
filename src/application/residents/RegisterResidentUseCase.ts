import { Resident } from '../../domain/entities/Resident';
import { PhoneNumber } from '../../domain/value-objects/PhoneNumber';
import { IResidentRepository } from '../../domain/interfaces/IResidentRepository';

export interface RegisterResidentDTO {
    name: string;
    phone: string;  // raw string, Value Object validates it
    flatNumber: string;
    societyId: string;
}

export class RegisterResidentUseCase {
    constructor(private readonly residentRepo: IResidentRepository) { }

    async execute(dto: RegisterResidentDTO): Promise<Resident> {
        // Throws InvalidPhoneNumberError if invalid — domain enforces it
        const phone = PhoneNumber.create(dto.phone);

        const existing = await this.residentRepo.findByPhone(phone.toString());
        if (existing) throw new Error('Resident with this phone already exists');

        const resident = new Resident(
            crypto.randomUUID(),
            dto.name,
            phone,
            'resident',
            'PENDING',          // admin must verify separately
            dto.flatNumber,
            dto.societyId,
        );

        await this.residentRepo.save(resident);
        return resident;
    }
}
