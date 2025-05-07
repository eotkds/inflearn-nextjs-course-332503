"use client";
import {useContext} from "react";
import { TabContext } from "./TabProvider";
import style from './tab.module.css';

export default function Tab() {
  const {tab, setTab} = useContext(TabContext);

  const onClickRec = () => {
    setTab('rec');
  }
  const onClickFol = () => {
    setTab('fol');
  }

  return (
    <div className="fixed z-[1] w-[598px] bg-[rgba(255,255,255,0.85)]  backdrop-blur-[12px] border-[rgb(239,243,244)] border-b border-b-solid" >
      <div className="text-[20px] leading-[24px] font-bold py-[12px] px-[16px]">홈</div>
      <div className="h-[53px] flex">
        <div onClick={onClickRec} className="flex-1 flex justify-center items-center text-[15px] cursor-pointer relative hover:bg-[rgba(15,20,25,0.1)]">
          추천
          <div className={style.tabIndicator} hidden={tab === 'fol'}></div>
        </div>
        <div onClick={onClickFol} className="flex-1 flex justify-center items-center text-[15px] cursor-pointer relative hover:bg-[rgba(15,20,25,0.1)]">
          팔로우 중
          <div className={style.tabIndicator} hidden={tab === 'rec'}></div>
        </div>
      </div>
    </div>
  )
}