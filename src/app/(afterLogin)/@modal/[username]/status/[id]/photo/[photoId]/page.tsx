import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import SinglePost from "@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost";
import style from "./photoModal.module.css";
import PhotoModalCloseButton from "./_component/PhotoModalCloseButton";
import { getComments } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments";
import { getSinglePost } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Comments from "@/app/(afterLogin)/[username]/status/[id]/_component/Comments";
import ImageZone from "./_component/ImageZone";

type Props = {
  params: Promise<{
    username: string;
    id: string;
    photoId: string;
  }>
}

export default async function PhotoModal({params}: Props) {
   const {id} = await params;

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
    <div className={style.container}>
      <HydrationBoundary state={dehydratedState}>
        <PhotoModalCloseButton />
        <ImageZone id={id} />
        <div className={style.commentZone}>
          <SinglePost id={id} noImage/>
          <CommentForm id={id} />
          <Comments id={id} /> 
        </div>
      </HydrationBoundary>
    </div>
    )
}