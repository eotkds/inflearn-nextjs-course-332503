import styles from "./home.module.css";
import TapProvider from "./_component/TapProvider";
import Tab from "./_component/Tab";
import PostForm from "./_component/PostForm";
import Post from "@/app/(afterLogin)/_component/Post";


export default function Home() {
  return (
    <main className={styles.main}>
      <TapProvider>
        <Tab />
        <PostForm />
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
      </TapProvider>
    </main>
  );
}


