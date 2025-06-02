"use client";

import {useState} from "react";
import { useRouter } from "next/navigation";
import style from "./login.module.css";
import { signIn } from "next-auth/react"

export default function LoginModal() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    try{
      const response = await signIn("credentials", {
        id,
        password,
        redirect: false,
      });
      if (response.ok) {
        router.replace("/home");
      }
    }catch(error){
        console.log(error);
        setMessage("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };
  const onClickClose = () => {
    router.back();
  };

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="w-[100dvw] h-full flex justify-center absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.4)]">
      <div className="bg-white relative top-[5%] max-w-[80vw] min-w-[600px] border-radius-[16px] flex flex-col h-[450px]">
        <div className="pt-[36px] px-[80px] pb-[20px] text-[31px] font-bold">
          <button className="w-[34px] h-[34px] rounded-[17px] border-none cursor-pointer bg-[#fff] absolute top-[16px] left-[16px] flex items-center justify-center hover:bg-[rgba(15,20,25,0.1)]" onClick={onClickClose}>
            <svg width={24} viewBox="0 0 24 24" aria-hidden="true"
                 className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03">
              <g>
                <path
                  d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
              </g>
            </svg>
          </button>
          <div>로그인하세요.</div>
        </div>
        <form onSubmit={onSubmit} className="flex flex-1 flex-col ">
          <div className="flex-1 px-[80px]">
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="id">아이디</label>
              <input id="id" value={id} onChange={onChangeId} type="text" placeholder="" className={style.input}/>
            </div>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="password">비밀번호</label>
              <input id="password" value={password} onChange={onChangePassword} type="password" placeholder="" className={style.input}/>
            </div>
          </div>
          <div>{message}</div>
          <div className="px-[80px] py-[24px]">
            <button className="w-full h-[50px] rounded-[25px] bg-[rgb(15,20,25)] text-white text-[17px] cursor-pointer border-none disabled:opacity-50 hover:bg-[rgb(39,44,48)]" disabled={!id && !password}>로그인하기</button>
          </div>
        </form>
      </div>
    </div>
  );
}