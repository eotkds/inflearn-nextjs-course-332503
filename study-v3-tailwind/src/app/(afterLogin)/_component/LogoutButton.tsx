"use client";
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const { data: me } = useSession();

  
  const onLogout = async () => {
      await signOut({redirect: false});
      router.replace("/");
  };

  if(!me?.user) return null;
    
  return (
    <button className="items-center my-[12px] p-[12px] cursor-pointer border-none bg-white text-left hover:bg-[rgba(15,20,25,0.1)] rounded-[33px] xl:w-[258px] xl:h-[66px] xl:flex" onClick={onLogout}>
      <div className="flex items-center">
        <img src={me?.user?.image as string} alt={me?.user?.nickname} className="w-[40px] rounded-[50%]"/>
      </div>
      <div className="hidden mx-[12px] xl:block">
        <div className="font-bold">{me?.user?.nickname}</div>
        <div>@{me?.user?.id}</div>
      </div>
    </button>
  )
}