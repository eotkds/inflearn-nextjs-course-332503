"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getFollowingPosts } from "../_lib/getFollowingPosts";
import { Post as IPost } from "@/model/Post";
import Post from "@/app/(afterLogin)/_component/Post";

export default function FollowingPosts() {
    const {data, isPending, isError} = useSuspenseQuery<IPost[]>({
        queryKey: ["posts", "followings"],
        queryFn: getFollowingPosts,
        staleTime: 1000 * 60, //fresh -> stale 으로 변경되는 시간
        gcTime: 1000 * 60 * 3, //stale -> 데이터가 사라지는 시간
    })
    console.log(data);

    return (
        data?.map((post) => (
            <Post key={post.postId} post={post} />
        ))
    );
}
