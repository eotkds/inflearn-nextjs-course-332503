"use client";

import { User } from "@/model/User";

export default function FollowRecommend({ user }: { user: User }) {
  const onFollow = () => {};

  return (
    <div className="flex py-[12px] h-[66px]">
      <div className="">
        <div className="w-[40px] mr-[12px]">
          <img src={user.image} alt={user.id} className="w-[40px] h-[40px] rounded-[20px]" />
        </div>
      </div>
      <div className="flex-1">
        <div className="text-[15px] font-bold leading-[20px]">{user.nickname}</div>
        <div className="text-[rgb(83,100,113)] text-[13px] leading-[16px]">@{user.id}</div>
      </div>
      <div className="w-[76px]">
        <button
          onClick={onFollow}
          className="border-none cursor-pointer w-full text-white bg-black text-[14px] font-bold h-[32px] rounded-[16px] hover:bg-[rgb(39,44,48)]"
        >
          팔로우
        </button>
      </div>
    </div>
  );
}
