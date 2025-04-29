import style from './home.module.css';
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import Post from "@/app/(afterLogin)/_component/Post";
import TabProvider from './_component/TabProvider';

export default function Home() {
  return (
    <main className={style.main}>
        <TabProvider>
            <Tab/>
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