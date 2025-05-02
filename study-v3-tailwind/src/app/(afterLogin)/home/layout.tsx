export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>HomeLayout</h1>
      {children}
    </div>
  );
}