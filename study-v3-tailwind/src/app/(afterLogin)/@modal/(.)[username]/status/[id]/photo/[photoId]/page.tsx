import Post from "@/app/(afterLogin)/_component/Post";
import ImageZone from "./_component/ImageZone";
import PhotoModalCloseButton from "./_component/PhotoModalCloseButton";
import CommentForm from "@/app/(afterLogin)/_component/CommentForm";


export default function PhotoModal() {
    return (
        <div className="bg-[rgba(0,0,0,0.95)] fixed z-10 left-0 top-0 w-[100dvw] h-[100dvh] flex flex-row">
            <PhotoModalCloseButton />
            <ImageZone />
            <div className="w-[350px] bg-white border-l border-[rgb(239,243,244)] overflow-auto">
                <Post noImage />
                <CommentForm />
                {/* <Comments /> */}
            </div>
        </div>
    )
}