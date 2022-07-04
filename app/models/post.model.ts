import { Schema, model, connect } from 'mongoose';

interface IPost {
    posterId: string;
    message: string;
    picture?: string;
    video?: string;
    likers?: [string];
    comments?: [{
        commenterId: String,
        commenterPseudo: String,
        text: String,
        timestamp: Number,
    }];
}

const PostSchema = new Schema<IPost>(
    {
        posterId: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            trim: true,
            maxlength: 500,
        },
        picture: {
            type: String,
        },
        video: {
            type: String,
        },
        likers: {
            type: [String],
            required: true,
        },
        comments: {
            type: [
            {
                commenterId: String,
                commenterPseudo: String,
                text: String,
                timestamp: Number,
            },
            ],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const PostModel = model<IPost>('post', PostSchema);
