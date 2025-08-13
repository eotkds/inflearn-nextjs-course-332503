"use client";

import Trend from "@/app/(afterLogin)/_component/Trend";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getTrends } from "../_lib/getTrends";
import { Hashtag } from "@/model/Hashtag";

export default function TrendSection() {
  const { data: session } = useSession();
  const { data: trends } = useQuery<Hashtag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 1000 * 60 * 1,
    enabled: !!session?.user,
  });
  const pathname = usePathname();

  if (pathname === "/explore") return null;
  if (!session)
    return (
      <div className="bg-[rgb(247,249,249)] rounded-[16px] mt-[12px]">
        <div className="pt-[12px] px-[16px]">트랜드를 가져올 수 없습니다.</div>
      </div>
    );

  return (
    <div className="bg-[rgb(247,249,249)] rounded-[16px] mt-[12px]">
      <div className="text-[20px] font-bold pt-[12px]">
        <h3 className="mt-[12px] px-[16px]">나를 위한 트렌드</h3>
        {trends?.map((trend) => (
          <Trend key={trend.tagId} trend={trend} />
        ))}
      </div>
    </div>
  );
}
