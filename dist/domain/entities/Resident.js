"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resident = void 0;
class Resident {
    constructor(id, name, phone, status, flatNumber, societyId) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.status = status;
        this.flatNumber = flatNumber;
        this.societyId = societyId;
    }
    isVerified() {
        return this.status === 'VERIFIED';
    }
}
exports.Resident = Resident;
