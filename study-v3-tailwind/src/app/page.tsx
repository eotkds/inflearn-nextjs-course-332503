import Image from "next/image";
import dLogo from "@/../public/dlogo.jpeg";
import Link from "next/link";

export default function Main() {
  return (
    <div className="flex flex-row bg-(--color-background-end-rgb) w-[100dvw] h-[100dvh]">
      <div className="flex flex-1 justify-center items-center">
        <Image src={dLogo} alt="logo" className="lg:w-[450px] lg:h-[550px]" />
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-[64px] font-bold my-[48px]">지금 일어나고 있는 일</h1>
        <h2 className="text-[31px] font-bold mb-[32px]">지금 가입하세요.</h2>
        <Link href="/i/flow/signup" className="w-[300px] h-[40px] rounded-[20px] px-[16px] text-[15px] bg-[rgb(29,155,240)] text-white border-none flex justify-center items-center hover:bg-[rgb(26,140,216)]">계정 만들기</Link>
        <h3 className="font-bold text-[17px] mb-[20px] mt-[40px]">이미 트위터에 가입하셨나요?</h3>
        <Link href="/login" className="w-[300px] h-[40px] rounded-[20px] px-[16px] text-[15px] text-[rgb(29,155,240)] border-1 border-solid border-[rgb(207,217,222)] flex justify-center items-center hover:bg-[rgba(29,155,240,0.1)]">로그인</Link>
      </div>
    </div>
  )
}
