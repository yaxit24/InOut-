"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResidentNotVerifiedError = void 0;
const DomainError_1 = require("./DomainError");
class ResidentNotVerifiedError extends DomainError_1.DomainError {
    constructor() {
        super('Residents must be verified before approving visits');
    }
}
exports.ResidentNotVerifiedError = ResidentNotVerifiedError;
