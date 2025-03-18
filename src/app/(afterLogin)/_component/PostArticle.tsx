"use client";

import { Post } from "@/model/Post";
import style from "./post.module.css";
import { useRouter } from "next/navigation";

type Props = {
    children: React.ReactNode,
    post: Post
}

export default function PostArticle({ children, post }: Props) {

    const router = useRouter();
    const onClick = () => {
        router.push(`/${post.User.id}/status/${post.postId}`);
    }

    return (
        <article onClick={onClick} className={style.post}>
            {children}
        </article>
    );
}