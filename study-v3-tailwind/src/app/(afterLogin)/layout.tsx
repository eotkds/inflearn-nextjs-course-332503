
import Link from "next/link";
import Image from "next/image";
import dLogo from "@/../public/dlogo.jpeg";
import NavMenu from "./_component/NavMenu";
import LogoutButton from "./_component/LogoutButton";
import TrendSection from "./_component/TrendSection";
import FollowRecommend from "./_component/FollowRecommend";
import RightSearchZone from "./_component/RightSearchZone";

export default function AfterLoginLayout({
  children, modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="flex items-stretch bg-white">
      <header className="flex flex-col items-end grow">
        <section className="w-[275px] h-[100dvh] ">
          <div className="fixed w-[inherit] h-[100dvh] flex flex-col ">
            <Link href="/home" className="inline-block h-[56px] mt-[2px]">
              <div className="w-[50px] h-[50px] rounded-[50%] flex justify-center items-center hover:bg-[rgba(15,20,25,0.1)]">
                <Image src={dLogo} alt="d.com로고" width={40} height={40} />
              </div>
            </Link>
            <nav className="flex-1">
              <ul>
                <NavMenu />
              </ul>
              <Link href="/compose/tweet/" className="mx-[16px] flex items-center justify-center h-[42px] w-[234px] text-white font-bold text-[17px] rounded-[26px] bg-[rgb(29,155,240)] hover:bg-[rgb(26,140,216)] shadow-[0_8px_28px_rgba(0,0,0,0.08)]">게시하기</Link>
            </nav>
            <LogoutButton />
          </div>
        </section>
      </header>
      <div className="flex flex-col items-start h-[100dvh] grow">
        <div className="w-[990px] h-full flex justify-between ">
          <main className="w-[600px] h-[200dvh]">
          {children}
          </main>
          <section className="w-[350px] h-full">
            <RightSearchZone />
            <TrendSection />
            <div className="text-[20px] font-bold bg-[rgb(247,249,249)] rounded-[16px] my-[12px] px-[16px] py-[12px]">
              <h3 className="pb-[12px]">팔로우 추천</h3>
              <FollowRecommend />
              <FollowRecommend />
              <FollowRecommend />
            </div>
          </section>
        </div>
      </div>
      {modal}
    </div>
  );
}