export default function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>AfterLoginLayout</h1>
      {children}
    </div>
  );
}