export async function getFollowRecommends() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/followRecommends`, {
    next: {
      tags: ["users", "followRecommends"],
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch follow recommends");
  }
  const data = await res.json();
  return data;
}
