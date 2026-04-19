"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Visit = void 0;
const ResidentNotVerifiedError_1 = require("../errors/ResidentNotVerifiedError");
const VisitNotPendingError_1 = require("../errors/VisitNotPendingError");
class Visit {
    constructor(id, visitorName, visitorPhone, status, flatNumber, purpose, residentId, guardId, societyId, createdAt, updatedAt, exitTime = null) {
        this.id = id;
        this.visitorName = visitorName;
        this.visitorPhone = visitorPhone;
        this.status = status;
        this.flatNumber = flatNumber;
        this.purpose = purpose;
        this.residentId = residentId;
        this.guardId = guardId;
        this.societyId = societyId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.exitTime = exitTime;
    }
    approve(resident) {
        if (!resident.isVerified())
            throw new ResidentNotVerifiedError_1.ResidentNotVerifiedError();
        if (this.status !== 'PENDING')
            throw new VisitNotPendingError_1.VisitNotPendingError();
        this.status = 'APPROVED';
    }
    deny(resident) {
        if (!resident.isVerified())
            throw new ResidentNotVerifiedError_1.ResidentNotVerifiedError();
        if (this.status !== 'PENDING')
            throw new VisitNotPendingError_1.VisitNotPendingError();
        this.status = 'DENIED';
    }
    recordExit() {
        this.exitTime = new Date();
    }
}
exports.Visit = Visit;
