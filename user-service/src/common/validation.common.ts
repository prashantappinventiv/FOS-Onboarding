/**
 * @file common/validations
 * @description exposes all the validation objects
 * @author FOS Social-Networking Dev Team
 */

import { Joi } from 'celebrate';
export const VALIDATION = {
    USER: {
        NAME: Joi.string().min(3).max(40),
        EMAIL: Joi.string().trim().email().max(40),
        PASSWORD: Joi.string().min(8).max(15),
    },
};
