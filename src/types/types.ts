export interface Offer {
    jobId: number;
    description: string;
    status: string;
    creator: User;
}

export interface Task {
    jobId: number;
    description?: string;
    price: number;
    status: boolean;
    creator: User;
    solutionProvider: User;
}

export interface Summary {
    strongCommunicationSkills: boolean;
    punctual: boolean;
    integrity: boolean;
    courteous: boolean;
    deliverAsAgreed: boolean; // (auto-filled)
    jobId: number; //(auto-filled)
    jobTitle?: string; // dev job title (auto-filled)
    jobDescription: string; // short title (auto-filled)
    jobDetail: string; // detailed description (auto-filled)
    jobMilestones: string; // string list of all sub-task and description formatted (auto-filled)
    jobCompensation: string; // (auto-filled)
    employer: User; // (auto-filled)
    employerName: string; // first and last name or org name
    employerUrl?: string; // website or social profile eg. linkedIn (auto-filled)
    employerType: string; // organization or indiviual (auto-filled)
    employerComment?: string;
    worker: User; // (auto-filled)
    workerName: string; // first and last name or org name
    workerType: string; //independent contractor (auto-filled) or organization
    workerUrl?: string; // website or social profile eg. linkedIn (auto-filled)
    workerComment?: string;
    issuingEntityName: string; // (auto-filled)
    issuingEnitiyWalletAddrId: string; // (auto-filled)
    issuingEntityUrl: string; // (auto-filled)
    issueDate: string // time of creation
}

export interface User {
    walletAddr: string;
}

export interface UserProfile {
    walletAddr: string;
    name: string; // first and last name or org name
    Url?: string; // website or social profile eg. linkedIn (auto-filled)
    entityType: string; // organization or indiviual (auto-filled)
}

export interface Project {
    workType: string;
    title: string;
    description: string;
    budget: string;
    skills: string[];
    status: string;
    bids?: Offer[];
    milestones?: Task[];
    end: string;
    review?: Summary;
    solutionProvider?: string;
    creator: string;
}