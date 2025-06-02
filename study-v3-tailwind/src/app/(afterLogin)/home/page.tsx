import Post from "../_component/Post";
import PostForm from "./_component/PostForm";
import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";

export default function Home() {
  
  return (
    <main className="w-[600px] border-[rgb(239,243,244)] border-r border-l border-r-solid border-l-solid flex flex-col items-stretch">
      <TabProvider>
        <Tab />
        <PostForm />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </TabProvider>
    </main>
  );
}
