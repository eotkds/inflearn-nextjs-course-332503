'use client'
import { MouseEventHandler } from 'react';
import style from './post.module.css';
import cx from 'classnames';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { Post } from '../../../model/Post';
import { useRouter } from 'next/navigation';
import { useModalStore } from '../../../store/modal';

export default function ActionButtons({white, post}: {white?: boolean, post: Post}) {
    const queryClient = useQueryClient();
    const session = useSession();
    const router = useRouter();
    const modalStore = useModalStore();

    // onMutate 로직을 재사용 가능한 함수로 분리
    const updateHeartStatus = (isHeart: boolean) => {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map(cache => cache.queryKey);
      
      queryKeys.forEach(queryKey => {
          if (queryKey[0] === 'posts') {
              const value: Post | InfiniteData<Post[]> | undefined = queryClient.getQueryData(queryKey);
              if (value && 'pages' in value) {
                  // 포스트 리스트
                  const obj = value.pages.flat().find(p => p.postId === post.postId);
                  if (obj) {
                      const pageIndex = value.pages.findIndex(page => page.includes(obj));
                      const index = value.pages[pageIndex].findIndex(p => p.postId === post.postId);
                      const shallow = { ...value };
                      value.pages = { ...value.pages };
                      value.pages[pageIndex] = [...value.pages[pageIndex]];
                      
                      shallow.pages[pageIndex][index] = {
                          ...shallow.pages[pageIndex][index],
                          Hearts: isHeart 
                              ? [{ userId: session.data?.user?.email as string }]
                              : shallow.pages[pageIndex][index].Hearts.filter(
                                  heart => heart.userId !== session.data?.user?.email
                              ),
                          _count: {
                              ...shallow.pages[pageIndex][index]._count,
                              Hearts: shallow.pages[pageIndex][index]._count.Hearts + (isHeart ? 1 : -1),
                          }
                      };
                      queryClient.setQueryData(queryKey, shallow);
                  }
              } else if (value) {
                  // 싱글 포스트
                  if (value.postId === post.postId) {
                      const shallow = {
                          ...value,
                          Hearts: isHeart
                              ? [{ userId: session.data?.user?.email as string }]
                              : value.Hearts.filter(
                                  heart => heart.userId !== session.data?.user?.email
                              ),
                          _count: {
                              ...value._count,
                              Hearts: value._count.Hearts + (isHeart ? 1 : -1),
                          }
                      };
                      queryClient.setQueryData(queryKey, shallow);
                  }
              }
          }
      });
  };
  // updateHeartStatus 함수 복사하여 repost 로직에 사용
  const updateRepostStatus = (isRepost: boolean) => {
    const queryCache = queryClient.getQueryCache();
    const queryKeys = queryCache.getAll().map(cache => cache.queryKey);
    
    queryKeys.forEach(queryKey => {
      if (queryKey[0] === 'posts') {
          const value: Post | InfiniteData<Post[]> | undefined = queryClient.getQueryData(queryKey);
          if (value && 'pages' in value) {
              // 포스트 리스트
              const obj = value.pages.flat().find(p => p.postId === post.postId);
              const repost = value.pages.flat().find((v) => v.Original?.postId === post.postId && v.User.id === session.data?.user?.email);
              if (obj) {
                const pageIndex = value.pages.findIndex(page => page.includes(obj));
                const index = value.pages[pageIndex].findIndex(p => p.postId === post.postId);
                const shallow = { ...value };
                value.pages = { ...value.pages };
                value.pages[pageIndex] = [...value.pages[pageIndex]];
                
                shallow.pages[pageIndex][index] = {
                    ...shallow.pages[pageIndex][index],
                    Reposts: isRepost 
                        ? [{ userId: session.data?.user?.email as string }]
                        : shallow.pages[pageIndex][index].Reposts.filter(
                            repost => repost.userId !== session.data?.user?.email
                        ),
                    _count: {
                        ...shallow.pages[pageIndex][index]._count,
                        Reposts: shallow.pages[pageIndex][index]._count.Reposts + (isRepost ? 1 : -1),
                    }
                };
                if(isRepost){
                  shallow.pages[0].unshift(shallow.pages[pageIndex][index]);
                }else{
                  shallow.pages = shallow.pages.map(page => {
                    return page.filter(p => p.postId !== repost?.postId);
                  })
                }
                queryClient.setQueryData(queryKey, shallow);
              }
          } else if (value) {
              // 싱글 포스트
              if (value.postId === post.postId) {
                  const shallow = {
                      ...value,
                      Reposts: isRepost
                          ? [{ userId: session.data?.user?.email as string }]
                          : value.Reposts.filter(
                              repost => repost.userId !== session.data?.user?.email
                          ),
                      _count: {
                          ...value._count,
                          Reposts: value._count.Reposts + (isRepost ? 1 : -1),
                      }
                  };
                  queryClient.setQueryData(queryKey, shallow);
              }
          }
        }
    });
  };

    const reposted = !!post.Reposts?.find(repost=>repost.userId === session.data?.user?.email);
    const liked = !!post.Hearts?.find(heart=>heart.userId === session.data?.user?.email);


    const heart = useMutation({
      mutationFn: ()=>{
        return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${post.postId}/heart`, {
          method: 'POST',
          credentials: 'include',
        });
      },
      onMutate: ()=>{
        updateHeartStatus(true);
      },
      onError: ()=>{
        // 오류 발생시 원래 상태로 되돌리기
        updateHeartStatus(false);
      },
      onSettled: ()=>{
        // 쿼리 데이터 무효화 - 데이터가 변경되었으니 다시 불러오기 ; 옵션
        // queryClient.invalidateQueries({queryKey: ['posts']}); 
      }
    });

    const unheart = useMutation({
      mutationFn: ()=>{
        return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${post.postId}/heart`, {
          method: 'DELETE',
          credentials: 'include',
        });
      },
      onMutate: ()=>{
        updateHeartStatus(false);
      },
      onError: ()=>{
        // 오류 발생시 원래 상태로 되돌리기
        updateHeartStatus(true);
      },
      onSettled: ()=>{
        // 쿼리 데이터 무효화 - 데이터가 변경되었으니 다시 불러오기 ; 옵션
        // queryClient.invalidateQueries({queryKey: ['posts']}); 
      }
    });

    // TODO : 재게시 할 경우 재게 표시가 나오지 않음; Original 가 null
    const repost = useMutation({
      mutationFn: ()=>{
        return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${post.postId}/reposts`, {
          method: 'POST',
          credentials: 'include',
        });
      },
      onSuccess: ()=> {
        updateRepostStatus(true);
      },
      onError: ()=>{
        updateRepostStatus(false);
      }
    });
    const deleteRepost = useMutation({
      mutationFn: ()=>{
        return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${post.postId}/reposts`, {
          method: 'DELETE',
          credentials: 'include',
        });
      },
      onSuccess: ()=> {
        updateRepostStatus(false);
      },
      onError: ()=>{
        updateRepostStatus(true);
      }
    });


    const onClickComment = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      modalStore.setMode('comment');
      modalStore.setData(post);
      router.push('/compose/tweet');
    }

    const onClickRepost = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if(reposted){
        deleteRepost.mutate();
      }else{
        repost.mutate();
      }
    }

    const onClickHeart:MouseEventHandler<HTMLButtonElement> = (e) => {
      e.stopPropagation();
      if(liked){
        unheart.mutate();
      }else{
        heart.mutate();
      }
    }

    return (
        <div className={style.actionButtons}>
      <div className={cx(style.commentButton, white && style.white)}>
        <button onClick={onClickComment}>
          <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path
                d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
            </g>
          </svg>
        </button>
        <div className={style.count}>{post._count?.Comments || ''}</div>
      </div>
      <div className={cx(style.repostButton, reposted && style.reposted, white && style.white)}>
        <button onClick={onClickRepost}>
          <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path
                d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
            </g>
          </svg>
        </button>
        <div className={style.count}>{post._count?.Reposts || ''}</div>
      </div>
      <div className={cx([style.heartButton, liked && style.liked], white && style.white)}>
        <button onClick={onClickHeart}>
          <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path
                d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
            </g>
          </svg>
        </button>
        <div className={style.count}>{post._count?.Hearts || ''}</div>
      </div>
    </div>
    );
}