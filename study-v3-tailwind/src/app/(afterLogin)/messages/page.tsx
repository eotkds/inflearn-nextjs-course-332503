import Room from "./_component/Room";

export default function MessagePage() {
  return (
    <main className="w-[600px] min-h-[100dvh] border-[rgb(239,243,244)] border-r border-l border-solid flex flex-col items-stretch">
      <div className="h-[53px] flex items-center px-[16px]">
        <h3 className="text-[20px] font-bold">쪽지</h3>
      </div>
      <Room/>
      <Room/>
      <Room/>
      <Room/>
      <Room/>
      <Room/>
    </main>
  )
}