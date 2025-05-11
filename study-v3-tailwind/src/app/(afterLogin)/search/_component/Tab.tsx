"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "./tab.css";

export default function Tab() {
    const [current, setCurrent] = useState('hot');
    const router = useRouter();
    const searchParams = useSearchParams();

    const onClickHot = () => {
        setCurrent('hot');
        router.replace(`/search?q=${searchParams.get('q')}`);
    }

    const onClickNew = () => {
        setCurrent('new');
        router.replace(`/search?${searchParams.toString()}&f=live`);
    }

    return (
        <div className="w-[inherit] border-[rgb(239,243,244)] border-b border-solid">
          <div className="h-[53px] flex homeTab">
            <div onClick={onClickHot}>
              인기
              <div className="tabIndicator" hidden={current === 'new'}></div>
            </div>
            <div onClick={onClickNew}>
              최신
              <div className="tabIndicator" hidden={current === 'hot'}></div>
            </div>
          </div>
        </div>
      );
}