/**
 * @file user.routes
 * @description defines routing for user routes
 * @author Five Star Dev Team
 */

import { celebrate } from 'celebrate';
import { Router, Request, Response, NextFunction } from 'express';
import BaseRoute from '../../base.routes';
// import { VALIDATION } from '@common';
import { UserController } from '../../../controllers/controller';
import { VALIDATION } from '../../../common/validation.common';
class V1UserRouteClass extends BaseRoute {
    public path: string;
    constructor(path: string) {
        super();
        this.path = path;
        this.initRoutes();
    }

    get instance(): Router {
        return this.router;
    }

    initRoutes() {
        /**
         * @description User Sign-up
         */

        this.router.post(
            '/signup',
            celebrate({
                body: {
                    name: VALIDATION.USER.NAME.trim().required(),
                    email: VALIDATION.USER.EMAIL.required(),
                    password: VALIDATION.USER.PASSWORD.required(),
                },
            }),
            // Middleware.VerifyBasicSession,
            (req: Request, res: Response, next: NextFunction) => {
                UserController.userSignUp(req, res, next);
            }
        );
    }
}
export default new V1UserRouteClass('/v1/user');
