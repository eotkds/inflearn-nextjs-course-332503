export async function getFollowingPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/followingPosts`, {
    next: {
      tags: ["posts", "following"],
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data = await res.json();
  return data;
}
