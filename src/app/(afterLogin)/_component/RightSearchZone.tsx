"use client";
import style from "./rightSearchZone.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchForm from "./SearchForm";

export default function RightSearchZone() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const newSearchParams = new URLSearchParams(searchParams);


    const onChangeFollow = () => {
      newSearchParams.set('pf', 'on');
      const url = `/search?${newSearchParams.toString()}`;
      router.replace(url);
    }

    const onChangeAll = () => {
        newSearchParams.delete('pf');
        const url = `/search?${newSearchParams.toString()}`;
        router.replace(url);
    }

    

    if(pathname === "/explore"){
        return null;
    }


   
    if (pathname === '/search') {
        return (
          <div>
            <h5 className={style.filterTitle}>검색 필터</h5>
            <div className={style.filterSection}>
              <div>
                <label>사용자</label>
                <div className={style.radio}>
                  <div>모든 사용자</div>
                  <input type="radio" name="pf" defaultChecked onChange={onChangeAll} />
                </div>
                <div className={style.radio}>
                  <div>내가 팔로우하는 사람들</div>
                  <input type="radio" name="pf" value="on" onChange={onChangeFollow} />
                </div>
              </div>
            </div>
          </div>
        );
      }

    return (
        <div style={{marginBottom: '60px', width: 'inherit'}}>
          <SearchForm />
        </div>
    )
}