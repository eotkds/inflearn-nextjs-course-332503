"use client";

import style from './signup.module.css';
import {useRouter} from "next/navigation";
import {ChangeEventHandler, FormEventHandler, useState} from "react";

export default function SignupModal() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState<File>();

  const router = useRouter();
  const onClickClose = () => {
    router.back();
    // TODO: 뒤로가기가 /home이 아니면 /home으로 보내기
  }

  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => { setId(e.target.value) };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => { setPassword(e.target.value) };
  const onChangeNickname: ChangeEventHandler<HTMLInputElement> = (e) => { setNickname(e.target.value) };
  const onChangeImageFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.target.files && setImageFile(e.target.files[0])
  };

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    fetch('http://localhost:9090/api/users', {
      method: 'post',
      body: JSON.stringify({
        id,
        nickname,
        image,
        password,
      }),
      credentials: 'include',
    }).then((response: Response) => {
      console.log(response.status);
      if (response.status === 200) {
        router.replace('/home');
      }
    }).catch((err) => {
      console.error(err);
    });
  }

  return (
    <>
      <div className="w-[100vw] h-full flex justify-center absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.4)]">
        <div className="bg-white relative top-[5%] max-w-[80vw] min-w-[600px] rounded-[16px] flex flex-col h-[550px]">
          <div className="px-[80px] pt-[36px] pb-[20px] font-bold">
            <button className="w-[34px] h-[34px] rounded-[17px] border-none cursor-pointer bg-[#fff] absolute top-[16px] left-[16px] flex items-center justify-center hover:bg-[rgba(15,20,25,0.1)]" onClick={onClickClose}>
              <svg width={24} viewBox="0 0 24 24" aria-hidden="true"
                   className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03">
                <g>
                  <path
                    d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                </g>
              </svg>
            </button>
            <div>계정을 생성하세요.</div>
          </div>
          <form className="flex flex-1 flex-col">
            <div className="flex-1 px-[80px]">
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="id">아이디</label>
                <input id="id" className={style.input} type="text" placeholder=""
                       value={id}
                       onChange={onChangeId}
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="name">닉네임</label>
                <input id="name" className={style.input} type="text" placeholder=""
                       value={nickname}
                       onChange={onChangeNickname}
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="password">비밀번호</label>
                <input id="password" className={style.input} type="password" placeholder=""
                       value={password}
                       onChange={onChangePassword}
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="image">프로필</label>
                <input id="image" className={style.input} type="file" accept="image/*"
                       onChange={onChangeImageFile}
                />
              </div>
            </div>
            <div className="px-[80px] py-[24px]">
              <button className="w-full h-[50px] rounded-[25px] bg-[rgb(15,20,25)] text-white text-[17px] disabled:opacity-50 hover:bg-[rgb(39,44,48)]" disabled>가입하기</button>
            </div>
          </form>
        </div>
      </div>
    </>)
}