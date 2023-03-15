import { Application } from 'express';

export interface Appmodule {
    name: string;
    register: (app: Application) => void;
}