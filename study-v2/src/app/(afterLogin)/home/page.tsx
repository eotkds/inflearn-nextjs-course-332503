import Tab from "@/app/(afterLogin)/home/_component/Tab";
import Post from "@/app/(afterLogin)/_component/Post";
import TabProvider from './_component/TabProvider';
import PostForm from './_component/PostForm';
import style from './home.module.css';


export default function Home() {
  return (
    <main className={style.main}>
        <TabProvider>
            <Tab/>
            <PostForm/>
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
        </TabProvider>
    </main>
  )
}