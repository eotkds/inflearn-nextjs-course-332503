export async function getPostRecommends() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/postRecommends`, {
    next: {
      tags: ["posts", "recommends"],
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data = await res.json();
  return data;
}
