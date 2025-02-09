"use client";
import Main from "@/app/(beforeLogin)/_component/Main";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { data : session } = useSession();

  if(session?.user){
    router.replace("/home");
    return null;
  }
  router.replace("/i/flow/login");

  return (
    <>
    <Main />
    </>
  );
}

// router.push
// localhost:3000 -> localhost:3000/login -> localhost:3000/i/flow/login


// router.replace
// localhost:3000 -> localhost:3000/login -(replace)-> localhost:3000/i/flow/login

// 뒤로 가기 차이

