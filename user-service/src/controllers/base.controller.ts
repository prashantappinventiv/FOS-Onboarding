import { Response } from 'express';

export default class BaseClass {
    /** dispatches response from the server */
    async sendResponse(r: Response, b: IApp.Dispatcher | any, d: IApp.DataKeys = {}) {
        b.data = d;
        r.status(b.httpCode).json(b);
    }

    async sendResponseNull(r: Response, b: IApp.Dispatcher | any, d: any) {
        b.data = d;
        r.status(b.httpCode).json(b);
    }
}
