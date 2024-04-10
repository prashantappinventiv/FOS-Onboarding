import { NextFunction, Request, Response } from 'express';
import { utils } from '../../providers/utils/utils';
import { AcceptAny } from '../../interfaces/types';

class Validation {
    /**
     * @description Validate Body of Incoming Request
     * @param schema
     * @returns
     */
    body = (schema: AcceptAny) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            const { error } = schema.validate(req.body);
            if (error) {
                const err = utils.response.errorResponse(res, {
                    message: error?.message || error?.details[0]?.message,
                });
                return res.status(err.code).send(err);
            }
            next();
        };
    };
}
export const validate = new Validation();
