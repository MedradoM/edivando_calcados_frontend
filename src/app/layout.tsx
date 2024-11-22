import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthenticationProvider } from "@/contexts/Authentication";

// const inter = Inter({ subsets: ["latin"] });

const roboto = Roboto({ subsets: ["latin"], weight: ['100', '300', "400", "500", "700", "900"] });


export const metadata: Metadata = {
  title: "Edivando calçados e Acessórios",
  description: "Conforto e beleza para seus pés, tudo em um único lugar!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-slate-50">
      <body className={roboto.className}>
        <AuthenticationProvider>{children}</AuthenticationProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
