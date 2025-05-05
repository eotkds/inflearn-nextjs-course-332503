
import Link from "next/link";
import Image from "next/image";
import dLogo from "@/../public/dlogo.jpeg";
import NavMenu from "./_component/NavMenu";
import LogoutButton from "./_component/LogoutButton";

export default function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
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
          <main className="w-[600px] h-[200dvh] bg-blue-500">
          {children}
          </main>
          <section className="w-[350px] h-full bg-green-500">
            <form action="" className="fixed w-[inherit] h-[42px] rounded-[21px] bg-[rgb(239,243,244)] mt-[6px] mb-[12px] flex items-center">
              <svg width={20} viewBox="0 0 24 24" aria-hidden="true" className="ml-[20px] fill-[rgb(83,100,113)]">
                  <g>
                    <path
                      d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
                  </g>
                </svg>
                <input type="search" className="outline-none bg-inherit border-none p-[12px] ml-[5px] text-[15px] leading-[normal]" />
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}