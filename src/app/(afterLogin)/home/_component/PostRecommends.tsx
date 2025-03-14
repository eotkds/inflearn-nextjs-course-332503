"use client";

import { InfiniteData,  useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getPostRecommends } from "../_lib/getPostRecommends";
import { Post as IPost } from "@/model/Post";
import Post from "@/app/(afterLogin)/_component/Post";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Loading from "../loading";

export default function PostRecommends() {

    /**
     * staleTime, gcTime 둘 중 하나가 지나간 경우
     * 로딩 후 오는 것이 아닌, 이전 게시물이 뜨고 나서 대체 되는 현상이 있다.
     */
    const {data, fetchNextPage, hasNextPage, isFetching, isPending, isError } = useSuspenseInfiniteQuery<IPost[], Object, InfiniteData<IPost[]>, [_1:string, _2:string], number>({
        queryKey: ["posts", "recommends"],
        queryFn: getPostRecommends,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return lastPage.at(-1)?.postId;
        },
        staleTime: 1000 * 30, //fresh -> stale 으로 변경되는 시간
        gcTime: 1000 * 60 * 1, //stale -> 데이터가 사라지는 시간
    });
    const {ref, inView} = useInView({
        threshold: 0, // 요소가 얼마나 보이는지에 대한 비율을 나타냅니다. 0부터 1.0 사이의 값
        delay: 0, // 요소가 보이기 시작하는 시간을 지정합니다. 0은 요소가 보이자마자 즉시 호출됩니다.
    });

    useEffect(() => {
        if(inView) {
           !isFetching && hasNextPage && fetchNextPage();
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);



    return (
    <>
        {data?.pages.map((page, i) => (
            <Fragment key={i}>
                {page.map((post) => (
                    <Post key={post.postId} post={post} />
                ))}
            </Fragment>
        ))}
       <div ref={ref} style={{height: '50px'}}></div>
    </>
    );
}
