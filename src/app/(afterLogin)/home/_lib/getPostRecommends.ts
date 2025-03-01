export async function getPostRecommends({ pageParam }: { pageParam: number }) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/postRecommends?cursor=${pageParam}`,
        {
            next: {
                tags: ["posts", "recommends"],
                revalidate: 1000 * 60 * 5,
            },
            cache: "no-store",
            // next15 버전 에서 no-store 가 default 값
            // force-cache 가 하는 경우에는 revalidate 가 있어야 함
            // 반대로 revalidate 만 있는 경우에는 error 가 발생함
        }
    );
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}
