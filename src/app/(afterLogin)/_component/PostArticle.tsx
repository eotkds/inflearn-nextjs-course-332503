"use client";

import style from "./post.module.css";
import { useRouter } from "next/navigation";

type Props = {
    children: React.ReactNode,
    post: {
        postId: number,
        content: string,
        createdAt: Date,
        Images: any[], // FIXME: 타입 정의
        User: {
            id: string,
            nickname: string,
            image: string,
        }
    }
}

export default function PostArticle({ children, post }: Props) {

    const router = useRouter();
    const onClick = () => {
        router.push(`/${post.User.id}/status/${post.postId}`);
    }

    return (
        <article onClickCapture={onClick} className={style.post}>
            {children}
        </article>
    );
}