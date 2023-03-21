import express from 'express';
import { Appmodule } from '../types/appTypes';

export default function createApp(DATABASE_URL: string, NODE_ENV: string, PORT: number, modules: Appmodule[]) {
    console.log(`ENV                     : ${NODE_ENV}`);
    console.log(`DATABASE_URL            : ${DATABASE_URL.split('@').pop()}`);
    console.log(`Port                    : ${PORT}`);
    console.log('creating express app');

    const app = express();
    
    app.use(express.json());

    app.locals.env = {
        PORT
    };

    modules.length > 0 && modules.forEach((appModule: Appmodule) => {
        console.log(`registering ${appModule.name} appModule`);
        appModule.register(app);
    });

    app.use((error: any, _req: any, res: any, _next: any) => {
        const { statusCode, type, message, errors } = error;

        if (errors) {
            res.status(400).send({ errors: [{ message }], message });
        } else if (type === 'entity.parse.failed') {
            console.error('error', error);
            res.status(400).send({ message: 'Invalid payload' });
        } else {
            console.error('error', error);
            res.status(statusCode || 500).send({ message: 'Unkown server error' });
        }
    });

    function listen() {
        return new Promise(resolve => {
            app.listen(PORT, () => {
                resolve('');
                console.log(`listening: http://localhost:${PORT} (${NODE_ENV})`);
            });
        });
    }

    function getServer() {
        return app;
    }

    return {
        listen,
        getServer,
    }
}