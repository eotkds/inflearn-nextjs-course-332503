"use client";

import BackButton from "@/app/(beforeLogin)/_component/BackButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "../_lib/getUser";
import { User } from "@/model/User";

import cx from "classnames";
import style from "@/app/(afterLogin)/[username]/profile.module.css";
import { updateFollowStatus } from "../../_lib/updateFollowStatus";
import { Session } from "next-auth";


export default function UserInfo({username, session}: {username: string, session: Session | null}) {
    const {data: user, error} = useQuery<User, Object, User, [_1: string, _2: string]>({
        queryKey: ["users", username],
        queryFn: getUser,
        staleTime: 1000 * 60, //fresh -> stale 으로 변경되는 시간
        gcTime: 1000 * 60 * 3, //stale -> 데이터가 사라지는 시간
    });
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
if(error){
    return (
        <>
          <div className={style.header}>
            <BackButton/>
            <h3 className={style.headerTitle}>프로필</h3>
          </div>
          <div className={style.userZone}>
            <div className={style.userImage}></div>
            <div className={style.userName}>
              <div>@{username}</div>
            </div>
          </div>
          <div style={{
            height: 100,
            alignItems: 'center',
            fontSize: 31,
            fontWeight: 'bold',
            justifyContent: 'center',
            display: 'flex'
          }}>
            계정이 존재하지 않음
          </div>
        </>
      );
}

if (!user){
    return null;
} 

const followed = !!user.Followers?.some((follower) => follower.id === session?.user?.email);

const onFollow = () => {
    if(followed){
        unfollow.mutate(user.id);
    }else{
        follow.mutate(user.id);
    }
}

return (
    <>
        <div className={style.header}>
        <BackButton />
        <h3 className={style.headerTitle}>{user.nickname}</h3>
        </div>
        <div className={style.userZone}>
          <div className={style.userRow}>
            <div className={style.userImage}>
                <img src={user.image} alt={user.id}/>
            </div>
            <div className={style.userName}>
                <div>{user.nickname}</div>
                <div>@{user.id}</div>
            </div>
            {session?.user?.email !== user.id && <button 
            onClick={onFollow}
            className={cx(style.followButton, followed ? style.followed : '')}>{followed ? '팔로잉' : '팔로우'}</button>}
          </div>
          <div className={style.userFollower}>
            <div>
              {user._count.Followers} 팔로워
            </div>
            &nbsp;
            <div>
              {user._count.Followings} 팔로우 중
            </div>
           </div>
        </div>
    </>
);
}