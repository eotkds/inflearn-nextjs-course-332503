import Post from "../_component/Post";
import style from "./profile.module.css";
import { auth } from "@/auth";

export default async function ProfilePage() {

  const user = {
    id: 'd_com',
    nickname: 'dds',
    image: '/4Udwvqim.png'
  }
  const session = await auth();
  console.log(session);
  // 250129
  // 팔로우 버튼 클릭 시 팔로우 상태 변경
  // 비로그인 시 팔로우 안내 & 로그인 유도 모달(사진참조)
  // 로그인 버튼 클릭 시 /i/flow/login 모달
  // 가입하기 버튼 클릭 시 /i/flow/signup 모달
  return (
    <main className={style.main}>
    <div className={style.header}>
      {/* <BackButton /> */}
      <h3 className={style.headerTitle}>{user.nickname}</h3>
    </div>
    <div className={style.userZone}>
      <div className={style.userImage}>
        <img src={user.image} alt={user.id}/>
      </div>
      <div className={style.userName}>
        <div>{user.nickname}</div>
        <div>@{user.id}</div>
      </div>
      <button className={style.followButton}>팔로우</button>
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
