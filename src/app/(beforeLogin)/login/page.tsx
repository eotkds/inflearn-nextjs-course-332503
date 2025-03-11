"use client";
import Main from "@/app/(beforeLogin)/_component/Main";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import RedirectToLogin from "./_component/RedirectToLogin";

export default function LoginPage() {
  const router = useRouter();
  const { data : session } = useSession();

  if(session?.user){
    router.replace("/home");
    return null;
  }
  // 250311 - 에러 발생으로 주석 처리, RedirectToLogin 컴포넌트 추가
  // router.replace("/i/flow/login");

  return (
    <>
    <RedirectToLogin />
    <Main />
    </>
  );
}

// router.push
// localhost:3000 -> localhost:3000/login -> localhost:3000/i/flow/login


// router.replace
// localhost:3000 -> localhost:3000/login -(replace)-> localhost:3000/i/flow/login

// 뒤로 가기 차이

