import { User } from "@auth/core/types";
import { PostImage } from "./PostImage";

export interface Post {
    postId: number;
    User: User;
    content: string;
    createdAt: Date;
    Images: PostImage[];
}
