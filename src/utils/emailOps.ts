import { EmailTemplate, EmailStatus} from '../types/emailTypes'
import { createAuthCode } from './authCodeManager';

interface emailQueue {
    userId: number;
    userName: string;
    authCode: string;
    email: string;
    type: string;
    subject: string;
    content: string;
    status: string;
}

function replacePlacholders(template: string, templateData): string {
    return template.replace(/\[(.*?)\]/g, function (placeHolder) {
        return templateData[placeHolder.substring(1, placeHolder.length - 1)] || `${placeHolder}`;
    });
}

async function createEmail(templateName: string, userId: number, email: string, userName: string, authCodeExpirationInMinutes: number): Promise<void> {
    const template: EmailTemplate = {
        type: 'email',
        subject: 'Topic',
        hasAuthCode: true,
        content: 'This is a test email',
    }; // TODO: replace with await template: emailTemplate = await getEmailTemplate(templateName);

    const authCode = authCodeExpirationInMinutes > 0 && template.hasAuthCode ? await createAuthCode(templateName, authCodeExpirationInMinutes, userId): '';

   const record: emailQueue = {
    userId,
    userName,
    authCode,
    email,
    type: template.type,
    subject: template.subject,
    content: template.content,
    status: EmailStatus.PENDING,
   }

   // save email to db
   // await db.update

}

export { createEmail, replacePlacholders };