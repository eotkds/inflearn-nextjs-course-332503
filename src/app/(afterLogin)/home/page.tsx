import styles from "./home.module.css";
import TapProvider from "./_component/TapProvider";
import Tab from "./_component/Tab";
import PostForm from "./_component/PostForm";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getPostRecommends } from "./_lib/getPostRecommends.ts";
import TabDecider from "./_component/TabDecider";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
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


