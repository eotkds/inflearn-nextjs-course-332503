import style from "./trend.module.css";
import Link from "next/link";
import { Hashtag } from "@/model/Hashtag";

type Prop = {trend : Hashtag}
export default function Trend({ trend } : Prop) {
    return (
        // 250311 encodeURIComponent 사용 하지 않아서, '#' 이 들어가는 경우 오류 발생
        <Link href={`/search?q=${encodeURIComponent(trend.title)}`} className={style.container}>
            <div className={style.count}>실시간트렌드</div>
            <div className={style.title}>{trend.title}</div>
            <div className={style.count}>{trend.count.toLocaleString()} posts</div>
        </Link>
    );
}