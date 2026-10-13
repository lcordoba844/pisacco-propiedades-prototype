export default function StandaloneLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <main className="bg-white rounded shadow p-6">
        {children}
      </main>
    </div>
  );
}