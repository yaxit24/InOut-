import { DomainError } from './DomainError';

export class InvalidPhoneNumberError extends DomainError {
    constructor(phone: string) {
        super(`Invalid Phone Number: "${phone}" `)
    }
}
