import { DomainError } from './DomainError';

export class ResidentNotVerifiedError extends DomainError {
    constructor() {
        super('Residents must be verified before approving visits');
    }
}
