
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
        <section className="w-[72px] xl:w-[275px] h-[100dvh] ">
          <div className="fixed w-[inherit] h-[100dvh] flex flex-col items-center xl:items-start px-[8px] xl:p-0">
            <Link href="/home" className="inline-block h-[56px] mt-[2px]">
              <div className="w-[50px] h-[50px] rounded-[50%] flex justify-center items-center hover:bg-[rgba(15,20,25,0.1)]">
                <Image src={dLogo} alt="d.com로고" width={40} height={40} />
              </div>
            </Link>
            <nav className="flex-1">
              <ul>
                <NavMenu />
              </ul>
              <Link href="/compose/tweet/" className="flex items-center justify-center h-[50px] w-[50px] text-white font-bold text-[17px] rounded-[50%] bg-[rgb(29,155,240)] hover:bg-[rgb(26,140,216)] shadow-[0_8px_28px_rgba(0,0,0,0.08)] xl:w-[234px] xl:h-[42px] xl:rounded-[26px] xl:mx-[16px]">
                <span className="hidden xl:inline-block">게시하기</span>
                <svg viewBox="0 0 24 24" aria-hidden="true" className="r-jwli3a r-4qtqp9 r-yyyyoo r-1472mwg r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp inline-block fill-white w-[24px] xl:hidden"><g><path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path></g></svg>
              </Link>
            </nav>
            <LogoutButton />
          </div>
        </section>
      </header>
      <div className="flex flex-col items-start h-[100dvh] grow">
        <div className="w-[600px] lg:w-[990px] h-full flex justify-between ">
          <main className="w-[600px] h-[200dvh]">
          {children}
          </main>
          <section className="hidden lg:block w-[350px] h-full">
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