import { Application } from "express";

import testsController from './testsController'

export default {
    name: 'Test',
    register(app: Application) {
        const moduleBaseUrl = '/tests';

        testsController.register(`${moduleBaseUrl}/test`, app)

        app.use(`${moduleBaseUrl}/*`, (_req, res) => {
            res.status(404).end();
        });
    },
};