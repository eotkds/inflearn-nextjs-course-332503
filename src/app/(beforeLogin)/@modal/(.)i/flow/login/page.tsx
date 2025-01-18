"use client"; // 비동기를 통해 서버 컴포넌트를 호출하는 것도 가능하다.

import LoginModal from "@/app/(beforeLogin)/_component/LoginModal";

export default function Page() {
  return (
    <>
      가로채기
      <LoginModal />
    </>
  );
}
