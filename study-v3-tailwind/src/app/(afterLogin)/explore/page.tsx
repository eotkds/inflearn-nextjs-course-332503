import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import TrendSection from "./_component/TrendSection";

export default function ExplorePage() {
  return (
    <main className="w-[600px] border-[rgb(239,243,244)] border-r border-l border-r-solid border-l-solid flex flex-col items-stretch">
      <div className="w-[inherit] mb-[60px]">
        <SearchForm />
      </div>
      <div className="text-[20px] font-bold pt-[12px] border-t border-[rgb(239,243,244)]">
        <h3 className="mt-[12px] px-[16px]">나를 위한 트랜드</h3>
        <TrendSection />
      </div>
    </main>
  );
}
