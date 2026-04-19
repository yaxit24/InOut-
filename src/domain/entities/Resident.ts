import {PhoneNumber} from '../value-objects/PhoneNumber';

export type ResidentStatus = 'PENDING' | 'VERIFIED' | 'REJECTED';

export class Resident{
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly phone: PhoneNumber,
        public readonly role: string,
        public status: ResidentStatus,
        public readonly flatNumber : string,
        public readonly societyId: string
    ){}

    isVerified(): boolean {
        return this.status === 'VERIFIED'
    }
}
