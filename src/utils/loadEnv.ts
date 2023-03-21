import { config } from 'dotenv';
import { cleanEnv, port, str } from 'envalid';

const path = `.env.${process.env.NODE_ENV}`;

config();
config({ path });

const env = cleanEnv(process.env, {
    DATABASE_URL: str(),
    NODE_ENV: str({default: 'development'}),
    ORIGIN: str(),
    PORT: port(),
    DB_USER: str(),
    DB_PASSWORD: str(),
    DB_APP_NAME: str(),
    MONGODB_URI: str(),
});

export const { DATABASE_URL, NODE_ENV, ORIGIN, PORT } = env;
