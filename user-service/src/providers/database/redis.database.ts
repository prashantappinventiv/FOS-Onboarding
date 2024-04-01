/* eslint-disable @typescript-eslint/no-explicit-any */

import redis from 'redis';
import { Config } from '../../interfaces/config';
import { config } from '../../providers/aws/secret-manager';
import { promisify } from 'util';
import { DATABASE_CONST } from '../../common';

class Redis {
    private client: redis.RedisClient;
    // isRedisConnected: boolean = false;

    constructor() {
        try {
            // isRedisConnected = false;
            const options: redis.ClientOpts = {};
            options.db = config.get(Config.REDIS_DB);
            options.host = config.get(Config.REDIS_HOST);
            options.port = config.get(Config.REDIS_PORT);
            this.client = redis.createClient(options);

            this.client.config('set', 'notify-keyspace-events', 'KEA');

            this.client.on('error', this.onError);

            this.client.on('connect', this.onConnect);
        } catch (err) {
            console.log('not able to connect to redis-------------->', err);
        }
    }

    onConnect() {
        console.log('Successfully connected to Redis ' + Config.REDIS_HOST + ':' + Config.REDIS_PORT);
        globalThis.isRedisAvailable = true;
        console.log('globalThis.isRedisAvailable>>>>>', globalThis.isRedisAvailable);
        // globalThis.isRedisAvailable = true;
    }

    onError(error: any) {
        try {
            console.log('Error in Redis client: ' + error.message);
            console.log(error.stack);
        } catch (err) {
            console.log('inside catch errorrrrrrrrrrrrrrrrrrr=>');
        }
    }

    /**
     * @description method to insert key value in redis
     * @param key {string}
     * @param value {number}
     */
    async insertKeyInRedis(key: string, value: string | number) {
        try {
            if (!globalThis.isRedisAvailable) return undefined;
            const set = promisify(this.client.SET).bind(this.client);
            await set(key, String(value));
            return {};
        } catch (error) {
            console.error(`we have an error while inserting key and value ==> ${error}`);
            return Promise.reject(error);
        }
    }
    /**
     * @description method to get key value in redis
     * @param key {string}
     * @param value {number}
     */
    async getKeyFromRedis(key: string) {
        try {
            if (!globalThis.isRedisAvailable) return undefined;
            const get = promisify(this.client.get).bind(this.client);
            const data = await get(key);
            // console.log(`data found ==> ${data}`);
            return data;
        } catch (error) {
            console.error(`we have an error while getting key and value ==> ${error}`);
            return Promise.reject(error);
        }
    }

    /**
     * @description method to expire a key from redis after a set time in seconds
     * @param key
     * @param expireTime in seconds
     */
    async expireKey(key: string, expireTime: number) {
        try {
            if (!globalThis.isRedisAvailable) return undefined;
            const expire = promisify(this.client.expire).bind(this.client);
            const data = await expire(key, expireTime);
            console.log(data, 'expiration status');
            return {};
        } catch (error) {
            console.error(`we have an error in expire key method ==> ${error}`);
            return Promise.reject(error);
        }
    }

    /**
     * @description To save an object in redis hashmap
     * @param key name of redis hash
     * @param field  name of key in redis hash
     * @param value value to be saved against a field
     */
    async insertKeyInRedisHash(key: string, field: string, value: any) {
        try {
            if (!globalThis.isRedisAvailable) return undefined;
            const hmset = promisify(this.client.hmset).bind(this.client);
            // await hmset(key, field, value);
            console.log('key, field', key, field);
            return {};
        } catch (error) {
            console.error(`we have an error while saving object in redis ==> ${error}`);
            return Promise.reject(error);
        }
    }

    async insertSortSet(key: string, score: number, value: any) {
        try {
            if (!globalThis.isRedisAvailable) return undefined;
            const zadd = promisify(this.client.ZADD).bind(this.client);
            // await zadd(key, score, value);
            return {};
        } catch (error) {
            console.error(`we have an error while saving object in redis ==> ${error}`);
            return Promise.reject(error);
        }
    }

    /**
     * @description To get  a particular value corresponding to a key in redis hash
     * @param key   name of redis hash
     * @param field  name of key stored in a redis hash
     */

    async getKeyFromRedisHash(key: string, field: string) {
        try {
            console.log('globalThis.isRedisAvailable>>>>', globalThis.isRedisAvailable);
            if (!globalThis.isRedisAvailable) return undefined;
            const hget = promisify(this.client.hget).bind(this.client);
            return await hget(key, field);
        } catch (error) {
            // return Promise.reject(error);
            return 'testing';
        }
    }

    /**
     * gets the value of key from redis
     * @param key
     */
    async getFromKey(key: string): Promise<any> {
        if (!globalThis.isRedisAvailable) return undefined;
        return new Promise((res, rej) => {
            this.client.get(key, (err, reply) => {
                if (err) rej(err);
                else res(reply);
            });
        });
    }

    /**
     * deletes the key from redis
     * @param key
     */
    async deleteKey(key: string): Promise<any> {
        if (!globalThis.isRedisAvailable) return undefined;
        return new Promise((res, rej) => {
            this.client.del(key, (err, reply) => {
                if (err) rej(err);
                else res(reply);
            });
        });
    }

    async deleteKeyInRedisHash(hash: string, key: string) {
        try {
            if (!globalThis.isRedisAvailable) return undefined;
            const hdel = promisify(this.client.hdel).bind(this.client);
            // return await hdel(hash, key);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getUserSession(decrypt: any) {
        try {
            if (!globalThis.isRedisAvailable) throw 'Error'; //return undefined;
            let getDataFromRedis: any = await this.getKeyFromRedisHash(
                DATABASE_CONST.REDIS.KEY_NAMES.USER_SESSION,
                decrypt.userId.toString()
            );
            getDataFromRedis = JSON.parse(getDataFromRedis);
            if (getDataFromRedis && getDataFromRedis._id === decrypt.sessionId) return getDataFromRedis;
            throw 'Error';
        } catch (error) {
            // const getDataFromDB: any = await sessionV1.findOne({ _id: decrypt.sessionId });
            // if (getDataFromDB) return getDataFromDB;
            return false;
        }
    }
}

export const redisDOA = new Redis();
