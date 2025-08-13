import Link from "next/link";
import { Hashtag } from "@/model/Hashtag";

export default function Trend({ trend }: { trend: Hashtag }) {
  return (
    <Link href={`/search?q=${trend.title}`} className="p-[12px_16px] block h-[82px] hover:bg-[rgba(0,0,0,0.03)]">
      <div className="text-[rgb(83,100,113)] text-[13px] leading-[16px] font-light">실시간트렌드</div>
      <div className="text-[15px] font-bold leading-[20px] mt-[2px] mb-[4px]">{trend.title}</div>
      <div className="text-[rgb(83,100,113)] text-[13px] leading-[16px] font-light">
        {trend.count.toLocaleString()} posts
      </div>
    </Link>
  );
}
