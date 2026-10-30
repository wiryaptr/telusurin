import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Telusurin",
  description:
    "Bandingkan layanan publik antardaerah, lengkap dengan sumber dan batas datanya.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id">
      <body className="flex min-h-full flex-col bg-white" style={{
        backgroundImage: `radial-gradient(#d9d4c7 1px, transparent 1px)`,
        backgroundSize: `24px 24px`
      }}>
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
