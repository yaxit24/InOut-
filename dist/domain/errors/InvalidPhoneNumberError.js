"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidPhoneNumberError = void 0;
const DomainError_1 = require("./DomainError");
class InvalidPhoneNumberError extends DomainError_1.DomainError {
    constructor(phone) {
        super(`Invalid Phone Number: "${phone}" `);
    }
}
exports.InvalidPhoneNumberError = InvalidPhoneNumberError;
