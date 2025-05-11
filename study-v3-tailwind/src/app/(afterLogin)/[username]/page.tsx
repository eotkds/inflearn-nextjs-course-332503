
import Post from "@/app/(afterLogin)/_component/Post";

export default function UserPage() {
    const user = {
      id: 'eotkds',
      nickname: '오메가',
      image: '/profile_parker.jpeg'
    };
  return (
    <main className="w-[600px] border-[rgb(239,243,244)] border-r border-l border-r-solid border-l-solid flex flex-col items-stretch">
      <div className="flex h-[53px] items-center">
        {/* <BackButton /> */}
        <h3 className="text-[20px] font-bold ml-[30px]">{user.nickname}</h3>
      </div>
      <div className="flex items-center border-b border-[rgb(239,243,244)] py-[12px] px-[16px]">
        <div className="flex items-center mr-[12px] rounded-full">
          <img src={user.image} alt={user.id} className="w-[134px] rounded-full" />
        </div>
        <div className="flex-1 mx-[12px]">
          <div className="font-bold text-[20px]">{user.nickname}</div>
          <div className="text-[15px]">@{user.id}</div>
        </div>
        <button className="border border-[rgb(207,217,222)] px-[16px] rounded-[17px] h-[34px] bg-black text-[15px] text-white cursor-pointer hover:bg-[rgb(39,44,48)]">팔로우</button>
      </div>
      <div>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </main>
  );
}