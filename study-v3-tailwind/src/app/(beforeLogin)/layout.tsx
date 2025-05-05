export default function beforeLoginLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <div className="flex flex-row bg-(--color-background-end-rgb) w-[100dvw] h-[100dvh]">
      <h1>beforeLoginLayout</h1>
      {children}
      {modal}
    </div>
  )
}