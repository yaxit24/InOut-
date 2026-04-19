"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitNotPendingError = void 0;
const DomainError_1 = require("./DomainError");
class VisitNotPendingError extends DomainError_1.DomainError {
    constructor() {
        super('only PENDING visits can be approved or denied');
    }
}
exports.VisitNotPendingError = VisitNotPendingError;
