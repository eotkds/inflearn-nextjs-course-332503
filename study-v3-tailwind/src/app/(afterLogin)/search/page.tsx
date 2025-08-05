import BackButton from "@/app/(afterLogin)/_component/BackButton";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import Tab from "./_component/Tab";
import SearchResult from "./_component/SearchResult";

type Props = {
  searchParams: Promise<{ q: string; f?: string; pf?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const query = await searchParams;
  const searchP = await searchParams;
  console.log(searchP);

  return (
    <main className="w-[600px] border-[rgb(239,243,244)] border-r border-l border-solid flex flex-col items-stretch">
      <div className="w-[598px] bg-[rgba(255,255,255,0.85)] backdrop-blur-[12px] border-[rgb(239,243,244)] border-b border-solid fixed z-1">
        <div className="flex items-center">
          <div className="w-[56px]">
            <BackButton />
          </div>
          <div className="flex-1 h-[53px] w-[526px]">
            <SearchForm q={query.q} pf={query.pf} f={query.f} />
          </div>
        </div>
        <Tab />
      </div>
      <div className="mt-[110px]">
        <SearchResult searchParams={query} />
      </div>
    </main>
  );
}
