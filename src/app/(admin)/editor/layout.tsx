import Sidebar from "@/components/sidebar";
import React from "react";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-gray-50 w-screen h-screen">
      <Sidebar />
      <main className="size-full relative z-0 flex flex-col">{children}</main>
    </section>
  );
}
