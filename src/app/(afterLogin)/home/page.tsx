import styles from "./home.module.css";
import TapProvider from "./_component/TapProvider";
import Tab from "./_component/Tab";
import PostForm from "./_component/PostForm";
import TabDeciderSuspense from "./_component/TabDeciderSuspense";
import { Suspense } from "react";
import Loading from "./loading";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className={styles.main}>
        <TapProvider>
          <Tab />
          <PostForm me={session} />
          <Suspense fallback={<Loading />}>
            <TabDeciderSuspense />
          </Suspense>
        </TapProvider>
    </main>
  );
}


