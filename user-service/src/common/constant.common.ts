/**
 * @file constant.common
 * @description defines constants for the application
 * @author FOS_SOCIAL_MEDIA Dev Team
 */

export const CONSTANT = {
    BYPASS_OTP: '1234',
    PASSWORD_HASH_SALT: 'JBDuwwuhd232QYWBXSKHCNKWBwgyew87635',
    BASIC_PASSWORD: 'Xzys%{JN^w9AsC',
    BASIC_USERNAME: 'FOS_SOCIAL_MEDIA',
};

export const ENVIRONMENT = {
    PRODUCTION: `prod`,
    PREPROD: `pre-prod`,
    DEVELOPMENT: `development`,
    STAGING: 'staging',
    QA: 'qa',
    DEFAULT: 'default',
    ORASES: 'orases',
};

export const DATABASE_CONST = {
    REDIS: {
        OTP_EXPIRY_TIME: 5 * 60,
        KEY_NAMES: {
            USER_MAP: 'user-map',
            IP: 'ip',
            DISCONNECT: 'DISCONNECT',
            DEVICE_TOKEN_HASH: 'session',
            OTP_HASH: 'phone-otp',
            EMAIL_OTP_HASH: 'email-otp',
            COUNT: 1,
            APP_CONFIG: 'app-config',
            USER_SESSION: 'USER_SESSION',
            STATIC_CONTENT: 'staticContent',
            FAQ_QUESTIONS: 'faqQuestions',
            REEL: 'REEL',
        },
        EMAIL_EXPIRY_TIME: 30 * 60,
    },
    TTL: {
        OTP_EXPIRE_TIME: 30 * 60 * 1000,
        ONE_DAY: 86400,
    },
};
