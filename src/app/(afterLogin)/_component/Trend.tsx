import style from "./trend.module.css";
import Link from "next/link";
import { Hashtag } from "@/model/HashTag";

type Prop = {trend : Hashtag}
export default function Trend({ trend } : Prop) {
    return (
        <Link href={`/search?q=${trend.title}`} className={style.container}>
            <div className={style.count}>실시간트렌드</div>
            <div className={style.title}>{trend.title}</div>
            <div className={style.count}>{trend.count.toLocaleString()} posts</div>
        </Link>
    )
}