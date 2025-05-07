"use client";

import { useRef, useState } from "react";

export default function PostForm() {
  const [content, setContent] = useState('');
  const imageRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(content);
  }

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }

  const onClickButton = () => {
    // 이미지 업로드
    imageRef.current?.click();
  }

  const me = { // 임시로 내 정보 있는것처럼
    id: 'eotkds',
    nickname: '오메가',
    image: '/profile_parker.jpeg',
  }


  return (
    <form className="mt-[101px] flex p-[16px_16px_8px] border-[rgb(239,243,244)] border-b border-b-solid" onSubmit={onSubmit}>
      <div className="mr-[12px] w-[40px]">
        <div className="w-[40px] h-[40px] rounded-[20px]">
          <img src={me.image} alt={me.id} className="w-[40px] h-[40px] rounded-[20px]" />
        </div>
      </div>
      <div className="flex-1">
        <textarea value={content} onChange={onChange} placeholder="무슨 일이 일어나고 있나요?" className="w-full border-none py-[12px] text-[20px] leading-[24px] outline-none placeholder:font-[Malgun Gothic]"/>
        <div className="w-full">
          <div className="flex flex-row items-center">
            <div className="flex-1">
              <input type="file" name="imageFiles" multiple hidden ref={imageRef} />
              <button className="w-[34px] h-[34px] border-none cursor-pointer rounded-[17px] duration-200 transition-property-[background-color] bg-[rgb(29,155,240,0.01)] flex items-center justify-center hover:bg-[rgb(29,155,240,0.1)]" type="button" onClick={onClickButton}>
                <svg width={24} viewBox="0 0 24 24" aria-hidden="true" className="fill-[rgb(29,155,240)]">
                  <g>
                    <path
                      d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                  </g>
                </svg>
              </button>
            </div>
            <button className="w-[94px] h-[36px] border-none text-[rgb(255,255,255)] font-bold text-[15px] rounded-[18px] bg-[rgb(29,155,240)] disabled:opacity-[0.5] hover:bg-[rgb(26,140,216)]" disabled={!content}>게시하기</button>
          </div>
        </div>
      </div>
    </form>
  );
}