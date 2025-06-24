"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; // 한국어 로케일 추가

import Link from "next/link";
import ActionButtons from "./ActionButtons";
import PostArticle from "./PostArticle";
import PostImages from "./PostImages";
import { Post as IPost } from "@/model/Post";
type Props = {
  noImage?: boolean;
  post: IPost;
};
export default function Post({ noImage, post }: Props) {
  const target = post;

  dayjs.extend(relativeTime);
  dayjs.locale("ko");

  return (
    <PostArticle post={target}>
      <div className="flex flex-row">
        <div className="mr-[12px] w-[40px]">
          <Link href={`/${target.User.id}`} className="relative inline-block w-[40px] h-[40px] rounded-[20px]">
            <img src={target.User.image} alt={target.User.nickname} className="w-[40px] h-[40px] rounded-[20px]" />
            <div className="inline-block w-[40px] h-[40px] rounded-[20px] absolute top-0 left-0 hover:bg-[rgba(26,26,26,0.15)]" />
          </Link>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row">
            <Link href={`/${target.User.id}`}>
              <span className="font-bold hover:underline">{target.User.nickname}</span>
              &nbsp;
              <span className="text-[rgb(83,100,113)]">@{target.User.id}</span>
              &nbsp; · &nbsp;
            </Link>
            <span className="text-[rgb(83,100,113)] hover:underline">{dayjs(target.createdAt).fromNow(true)}</span>
          </div>
          <div>{target.content}</div>
          <div className="">
            <PostImages post={target} />
          </div>
          <ActionButtons />
        </div>
      </div>
    </PostArticle>
  );
}
