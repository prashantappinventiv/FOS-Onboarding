import { Schema, model } from 'mongoose';

const connectionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    connections: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    supporters: [{ type: Schema.Types.ObjectId, ref: 'User' }],

    createdAt: { type: Date, default: Date.now },
});

const Connection = model('Connection', connectionSchema);

export default Connection;
