import Sidebar from "@/components/sidebar";
import React from "react";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-gray-50 size-full">
      <Sidebar />
      <main className="size-full bg-slate-50 relative z-0 flex flex-col">
        {children}
      </main>
    </section>
  );
}
