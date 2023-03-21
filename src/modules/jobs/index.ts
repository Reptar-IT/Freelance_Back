import { Application } from "express";

import jobsController from './jobsController'

export default {
    name: 'Job',
    register(app: Application) {
        const moduleBaseUrl = '/jobs';

        jobsController.register(`${moduleBaseUrl}/job`, app)

        app.use(`${moduleBaseUrl}/*`, (_req, res) => {
            res.status(404).end();
        });
    },
};