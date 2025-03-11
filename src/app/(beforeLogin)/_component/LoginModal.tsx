"use client"; // 비동기를 통해 서버 컴포넌트를 호출하는 것도 가능하다.

import { useRouter } from 'next/navigation';
import style from './login.module.css';
import {ChangeEventHandler, FormEventHandler, useState} from "react";
import { signIn } from 'next-auth/react';

export default function LoginModal() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setMessage('');
    
    try{
      const result = await signIn('credentials', {
        username: id,
        password: password,
        redirect: false, 
        /* false로 설정한 경우 페이지 이동이 안된다.
        항상 status 200으로 반환된다.
        redirect: true로 설정한 경우에는 router.replace('/home') 기능을 사용할 수 없다.
        */
      });
      console.log('login result', result);
      if(result?.code === 'no_user'){
        setMessage('존재하지 않는 아이디입니다.');
      }else if(result?.code === 'wrong_password'){
        setMessage('비밀번호가 틀렸습니다.');
      }
      router.replace('/home');

    }catch(e){
      console.error(e);
      setMessage('아이디 또는 비밀번호가 틀렸습니다.');
    }


  };
  
  const onClickClose = () => {
    router.back();
  };
  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };
  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className={style.modalBackground}>
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <button className={style.closeButton} onClick={onClickClose}>
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
        <form onSubmit={onSubmit}>
          <div className={style.modalBody}>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="id">아이디</label>
              <input id="id" className={style.input} value={id} onChange={onChangeId} type="text" placeholder=""/>
            </div>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="password">비밀번호</label>
              <input id="password" className={style.input} value={password} onChange={onChangePassword} type="password" placeholder=""/>
            </div>
          </div>
          <div className={style.message}>{message}</div>
          <div className={style.modalFooter}>
            <button className={style.actionButton} disabled={!id && !password}>로그인하기</button>
          </div>
        </form>
      </div>
    </div>
  );
}