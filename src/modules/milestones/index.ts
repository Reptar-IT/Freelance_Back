import { Application } from "express";

import milestonesController from './milestonesController'

export default {
    name: 'Milestone',
    register(app: Application) {
        const moduleBaseUrl = '/milestones';

        milestonesController.register(`${moduleBaseUrl}`, app)

        app.use(`${moduleBaseUrl}/*`, (_req, res) => {
            res.status(404).end();
        });
    },
};