"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function SiteHeader() {
  const { name, nav } = siteConfig;
  const pathname = usePathname();

  const navLinks = [
    { href: "/dashboard", label: nav.dashboard },
    { href: "/metodologi", label: nav.about },
  ];

  return (
    <header className="border-b border-rule bg-surface">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 sm:px-6">
        <Link 
          href="/" 
          className="flex h-11 items-center font-bold text-ink hover:opacity-80 transition-opacity"
        >
          {name}
        </Link>
        <nav className="flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center text-sm font-medium transition-colors hover:text-ink ${
                  isActive ? "text-ink" : "text-ink-muted"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-[21px] left-0 h-[2px] w-full bg-accent" />
                )}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
