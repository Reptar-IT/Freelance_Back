export const EmailAccountMessageTypes = {
    Account_created: 'Account_created',
    Account_updated: 'Account_updated',
    Account_Enabled: 'Account_enabled',
    Account_Not_Confirmed: 'Account_not_confirmed',
    Account_deleted: 'Account_deleted',
    Password_Reset: 'Password_reset',
}

export interface EmailTemplate {
    content: string;
    hasAuthCode: boolean;
    type: string;
    subject: string;
}

export enum EmailStatus {
    PENDING = 'PENDING',
    SENT = 'SENT',
    ERROR = 'ERROR',
}