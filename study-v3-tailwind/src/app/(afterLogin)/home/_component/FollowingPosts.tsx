"use client";
import { useQuery } from "@tanstack/react-query";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { getFollowingPosts } from "../_lib/getFollowingPosts";

export default function FollowingPosts() {
  const { data, isPending, error } = useQuery<IPost[]>({
    queryKey: ["posts", "following"],
    queryFn: getFollowingPosts,
    staleTime: 1000 * 60 * 1,
    gcTime: 1000 * 60 * 1,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return data?.map((post) => <Post key={post.postId} post={post} />);
}
