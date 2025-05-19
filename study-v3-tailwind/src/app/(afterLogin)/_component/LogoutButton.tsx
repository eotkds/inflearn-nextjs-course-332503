"use client";

export default function LogoutButton() {
    const me = { // 임시로 내 정보 있는것처럼
        id: 'eotkds',
        nickname: '오메가',
        image: '/profile_parker.jpeg',
      }
    
      const onLogout = () => {};
    
      return (
        <button className="items-center my-[12px] p-[12px] cursor-pointer border-none bg-white text-left hover:bg-[rgba(15,20,25,0.1)] rounded-[33px] xl:w-[258px] xl:h-[66px] xl:flex" onClick={onLogout}>
          <div className="flex items-center">
            <img src={me.image} alt={me.id} className="w-[40px] rounded-[50%]"/>
          </div>
          <div className="hidden mx-[12px] xl:block">
            <div className="font-bold">{me.nickname}</div>
            <div>@{me.id}</div>
          </div>
        </button>
      )
}