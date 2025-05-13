import BackButton from "@/app/(afterLogin)/_component/BackButton";
import Post from "@/app/(afterLogin)/_component/Post";
import CommentForm from "./_component/CommentForm";

export default function StatusPage() {
    return (
    <div className="w-[600px] border-[rgb(239,243,244)] border-r border-l border-solid flex flex-col items-stretch">
      <div className="flex h-[53px] items-center">
        <BackButton/>
        <h3 className="text-[20px] font-bold ml-[30px]">게시하기</h3>
      </div>
      <Post />
      <CommentForm />
      <div>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
    );
}