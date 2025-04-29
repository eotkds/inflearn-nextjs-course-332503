"use client"

import style from "./logoutButton.module.css";

export default function LogoutButton() {
  const me = { // 임시로 내 정보 있는것처럼
    id: 'eotkds',
    nickname: '먹상',
    image: '/profile_parker.jpeg',
  }

  const onLogout = () => {};

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.image} alt={me.id}/>
      </div>
      <div className={style.logOutUserName}>
        <div>{me.nickname}</div>
        <div>@{me.id}</div>
      </div>
    </button>
  )
}