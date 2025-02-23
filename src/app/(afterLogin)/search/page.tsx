import style from "./search.module.css";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";

import Tab from "./_component/Tab";
import SearchResult from "./_component/SearchResult";

type Props = {
  searchParams: Promise<{q: string, f?: string, pf?: string}>
}

export default async function SearchPage({searchParams}: Props) {
   const query = await searchParams; // next15 버전 에서는 이렇게 사용

    return (
        <main className={style.main}>
        <div className={style.searchTop}>
          <div className={style.searchZone}>
            <div className={style.buttonZone}>
              <BackButton/>
            </div>
            <div className={style.formZone}>
              <SearchForm q={query.q} pf={query.pf} f={query.f} />
            </div>
          </div>
          <Tab/>
        </div>
        <div className={style.list}>
          <SearchResult searchParams={query} />
        </div>
      </main>
    );
}