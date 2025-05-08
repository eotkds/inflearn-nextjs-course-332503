"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function ComposeTweet() {
    const router = useRouter();
    const [content, setContent] = useState("");
    const imageRef = useRef<HTMLInputElement>(null);
    const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }

    const onClickClose = () => {
        router.back();
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("onSubmit");
    }

    const onClickButton = () => {
        imageRef.current?.click();
    }

    const me = { // 임시로 내 정보 있는것처럼
        id: 'eotkds',
        nickname: '오메가',
        image: '/profile_parker.jpeg',
      }

    return (
        <div className="w-[100vw] h-full flex justify-center z-10 absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.4)]">
          <div className="bg-white relative top-[5%] max-w-[80vw] min-w-[600px] max-h-[400px] rounded-[16px] flex flex-col">
            <button className="w-[34px] h-[34px] rounded-[17px] border-none cursor-pointer bg-white absolute left-[8px] top-[8px] flex items-center justify-center hover:bg-[rgba(15,20,25,0.1)]" onClick={onClickClose}>
              <svg width={24} viewBox="0 0 24 24" aria-hidden="true"
                   className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03">
                <g>
                  <path
                    d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                </g>
              </svg>
            </button>
            <form className="flex flex-col flex-1" onSubmit={onSubmit}>
              <div className="px-[16px] flex-1 mt-[54px] flex flex-row">
                <div className="mr-[12px] w-[40px]">
                  <div className="w-[40px] h-[40px] rounded-[20px]">
                    <img src={me.image} alt={me.id} className="w-[40px] h-[40px] rounded-[20px]"/>
                  </div>
                </div>
            <div className="flex-1">
                <textarea className="w-full border-none outline-none text-[20px] placeholder:font-['Malgun Gothic', sans-serif]" placeholder="무슨 일이 일어나고 있나요?"
                        value={content}
                        onChange={onChangeContent}
                />
            </div>
            </div>
            <div className="px-[16px]">
              <div className="w-full border-b border-[rgba(239,243,244)]"/>
              <div className="flex flex-row items-center">
                  <div className="flex-1">
                  <input type="file" name="imageFiles" multiple hidden ref={imageRef} />
                  <button className="w-[34px] h-[34px] border-none cursor-pointer rounded-[17px] bg-[rgba(29,155,240,0.01)] duration-200 transition-[background-color] flex justify-center items-center hover:bg-[rgba(29,155,240,0.1)]" type="button" onClick={onClickButton}>
                      <svg width={24} viewBox="0 0 24 24" aria-hidden="true" className="fill-[rgba(29,155,240)]">
                      <g>
                          <path
                          d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                      </g>
                      </svg>
                  </button>
                  </div>
                  <button className="cursor-pointer w-[94px] h-[36px] rounded-[18px] border-none my-[8px] bg-[rgb(29,155,240)] text-white disabled:opacity-[0.5]" disabled={!content}>게시하기</button>
              </div>
            </div>
        </form>
        </div>
    </div>
    );
}