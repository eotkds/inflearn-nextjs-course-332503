"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Post as IPost } from "../../../../../../model/Post";
import Post from "../../../../_component/Post";
import { getComments } from "../_lib/getComments";

export default function Comments({id}: {id: string}) {
    const queryClient = useQueryClient();
    const post = queryClient.getQueryData(["posts", id]);

    const {data, error} = useQuery<IPost[], Object, IPost[], [_1: string, _2: string, _3: string]>({
        queryKey: ["posts", id, "comments"],
        queryFn: getComments,
        staleTime: 1000 * 60, //fresh -> stale 으로 변경되는 시간
        gcTime: 1000 * 60 * 3, //stale -> 데이터가 사라지는 시간
        enabled: !!post,
    })



    if(post){
        return (
            data?.map((post) => 
                <Post key={post.postId} post={post} />)
        ) 
    }
    return null;
    
    
}
