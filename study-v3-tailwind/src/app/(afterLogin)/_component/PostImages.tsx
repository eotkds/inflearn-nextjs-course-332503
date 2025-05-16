import Link from "next/link";

type Props = {
    post : {
        postId: number;
        content: string,
        User: {
        id: string,
        nickname: string,
        image: string,
        },
        createdAt: Date,
        Images: any[],
    }
}
export default function PostImages({post}: Props) {
    if(!post.Images) return null;
    if(!post.Images.length) return null;
    if(post.Images.length === 1) {
        return (
                <Link href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`} className={`inline-block mt-[12px] w-full rounded-[16px] max-h-[510px] bg-no-repeat bg-cover`} style={{backgroundImage: `url(${post.Images[0].link})`}}>
                  <img src={post.Images[0].link} alt="" className="rounded-[16px] max-h-[510px] w-full hidden"/>
                </Link>
        );
    }
    if(post.Images.length === 2) {
        return (
            <div className="mt-[12px] w-full rounded-[16px] h-[290px] flex flex-row gap-2">
                <Link href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`} className="bg-no-repeat bg-cover flex-1 rounded-l-[16px] " style={{backgroundImage: `url(${post.Images[0].link})`}}>
                </Link>
                <Link href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[1].imageId}`} className="bg-no-repeat bg-cover flex-1 rounded-r-[16px] " style={{backgroundImage: `url(${post.Images[1].link})`}}>
                </Link>
            </div>
        );
    }
    if(post.Images.length === 3) {
        return (
            <div className="mt-[12px] w-full rounded-[16px] h-[290px] flex flex-row gap-2">
                <Link href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`} className="bg-no-repeat bg-cover flex-1 rounded-l-[16px] " style={{backgroundImage: `url(${post.Images[0].link})`}}>
                </Link>
                <div className="flex-1 flex flex-col gap-2">
                    <Link href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[1].imageId}`} className="bg-no-repeat bg-cover flex-1 rounded-tr-[16px] " style={{backgroundImage: `url(${post.Images[1].link})`}}>
                    </Link>
                    <Link href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[2].imageId}`} className="bg-no-repeat bg-cover flex-1 rounded-br-[16px] " style={{backgroundImage: `url(${post.Images[2].link})`}}>
                    </Link>
                </div>
            </div>
        );
    }
    if(post.Images.length === 4) {
        return (
            <div className="mt-[12px] w-full rounded-[16px] h-[290px] grid grid-cols-2 grid-rows-2 gap-2">
                <Link href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`} className="bg-no-repeat bg-cover rounded-tl-[16px] " style={{backgroundImage: `url(${post.Images[0].link})`}}>
                </Link>
                <Link href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[1].imageId}`} className="bg-no-repeat bg-cover rounded-tr-[16px] " style={{backgroundImage: `url(${post.Images[1].link})`}}>
                </Link>
                <Link href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[2].imageId}`} className="bg-no-repeat bg-cover rounded-bl-[16px] " style={{backgroundImage: `url(${post.Images[2].link})`}}>
                </Link>
                <Link href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[3].imageId}`} className="bg-no-repeat bg-cover rounded-br-[16px] " style={{backgroundImage: `url(${post.Images[3].link})`}}>
                </Link>

            </div>
        );
    }
    return null;
}