"use client";

export default function LogoutButton() {
    const me = { // 임시로 내 정보 있는것처럼
        id: 'eotkds',
        nickname: '오메가',
        image: '/profile_parker.jpeg',
      }
    
      const onLogout = () => {};
    
      return (
        <button className="w-[258px] h-[66px] p-[12px] flex items-center my-[12px] cursor-pointer border-none bg-white text-left hover:bg-[rgba(15,20,25,0.1)] rounded-[33px]" onClick={onLogout}>
          <div className="flex items-center">
            <img src={me.image} alt={me.id} className="w-[40px] rounded-[50%]"/>
          </div>
          <div className="mx-[12px]">
            <div className="font-bold">{me.nickname}</div>
            <div>@{me.id}</div>
          </div>
        </button>
      )
}