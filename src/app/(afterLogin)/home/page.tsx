import styles from "./home.module.css";
import TapProvider from "./_component/TapProvider";
import Tab from "./_component/Tab";
import PostForm from "./_component/PostForm";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getPostRecommends } from "./_lib/getPostRecommends";
import TabDecider from "./_component/TabDecider";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0, // cursor 초기값
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={styles.main}>
      <HydrationBoundary state={dehydratedState}>
        <TapProvider>
          <Tab />
          <PostForm />
          <TabDecider />
        </TapProvider>
      </HydrationBoundary>
    </main>
  );
}


