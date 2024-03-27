/**
 * @file routes/index
 * @description exposes routing paths
 * @author  Fos Social Dev Team
 */

import { Router } from 'express';
import BaseRoute from './base.routes';
import V1UserRouteClass from '../routes/v1/user/user.routes';

class Routes extends BaseRoute {
    public path = '/api';

    constructor() {
        super();
        this.routeMiddlewares();
        this.init();
    }

    get instance(): Router {
        return this.router;
    }

    private routeMiddlewares() {
        this.router.use('/', (req, res, next) => {
            console.log('');
            console.log('*********************************REQUEST START*************************************');
            console.log(`NEW REQUEST ---> ${req.method} ${req.originalUrl}`);
            console.log('req Type=======>', req.method.toUpperCase());
            console.log('req Path=======>', req.path);
            console.log('req Params=====>', req.params);
            console.log('req Query======>', req.query);
            console.log('Authorization======>', req.headers.authorization);
            console.log('device_details============>', req.headers.devicedetails);

            console.log('********************************REQUEST ENDS******************************************');

            next();
        });
    }

    /** initializes routes */
    private init() {
        this.router.use(V1UserRouteClass.path, V1UserRouteClass.instance);
    }
}

export default new Routes();
