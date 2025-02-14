"use client";

import { useQuery } from "@tanstack/react-query";
import { getPostRecommends } from "../_lib/getPostRecommends";
import { Post as IPost } from "@/model/Post";
import Post from "@/app/(afterLogin)/_component/Post";


export default function PostRecommends() {
    const {data} = useQuery<IPost[]>({
        queryKey: ["posts", "recommends"],
        queryFn: getPostRecommends,
        staleTime: 1000 * 60, //fresh -> stale 으로 변경되는 시간
        gcTime: 1000 * 60 * 3, //stale -> 데이터가 사라지는 시간
    })
    return (
        data?.map((post) => (
            <Post key={post.postId} post={post} />
        ))
    );
}
