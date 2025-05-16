"use client";

import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'; // 한국어 로케일 추가

import { fakerKO as faker } from "@faker-js/faker";
import { useRouter } from "next/navigation";

dayjs.extend(relativeTime);
dayjs.locale('ko');

export default function Room() {
  const router = useRouter();
  const user = {
    id: 'hero',
    nickname: faker.person.fullName(),
    Messages: [
      {roomId: 123, content: faker.lorem.lines(), createdAt: faker.date.between({from: '2025-05-01', to: '2025-05-15'})},
      {roomId: 123, content: faker.lorem.lines(), createdAt: faker.date.between({from: '2025-05-13', to: '2025-05-15'})},
    ],
  }
  const onClick = () => {
    router.push(`/messages/${user.Messages?.at(-1)?.roomId}`);
  }
  return (
    <div className="p-[16px] flex flex-row transition-[background-color] duration-[0.2s] border-[rgb(239,243,244)] cursor-pointer hover:bg-[rgba(0,0,0,0.03)]" onClickCapture={onClick}>      
      <div className="w-[40px] h-[40px] rounded-full mr-[16px]">
        <img src={faker.image.avatar()} alt="" className="w-[40px] h-[40px] rounded-full mr-[16px]" />
      </div>
      <div className="flex flex-col text-[#536471] text-[15px] flex-1">
        <div className="roomUserInfo">
          <b className="text-black">{user.nickname}</b>
          &nbsp;
          <span>@{user.id}</span>
          &nbsp;
          ·
          &nbsp;
          <span className="text-[rgb(83,100,113)] hover:underline">{dayjs(user.Messages?.at(-1)?.createdAt).fromNow(true)}</span>
        </div>
        <div className="roomLastChat">
          {user.Messages?.at(-1)?.content}
        </div>
      </div>
    </div>
  )
}
