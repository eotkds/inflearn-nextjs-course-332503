import { User } from "@auth/core/types";
import { PostImage } from "./PostImage";

interface UserId {
    userId: string;
}

export interface Post {
    postId: number;
    User: User;
    content: string;
    createdAt: Date;
    Images: PostImage[];
    Hearts: UserId[];
    Reposts: UserId[];
    Comments: UserId[];
    _count: {
        Hearts: number;
        Reposts: number;
        Comments: number;
    };
}
