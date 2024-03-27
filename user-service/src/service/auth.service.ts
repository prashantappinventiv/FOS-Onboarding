/**
 * @file services/auth
 * @description defines authentication methods
 * @author Fos Dev Team
 */

import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { Config } from '../interfaces/config';
import { CONSTANT } from '../common/constant.common';

export const Auth = {
    /** generates a new JWT token */

    generateUserToken: function (params: { type: string; object: string | object }) {
        try {
            if (params.type === 'USER_SIGNUP' || params.type === 'USER_LOGIN') {
                return jwt.sign(params.object, Config.JWT_PASSWORD, { algorithm: 'HS256', expiresIn: '180d' });
            } else if (params.type === 'FORGOT_PASSWORD') {
                return jwt.sign(params.object, Config.JWT_PASSWORD, { algorithm: 'HS256', expiresIn: '10m' });
            } else if (params.type === 'VERIFY_EMAIL') {
                return jwt.sign(params.object, Config.JWT_PASSWORD, { algorithm: 'HS256' });
            } else if (params.type === 'OTP') {
                return jwt.sign(params.object, Config.JWT_PASSWORD, { algorithm: 'HS256', expiresIn: '5m' });
            } else {
                return true;
            }
        } catch (error) {
            throw error;
        }
    },
    /** verifies the authenticity of the JWT token */
    verifyToken(token: string): IApp.Entity<any> {
        try {
            const payload = jwt.verify(token, Config.JWT_PASSWORD, { algorithms: ['HS256'] });
            if (payload) {
                return { success: true, data: payload };
            } else return { success: false };
        } catch (error) {
            throw error;
        }
    },

    /** generates JWT token for admin session id */
    generateAdminJWT: function (sessionId: string, adminId: string, role: number): string {
        try {
            return jwt.sign(
                {
                    sessionId: sessionId,
                    adminId: adminId,
                    role: role,
                    timestamp: Date.now(),
                },
                Config.JWT_PASSWORD,
                { algorithm: 'HS256' }
            );
        } catch (error) {
            throw error;
        }
    },

    /** generates hashed data string */
    hashData: function (data: string, salt?: string): string {
        try {
            if (!salt) {
                salt = CONSTANT.PASSWORD_HASH_SALT;
            }
            return crypto.createHmac('sha256', salt).update(data).digest('hex');
        } catch (error) {
            throw error;
        }
    },
};
