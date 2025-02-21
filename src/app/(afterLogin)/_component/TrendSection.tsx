"use client";

import style from "./trendSection.module.css";
import Trend from "./Trend";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { getTrends } from "../_lib/getTrends";
import { useQuery } from "@tanstack/react-query";
import { Hashtag } from "@/model/Hashtag";

export default function TrendSection() {
    const { data : session } = useSession();

    const {data} = useQuery<Hashtag[]>({
        queryKey: ["trends"],
        queryFn: getTrends,
        staleTime: 1000 * 60, //fresh -> stale 으로 변경되는 시간
        gcTime: 1000 * 60 * 3, //stale -> 데이터가 사라지는 시간
        enabled: !!session?.user ,
    })

    const pathname = usePathname();
    if(pathname === "/explore"){
        return null;
    }
    
  

    if(session?.user){
        return (
            <div className={style.trendBg}>
                <div className={style.trend}>
                    <h3>나를 위한 트렌드</h3>
                    {data?.map(trend => (
                        <Trend key={trend.title} trend={trend} />
                    ))}
                </div>
            </div>
        );
    }
    return (
        <div className={style.trendBg}>
            <div className={style.noTrend}>
                트렌드를 가져올 수 없습니다.
            </div>
        </div>
    );

}