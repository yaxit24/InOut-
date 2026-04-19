import { DomainError } from './DomainError';

export class VisitNotPendingError extends DomainError {
    constructor() {
        super('only PENDING visits can be approved or denied')
    }
}
