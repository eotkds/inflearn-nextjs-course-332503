import styles from "./home.module.css";
import TapProvider from "./_component/TapProvider";
import Tab from "./_component/Tab";
import PostForm from "./_component/PostForm";
import TabDeciderSuspense from "./_component/TabDeciderSuspense";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Home() {


  return (
    <main className={styles.main}>
        <TapProvider>
          <Tab />
          <PostForm />
          <Suspense fallback={<Loading />}>
            <TabDeciderSuspense />
          </Suspense>
        </TapProvider>
    </main>
  );
}


