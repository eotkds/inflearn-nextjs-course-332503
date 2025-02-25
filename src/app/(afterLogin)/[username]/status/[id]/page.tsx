import BackButton from "@/app/(afterLogin)/_component/BackButton";
import style from "./singlePost.module.css";
import CommentForm from "./_component/CommentForm";
import SinglePost from "./_component/SinglePost";
import Comments from "./_component/Comments";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getSinglePost } from "./_lib/getSinglePost";
import { getComments } from "./_lib/getComments";

export default async function SinglePostPage({params}: {params: Promise<{id: string}>}) {
    const { id } = await params;
  
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
      queryKey: ["posts", id],
      queryFn: getSinglePost,
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
