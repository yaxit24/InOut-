"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedOperationError = void 0;
const DomainError_1 = require("./DomainError");
class UnauthorizedOperationError extends DomainError_1.DomainError {
    constructor(reason) {
        super(reason ?? "Ypou are not authorised to perform this action");
    }
}
exports.UnauthorizedOperationError = UnauthorizedOperationError;
