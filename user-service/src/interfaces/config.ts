export enum Config {
    //User Service
    USER_APP_PORT = 'USER_APP_PORT',
    USER_SERVICE_PORT = 'USER_SERVICE_PORT',
    USER_SERVICE_HOST = 'USER_SERVICE_HOST',
    USER_APP_CONTEXT_PATH = 'USER_APP_CONTEXT_PATH',
    JWT_PASSWORD = 'qwerty',

    // kafka Service
    KAFKA_APP_PORT = 'KAFKA_APP_PORT',
    KAFKA_SERVICE_PORT = 'KAFKA_SERVICE_PORT',
    KAFKA_APP_CONTEXT_PATH = 'KAFKA_APP_CONTEXT_PATH',
    KAFKA_SERVICE_HOST = 'KAFKA_SERVICE_HOST',
    KAFKA_CLIENT_ID = 'KAFKA_CLIENT_ID',

    // Provider Service
    CRON_APP_PORT = 'CRON_APP_PORT',
    CRON_SERVICE_PORT = 'CRON_SERVICE_PORT',
    CRON_SERVICE_HOST = 'CRON_SERVICE_HOST',
    CRON_APP_CONTEXT_PATH = 'CRON_APP_CONTEXT_PATH',

    PROTO_PATH = 'PROTO_PATH',
    // Mongo Connection URL
    MONGO_CONNECTION_URI = 'MONGO_CONNECTION_URI',

    //elastic
    ELASTIC_CONNECTION_URL = 'ELASTIC_CONNECTION_URL',

    // Redis Connection Credential
    REDIS_HOST = 'REDIS_HOST',
    REDIS_PORT = 'REDIS_PORT',
    REDIS_DB = 'REDIS_DB',

    // Kafka Connection Credential
    KAFKA_BROKER_1 = 'KAFKA_BROKER_1',
    KAFKA_BROKER_2 = 'KAFKA_BROKER_2',
    KAFKA_BROKER_3 = 'KAFKA_BROKER_3',

    ENVIRONMENT = 'ENVIRONMENT',

    // Crypto secret
    CRYPTO_SECRET = 'CRYPTO_SECRET',

    //Web Url

    BASE_WEB_URL = 'BASE_WEB_URL',

    // SMTP Credentials
    SMTP_MAIL_DRIVER = 'SMTP_MAIL_DRIVER',
    SMTP_HOST = 'SMTP_HOST',
    SMTP_PORT = 'SMTP_PORT',
    SMTP_FROM_EMAIL = 'SMTP_FROM_EMAIL',
    SMTP_MAIL_USERNAME = 'SMTP_MAIL_USERNAME',
    SMTP_MAIL_PASSWORD = 'SMTP_MAIL_PASSWORD',

    AWS_SES_HOST = 'AWS_SES_HOST',
    AWS_SES_PORT = 'AWS_SES_PORT',
    AWS_SES_FROM_EMAIL = 'AWS_SES_FROM_EMAIL',
    AWS_SES_MAIL_USERNAME = 'AWS_SES_MAIL_USERNAME',

    SES_MAIL_USERNAME = 'SES_MAIL_USERNAME',
    SES_MAIL_PASSWORD = 'SES_MAIL_PASSWORD',

    S3_ACCESS_KEY_ID = 'S3_ACCESS_KEY_ID',
    S3_SECRET_ACCESS_KEY = 'S3_SECRET_ACCESS_KEY',
    S3_BUCKET = 'S3_BUCKET',

    TWILIO_ACCOUNT_SID = 'TWILIO_ACCOUNT_SID',
    TWILIO_AUTH_TOKEN = 'TWILIO_AUTH_TOKEN',
    TWILIO_PHONE_NO = 'TWILIO_PHONE_NO',
}
