"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserPosts } from "../_lib/getUserPosts";
import { Post as IPost } from "@/model/Post";
import Post from "@/app/(afterLogin)/_component/Post";


export default function UserPosts({username}: {username: string}) {
    return;
    const {data} = useQuery<IPost[], Object, IPost[], [_1: string, _2: string, _3: string]>({
        queryKey: ["posts", "users", username],
        queryFn: getUserPosts,
        staleTime: 1000 * 60, //fresh -> stale 으로 변경되는 시간
        gcTime: 1000 * 60 * 3, //stale -> 데이터가 사라지는 시간
    })

    const queryClient = useQueryClient();
    const user = queryClient.getQueryData(['users', username]);

    if (!user) return null;

    if (user) {
        return data?.map((post) => (
          <Post key={post.postId} post={post} />
        ))
    }
    return null;
}
