import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['video', 'tag', 'post'], required: true },
    content: { type: String, required: true },
    videoUrl: { type: String },
    tags: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
});

const Post = model('Post', postSchema);

export default Post;
