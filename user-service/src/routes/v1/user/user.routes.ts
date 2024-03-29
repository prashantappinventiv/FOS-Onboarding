/**
 * @file user.routes
 * @description defines routing for user routes
 * @author Five Star Dev Team
 */

import { Joi, celebrate } from 'celebrate';
import { Router, Request, Response, NextFunction } from 'express';
import BaseRoute from '../../base.routes';
// import { VALIDATION } from '@common';
import { UserController } from '../../../controllers/controller';
import { validate } from '../../../middlewares/validation/validation';
import { VALIDATION } from '../../../middlewares/validation/joi.validation';
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
            validate.body(Joi.object(VALIDATION.USER)),
            // Middleware.VerifyBasicSession,
            (req: Request, res: Response, next: NextFunction) => {
                UserController.userSignUp(req, res, next);
            }
        );

        this.router.post('/login', (req: Request, res: Response, next: NextFunction) => {
            UserController.login(req, res, next);
        });

        this.router.post('/otp/verify', (req: Request, res: Response, next: NextFunction) => {
            UserController.verifyOtpController(req, res, next);
        });
    }
}
export default new V1UserRouteClass('/v1/user');
