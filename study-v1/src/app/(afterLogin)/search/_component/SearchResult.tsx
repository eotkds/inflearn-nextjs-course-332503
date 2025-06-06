"use client";

import { useQuery } from "@tanstack/react-query";
import { Post as IPost } from "../../../../model/Post";
import { getSearchResult } from "../_lib/getSearchResult";
import Post from "../../_component/Post";


type Props = {
    searchParams: {
        q: string;
        pf?: string;
        f?: string;
    }
}

export default function SearchResult({searchParams}: Props) {
    const {data} = useQuery<IPost[], Object, IPost[], [_1: string, _2: string, Props['searchParams']]>({
        queryKey: ["posts", "search", searchParams],
        queryFn: getSearchResult,
        staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
        gcTime: 300 * 1000,
      });
      console.log('search result', data);
    return (
        data?.map((post) => (
            <Post key={post.postId} post={post} />
        ))
    );
}