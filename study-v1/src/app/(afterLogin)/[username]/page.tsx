import { QueryClient } from "@tanstack/react-query";
import { getUserServer } from "./_lib/getUserServer";
import { auth } from "../../../auth";
import UserPosts from "./_component/UserPosts";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getUserPosts } from "./_lib/getUserPosts";
import UserInfo from "./_component/UserInfo";
import style from "./profile.module.css";
import { ResolvingMetadata } from "next";
import { Metadata } from "next";
import { User } from "../../../model/User";


type Props = {
  params : Promise<{username: string}>;
}


export async function generateMetadata({params}: Props, parent: ResolvingMetadata) :Promise<Metadata> {
  const{username} = await params;
  const user:User = await getUserServer({queryKey: ["users", username]});

  return {
    title: `${user.nickname} (${user.id}) / D`,
    description: `${user.nickname} (${user.id}) 프로필 페이지입니다.`,
  }
}


export default async function ProfilePage({ params }: Props){
  const { username } = await params;
  const session = await auth();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["users", username],
    queryFn: getUserServer,
  });


  await queryClient.prefetchQuery({
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
  });

  const dehydratedState = dehydrate(queryClient);

  // 250129
  // 팔로우 버튼 클릭 시 팔로우 상태 변경
  // 비로그인 시 팔로우 안내 & 로그인 유도 모달(사진참조)
  // 로그인 버튼 클릭 시 /i/flow/login 모달
  // 가입하기 버튼 클릭 시 /i/flow/signup 모달
  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
    <UserInfo username={username} session={session} />
    <div>
      <UserPosts username={username} />
    </div>
    </HydrationBoundary>
  </main>
  );

}
