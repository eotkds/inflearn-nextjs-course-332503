"use client";
import { usePathname } from "next/navigation";
import SearchForm from "./SearchForm";


export default function RightSearchZone() {
    const pathname = usePathname();
    const onChangeAll = () => {}
    const onChangeFollow = () => {}

    if (pathname === "/explore") return null;

    if(pathname === "/search") {
        return (
            <div>
              <h5 className="bg-white py-[12px] px-[16px] text-[rgba(15,20,25,1.00)] font-bold mb-[16px] rounded-[16px] border border-[rgb(239,243,244)] mt-[12px]">검색 필터</h5>
              <div className="px-[16px] pb-[12px] mb-[16px] rounded-[16px] border border-[rgb(239,243,244)]">
                <div>
                  <label className="text-[15px] font-bold h-[36px] flex items-center">사용자</label>
                  <div className="flex">
                    <div className="flex-1">모든 사용자</div>
                    <input type="radio" name="pf" defaultChecked onChange={onChangeAll} />
                  </div>
                  <div className="flex">
                    <div className="flex-1">내가 팔로우하는 사람들</div>
                    <input type="radio" name="pf" value="on" onChange={onChangeFollow} />
                  </div>
                </div>
              </div>
            </div>
          );
    }
    return(
        <div className="w-[inherit] mb-[60px]">
          <SearchForm />
        </div>
    );
}