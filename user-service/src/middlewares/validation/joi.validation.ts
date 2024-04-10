/**
 * @file common/validations
 * @description exposes all the validation objects
 * @author FOS Social-Networking Dev Team
 */

import { Joi } from 'celebrate';
import { ENUM } from '../../common/enum.common';
export const VALIDATION = {
    USER: {
        user_name: Joi.string().min(3).max(40).required(),
        email: Joi.string().trim().email().max(100).required(),
        password: Joi.string().min(8).max(20).required(),
        role: Joi.string()
            .valid(...Object.values(ENUM.ROLE))
            .required(),
    },
};
