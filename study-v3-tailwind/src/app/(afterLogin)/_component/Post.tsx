import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'; // 한국어 로케일 추가


import Link from "next/link";
import ActionButtons from "./ActionButtons";

export default function Post() {
  const target = {
    User: {
      id: 'elonmusk',
      nickname: 'Elon Musk',
      image: '/yRsRRjGO.jpg',
    },
    content: '클론코딩 라이브로 하니 너무 힘들어요 ㅠㅠ',
    createdAt: new Date(),
    Images: [],
  }

  dayjs.extend(relativeTime);
  dayjs.locale('ko');

  return (
    <article className="flex flex-col py-[12px] px-[16px] border-[rgb(239,243,244)] border-b border-b-solid transition-[background-color,box-shadow] duration-200 cursor-pointer hover:bg-[rgba(0,0,0,0.03)]">
      <div className="flex flex-row">
        <div className="mr-[12px] w-[40px]">
          <Link href={`/${target.User.id}`} className="relative inline-block w-[40px] h-[40px] rounded-[20px]">
            <img src={target.User.image} alt={target.User.nickname} className="w-[40px] h-[40px] rounded-[20px]"/>
            <div className="inline-block w-[40px] h-[40px] rounded-[20px] absolute top-0 left-0 hover:bg-[rgba(26,26,26,0.15)]" />
          </Link>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row">
            <Link href={`/${target.User.id}`}>
              <span className="font-bold hover:underline">{target.User.nickname}</span>
              &nbsp;
              <span className="text-[rgb(83,100,113)]">@{target.User.id}</span>
              &nbsp;
              ·
              &nbsp;
            </Link>
            <span className="text-[rgb(83,100,113)] hover:underline">{dayjs(target.createdAt).fromNow(true)}</span>
          </div>
          <div>{target.content}</div>
          <div className="">

          </div>
          <ActionButtons />
        </div>
      </div>
    </article>
  )
}