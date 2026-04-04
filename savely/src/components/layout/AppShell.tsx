import { useState } from "react";
import { Sidebar } from "./Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<string>("");

  const handleNavigate = (item: string) => {
    setActive(item);
  };

  return (
    <div className="flex min-h-screen bg-neutral-100">
      <Sidebar active={active} onNavigate={handleNavigate} />

      <main className="flex-1 p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}