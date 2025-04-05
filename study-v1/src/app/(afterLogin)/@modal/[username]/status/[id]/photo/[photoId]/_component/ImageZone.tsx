"use client";

import style from "../photoModal.module.css"
import ActionButtons from "../../../../../../../_component/ActionButtons";
import { useQuery } from "@tanstack/react-query";
import { getSinglePost } from "../../../../../../../[username]/status/[id]/_lib/getSinglePost";
import { Post as IPost } from "../../../../../../../../../model/Post";

export default function ImageZone({id} : {id:string}) {

    const {data: post} = useQuery<IPost, Object, IPost, [_1: string, _2: string]>({
        queryKey: ["posts", id],
        queryFn: getSinglePost,
        staleTime: 1000 * 60, //fresh -> stale 으로 변경되는 시간
        gcTime: 1000 * 60 * 3, //stale -> 데이터가 사라지는 시간
    })    

    if(!post?.Images[0]){
        return null;
    }
    return (
    <div className={style.imageZone}>
        <img src={post.Images[0].link} alt={post.content} />
        <div className={style.image} style={{backgroundImage: `url(${post.Images[0].link})`}} />
        <div className={style.buttonZone}>
            <div className={style.buttonInner}>
                <ActionButtons white post={post} />
            </div>
        </div>
    </div>
    );
}