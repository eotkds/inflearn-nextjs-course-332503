"use client";

import style from "../message.module.css";
import { faker } from "@faker-js/faker";
import { useRouter } from "next/navigation";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export default function Room() {

  const user = {
    id:'hero',
    nickname: '히어로',
    Message: [
        {roomId: 123, content: '안녕하세요', createdAt: new Date()},
        {roomId: 123, content: '안녕히 가세요', createdAt: new Date()},
    ]
  }

  const router = useRouter();
  const onClick = () => {
    router.push(`/messages/${user.Message.at(-1)?.roomId}`);
  }

  return (
    <div className={style.room} onClickCapture={onClick}>
        <div className={style.roomUserImage}>
            <img src={faker.image.avatar()} alt="" />
        </div>
        <div className={style.roomChatInfo}>
            <div className={style.roomChatInfoUser}>
                <b>{user.nickname}</b>
                &nbsp;
                <span>@{user.id}</span>
                &nbsp;
                .
                &nbsp;
                <span className={style.postDate}>
                    {dayjs(user.Message[0].createdAt).fromNow(true)}
                </span>
            </div>
            <div className={style.roomLastChat}>
                {user.Message?.at(-1)?.content}
            </div>
        </div>
    </div>
  );
}
