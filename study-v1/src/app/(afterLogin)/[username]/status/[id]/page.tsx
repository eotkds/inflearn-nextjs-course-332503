import BackButton from "../../../_component/BackButton";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getSinglePost } from "./_lib/getSinglePost";
import { getComments } from "./_lib/getComments";
import { getUserServer } from "../../_lib/getUserServer";
import { getSinglePostServer } from "./_lib/getSinglePostServer";
import { Metadata, ResolvingMetadata } from "next";
import SinglePost from "./_component/SinglePost";
import CommentForm from "./_component/CommentForm";
import Comments from "./_component/Comments";

import style from "./singlePost.module.css";
import { User } from "../../../../../model/User";
import { Post } from "../../../../../model/Post";

type Props = {
  params: Promise<{id:string, username: string}>;
}

export async function generateMetadata({params}: Props, parent: ResolvingMetadata) :Promise<Metadata> {
  const{id, username} = await params;
  const [user, post] : [User, Post] = await Promise.all([
    getUserServer({queryKey: ["users", username]}),
    getSinglePostServer({queryKey: ["posts", id]})
  ])

  return {
    title: `D에서 ${user.nickname} 님 : ${post.content}`,
    description: `${post.content}`,
  }
}


export default async function SinglePostPage({params}: Props) {
    const { id } = await params;
  
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
      queryKey: ["posts", id],
      queryFn: getSinglePostServer,
    });

    await queryClient.prefetchQuery({
        queryKey: ["posts", id, "comments"],
        queryFn: getComments,
      });

    
  
    const dehydratedState = dehydrate(queryClient);
    
    return (
      <div className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <div className={style.header}>
          <BackButton/>
          <h3 className={style.headerTitle}>게시하기</h3> 
        </div>
        <SinglePost id={id} />
        <CommentForm id={id} />
        <div>
          <Comments id={id} /> 
        </div>
      </HydrationBoundary>
    </div>

    );
}
