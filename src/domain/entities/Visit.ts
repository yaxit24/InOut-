import { ResidentNotVerifiedError } from '../errors/ResidentNotVerifiedError';
import { VisitNotPendingError } from '../errors/VisitNotPendingError';
import { Resident } from './Resident';

export type VisitStatus = 'PENDING' | 'APPROVED' | 'DENIED' | 'CHECKED_IN' | 'CHECKED_OUT';

export class Visit {
    constructor(
        public readonly id: string,
        public readonly visitorName: string,
        public readonly visitorPhone: string,
        public status: VisitStatus,
        public readonly flatNumber: string,
        public readonly purpose: string,
        public readonly residentId: string,
        public readonly guardId: string,
        public readonly societyId: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public exitTime: Date | null = null,
    ) { }

    approve(resident: Resident) {
        if (!resident.isVerified()) throw new ResidentNotVerifiedError();
        if (this.status !== 'PENDING') throw new VisitNotPendingError();
        this.status = 'APPROVED';
    }

    deny(resident: Resident) {
        if (!resident.isVerified()) throw new ResidentNotVerifiedError();
        if (this.status !== 'PENDING') throw new VisitNotPendingError();
        this.status = 'DENIED';
    }

    recordExit() {
        this.exitTime = new Date();
    }
}

