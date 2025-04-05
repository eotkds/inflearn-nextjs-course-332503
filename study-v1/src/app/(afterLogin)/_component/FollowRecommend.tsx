"use client";

import { User } from "../../../model/User";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { updateFollowStatus } from "../_lib/updateFollowStatus";
import cx from "classnames";
import Link from "next/link";
import style from "./followRecommend.module.css";
type Prop = { user : User}

export default function FollowRecommend({user}: Prop) {
    const {data: session} = useSession();
    const followed = !!user.Followers?.find(follower => follower.id === session?.user?.email);
    const queryClient = useQueryClient();

 
    const follow = useMutation({
        mutationFn: (userId: string)=>{
            return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`,{
                method: 'POST',
                credentials: 'include',
            })
        },
        onMutate: (userId: string)=>{
            updateFollowStatus({userId, isFollow: true, queryClient, sessionUserId: session?.user?.email as string});
        },
        onSuccess: ()=>{},
        onError: (error: Error, userId: string)=>{
            console.log(error);
            // 실패시 반대 동작 실행
            updateFollowStatus({userId, isFollow: false, queryClient, sessionUserId: session?.user?.email as string});
        },
    });
    const unfollow = useMutation({
        mutationFn: (userId: string)=>{
            return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`,{
                method: 'DELETE',
                credentials: 'include',
            })
        },
        onMutate: (userId: string)=>{
            updateFollowStatus({userId, isFollow: false, queryClient, sessionUserId: session?.user?.email as string});
        },
        onSuccess: ()=>{},
        onError: (error: Error, userId: string)=>{
            // 실패시 반대 동작 실행
            updateFollowStatus({userId, isFollow: true, queryClient, sessionUserId: session?.user?.email as string});
        },
    });

    const onFollow = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if(followed) {
            unfollow.mutate(user.id);
        } else {
            follow.mutate(user.id);
        }
    };
    return (
        <Link href={`/${user.id}`} className={style.container}>
            <div className={style.userLogoSection}>
                <div className={style.userLogo}>
                <img src={user.image} alt={user.id} />
                </div>
            </div>
            <div className={style.userInfo}>
                <div className={style.title}>{user.nickname}</div>
                <div className={style.count}>@{user.id}</div>
            </div>
            <div className={cx(style.followButtonSection, followed && style.followed)}>
                <button onClick={onFollow}>{followed ? '팔로잉' : '팔로우'}</button>
            </div>
        </Link>
    )
}