function getLinuxTimeInSeconds() {
    return Math.floor(Date.now() / 1000);
}

async function createAuthCode(type: string, maxAgeInMinutes: number, userId: number): Promise<string> {
    const maxAge = getLinuxTimeInSeconds() + maxAgeInMinutes * 60;
    const authCode = Math.floor(100000 + Math.random() * 900000).toString();

    const record = { type, maxAge, userId, authCode };

    // Create record 
    // createdRecord = new Record(record);

    return 'noCodeCreated'; // return createdRecord;
}

export { createAuthCode };