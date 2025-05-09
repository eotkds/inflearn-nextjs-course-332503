
"use client";

import Trend from "@/app/(afterLogin)/_component/Trend";
import { usePathname } from "next/navigation";

export default function TrendSection() {
  const pathname = usePathname();

  if (pathname === "/explore") return null;
  
  return (
    <div className="bg-[rgb(247,249,249)] rounded-[16px] mt-[12px]">
      <div className="text-[20px] font-bold pt-[12px]">
        <h3 className="mt-[12px] px-[16px]">나를 위한 트렌드</h3>
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
      </div>
    </div>
  )
}
