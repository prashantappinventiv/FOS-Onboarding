/**
 * @file common/responses
 * @description exposes all the responses objects
 * @author Five Star Dev Team
 */

import USER from './user.response';
export const SUCCESS = {
    DEFAULT: {
        httpCode: 200,
        statusCode: 200,
        message: 'Success',
    },
    SPORT_LIST: {
        httpCode: 200,
        statusCode: 200,
        message: 'Get allSport list successfully',
    },
    ACTIVITY_LIST: {
        httpCode: 200,
        statusCode: 200,
        message: 'Get all activity list successfully',
    },
};

export const CUSTOM_ERROR = (data?: any, message?: string) => {
    return {
        httpCode: 400,
        statusCode: 400,
        message: message ? message : 'Success',
        data: data ? data : {},
    };
};

export const commonErrorHandler = (error: any, status = 400) => {
    console.dir(error, { depth: 6 });
    if (typeof error == 'string') {
        return {
            httpCode: status,
            message: error,
            statusCode: status,
            type: 'INTERNAL_SERVER_ERROR',
        };
    }

    if (error.status) {
        return {
            httpCode: error.status,
            message: error.body || error.message,
            statusCode: error.status,
            type: 'INTERNAL_SERVER_ERROR',
        };
    }

    let body = null;
    console.log('error.name=================> errorHandling', error.name);
    console.log('error.message=================> errorHandling', error.message);
    if (error.name && error.name === 'MongooseServerSelectionError') {
        return JSON.stringify(error);
    }
    if (error.message) {
        if (error.response && error.response.data) {
            body = error.response.data.message;
        } else {
            body = error.message;
        }
    } else {
        body = error;
    }

    return {
        httpCode: error.status || status,
        message: body || 'Something went wrong, please contact administrator.',
        statusCode: error.status || status,
        type: error.name || 'INTERNAL_SERVER_ERROR',
    };
};

export const RESPONSE = {
    USER,
    commonErrorHandler,
};
