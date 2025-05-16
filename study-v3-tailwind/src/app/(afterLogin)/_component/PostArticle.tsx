"use client";
import { useRouter } from "next/navigation";

type Props = {
    children: React.ReactNode,
    post : {
        postId: number;
        content: string,
        User: {
        id: string,
        nickname: string,
        image: string,
        },
        createdAt: Date,
        Images: any[],
    }
}
export default function PostArticle({children, post}: Props) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/${post.User.id}/status/${post.postId}`);
  }
  return (
    <article onClickCapture={onClick} className="flex flex-col py-[12px] px-[16px] border-[rgb(239,243,244)] border-b border-b-solid transition-[background-color,box-shadow] duration-200 cursor-pointer hover:bg-[rgba(0,0,0,0.03)]">
        {children}
    </article>
  )
}