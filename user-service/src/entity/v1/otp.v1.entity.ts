import { Model } from 'mongoose';
import BaseEntity from '../base-mongo.entity';
import otpModel from '../../models/otp.model';

class OtpEntity extends BaseEntity {
    constructor(model: Model<any>) {
        super(model);
    }

    async saveData<Type>(data: Type) {
        try {
            return await new this.model(data).save();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * @description updates document
     * @param condition
     * @param payload
     * @param options
     */

    async updateDocument<T>(condition: IApp.DataKeys, payload: IApp.DataKeys, options: any = {}): Promise<T> {
        const data: any = await this.model.findOneAndUpdate(condition, { $set: payload }, options).lean().exec();
        return data;
    }
}
export const OtpV1 = new OtpEntity(otpModel);
