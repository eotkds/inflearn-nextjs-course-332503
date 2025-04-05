
import TabDecider from "./TabDecider";
import { QueryClient } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import { dehydrate } from "@tanstack/react-query";
import { getPostRecommends } from "../_lib/getPostRecommends";

export default async function TabDeciderSuspense() {

    const queryClient = new QueryClient();

    await queryClient.prefetchInfiniteQuery({
      queryKey: ["posts", "recommends"],
      queryFn: getPostRecommends,
      initialPageParam: 0, // cursor 초기값
    });
  
    const dehydratedState = dehydrate(queryClient);

    return (
      <HydrationBoundary state={dehydratedState}>
            <TabDecider />
      </HydrationBoundary>
    )

}