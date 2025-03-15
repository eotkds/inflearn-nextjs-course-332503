"use client";

import style from "./followRecommend.module.css";
import { User } from "@/model/User";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import cx from "classnames";
type Prop = { user : User}

export default function FollowRecommend({user}: Prop) {
    const {data: session} = useSession();
    console.log('user', user);
    const followed = !!user.Followers?.find(follower => follower.id === session?.user?.email);
    const queryClient = useQueryClient();

     // onMutate 로직을 하나의 함수로 통합
     const updateFollowStatus = (userId: string, isFollow: boolean) => {
        const value: User[]|undefined = queryClient.getQueryData(["users", "followRecommends"]);
        
        if (value) {
            const index = value.findIndex(user => user.id === userId);
            const shallow = [...value];
            shallow[index] = {
                ...shallow[index],
                Followers: isFollow 
                    ? [...shallow[index].Followers, {id: session?.user?.email as string}]
                    : shallow[index].Followers.filter(follower => follower.id !== session?.user?.email),
                _count: {
                    ...shallow[index]._count,
                    Followers: shallow[index]._count.Followers + (isFollow ? 1 : -1),
                }
            }
            queryClient.setQueryData(["users", "followRecommends"], shallow);
        }
    };
    const follow = useMutation({
        mutationFn: (userId: string)=>{
            return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`,{
                method: 'POST',
                credentials: 'include',
            })
        },
        onMutate: (userId: string)=>{
            updateFollowStatus(userId, true);
        },
        onSuccess: ()=>{},
        onError: (userId: string)=>{
            // 실패시 반대 동작 실행
            updateFollowStatus(userId, false);
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
            updateFollowStatus(userId, false);
        },
        onSuccess: ()=>{},
        onError: (userId: string)=>{
            // 실패시 반대 동작 실행
            updateFollowStatus(userId, true);
        },
    });

    const onFollow = () => {
        if(followed) {
            unfollow.mutate(user.id);
        } else {
            follow.mutate(user.id);
        }
    };
    return (
        <div className={style.container}>
            <div className={style.userLogoSection}>
                <div className={style.userLogo}>
                <img src={user.image} alt={user.id} />
                </div>
            </div>
            <div className={style.userInfo}>
                <div className={style.title}>{user.nickname}</div>
                <div className={style.count}>@{user.id}</div>
            </div>
            <div className={cx(style.followButtonSection, followed && style.following)}>
                <button onClick={onFollow}>{followed ? '팔로잉' : '팔로우'}</button>
            </div>
        </div>
    )
}