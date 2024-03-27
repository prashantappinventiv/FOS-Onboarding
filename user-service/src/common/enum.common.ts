export const ENUM = {
    USER: {
        STATUS: {
            ACTIVE: 1,
            INACTIVE: 2,
            DELETED: 3,
        },
    },

    NOTIFICATION: {
        ENABLE: 0,
        DISABLE: 1,
    },

    PLATFORM: { ANDROID: 0, IOS: 1, WEB: 2, ALL: 4 },

    COL: {
        USER: 'users',
    },
};

export const ENUM_ARRAY = {
    USER: {
        STATUS: Object.values(ENUM.USER.STATUS),
    },
    PLATFORM: Object.values(ENUM.PLATFORM),
};
