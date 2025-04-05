"use client";

import Trend from "../../_component/Trend";
import { useSession } from "next-auth/react";
import { getTrends } from "../../_lib/getTrends";
import { useQuery } from "@tanstack/react-query";
import { Hashtag } from "../../../../model/Hashtag";

export default function TrendSection() {
    const { data : session } = useSession();

    const {data} = useQuery<Hashtag[]>({
        queryKey: ["trends"],
        queryFn: getTrends,
        staleTime: 1000 * 60, //fresh -> stale 으로 변경되는 시간
        gcTime: 1000 * 60 * 3, //stale -> 데이터가 사라지는 시간
        enabled: !!session?.user ,
    })

    return (
        data?.map(trend => (
            <Trend key={trend.title} trend={trend} />
        ))
    )
        
    
}