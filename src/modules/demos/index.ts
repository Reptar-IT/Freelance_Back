import { Application } from "express";
import demosController from './demosController'

export default {
    name: 'Demo',
    register(app: Application) {
        const moduleBaseUrl = '/demos';

        demosController.register(`${moduleBaseUrl}`, app)

        app.use(`${moduleBaseUrl}/*`, (_req, res) => {
            res.status(404).end();
        });
    },
};
