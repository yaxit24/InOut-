import {DomainError} from './DomainError';

export class UnauthorizedOperationError extends DomainError {
    constructor(reason? : string){
        super(reason ?? "Ypou are not authorised to perform this action")
    }
}
