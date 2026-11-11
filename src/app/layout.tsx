import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Telusurin",
    template: "%s | Telusurin",
  },
  description:
    "Bandingkan layanan publik antardaerah, lengkap dengan sumber dan batas datanya.",
  openGraph: {
    title: "Telusurin",
    description:
      "Bandingkan layanan publik antardaerah, lengkap dengan sumber dan batas datanya.",
    type: "website",
    locale: "id_ID",
    siteName: "Telusurin",
  },
  twitter: {
    card: "summary_large_image",
    title: "Telusurin",
    description:
      "Bandingkan layanan publik antardaerah, lengkap dengan sumber dan batas datanya.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var t=localStorage.getItem("telusurin-theme");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t}}catch(e){}',
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-white" style={{
        backgroundImage: `radial-gradient(var(--rule) 1px, transparent 1px)`,
        backgroundSize: `24px 24px`
      }}>
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
