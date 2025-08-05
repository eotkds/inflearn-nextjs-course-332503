"use client";

import Post from "@/app/(afterLogin)/_component/Post";
import { useQuery } from "@tanstack/react-query";
import { getSearchResult } from "../_lib/getSearchResult";
import { Post as IPost } from "@/model/Post";

type Props = {
  searchParams: { q: string; pf?: string; f?: string };
};

export default function SearchResult({ searchParams }: Props) {
  const { data } = useQuery<IPost[], object, IPost[], [_1: string, _2: string, Props["searchParams"]]>({
    queryKey: ["posts", "search", searchParams],
    queryFn: getSearchResult,
    staleTime: 1000 * 60 * 1,
    gcTime: 1000 * 60 * 5,
  });

  return data?.map((post) => <Post key={post.postId} post={post} />);
}
