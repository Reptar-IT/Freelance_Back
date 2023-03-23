import { Application } from "express";

import bidsController from './bidsController'

export default {
    name: 'Bid',
    register(app: Application) {
        const moduleBaseUrl = '/bids';

        bidsController.register(`${moduleBaseUrl}`, app)

        app.use(`${moduleBaseUrl}/*`, (_req, res) => {
            res.status(404).end();
        });
    },
};