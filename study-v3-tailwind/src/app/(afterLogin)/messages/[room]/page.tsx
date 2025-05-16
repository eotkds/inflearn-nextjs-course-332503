import { fakerKO as faker } from "@faker-js/faker";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import Link from "next/link";
import dayjs from "dayjs";
import 'dayjs/locale/ko';
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale('ko');

export default function ChatRoom() {
    const user = {
        id: 'hero',
        nickname: '영웅',
        image: faker.image.avatar(),
    };
    const messages = [
        {messageId: 1, roomId: 123, id: 'eotkds',  content: '안녕하세요.', createdAt: faker.date.between({from: '2025-05-01', to: '2025-05-07'})},
        {messageId: 2, roomId: 123, id: 'hero', content: '안녕히가세요.', createdAt: faker.date.between({from: '2025-05-08', to: '2025-05-10'})},
      ];
    return (
        <main className="w-[600px] min-h-[100dvh] border-[rgb(239,243,244)] border-r border-l border-solid flex flex-col items-stretch px-[16px]">
          <div className="h-[54px] flex items-center">
            <BackButton />
            <div><h2 className="ml-[40px] text-[20px]">{user.nickname}</h2></div>
        </div>
        <Link href={user.nickname} className="p-[20px_16px_60px] flex items-center flex-col transition-[background-color] duration-[0.2s] border-[rgb(239,243,244)] cursor-pointer border-b mb-[20px] hover:bg-[rgba(0,0,0,0.03)]">
            <img src={user.image} alt={user.id} className="w-[64px] h-[64px] rounded-full" />
            <div><b>{user.nickname}</b></div>
            <div>@{user.id}</div>
        </Link>
        <div className="flex-1 px-[16px] overflow-y-auto">
        {messages.map((m) => {
            if (m.id === 'eotkds') { // 내 메시지면
            return (
                <div
                key={m.messageId}
                className="pb-[24px] flex flex-col items-end">
                    <div className="leading-[20px] p-[12px_16px] text-[15px] bg-[#0083eb] text-white rounded-t-[22px] rounded-bl-[22px] ">{m.content}</div>
                    <div className="mt-[8px] text-[#536471] text-[13px]">{dayjs(m.createdAt).format('YYYY년 MM월 DD일 A HH시 mm분')}</div>
                </div>
            );
            }
            return (
            <div
                key={m.messageId}
                className="pb-[24px] flex flex-col items-start">
                <div className="leading-[20px] p-[12px_16px] text-[15px] bg-[#eff3f4] text-black rounded-t-[22px] rounded-br-[22px]">{m.content}</div>
                <div className="mt-[8px] text-[#536471] text-[13px]">{dayjs(m.createdAt).format('YYYY년 MM월 DD일 A HH시 mm분')}</div>
            </div>
            );
        })}
        </div>
    </main>
    )
}