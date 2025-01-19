'use client';

import style from "./logoutButton.module.css";

export default function LogoutButton() {

    const me = { // 임시로 내 정보 있는것처럼
        id: 'd_com',
        nickname: 'dds',
        image: '/4Udwvqim.png',
      }

    const onLogout = () => {
        console.log('logout');
    };

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
