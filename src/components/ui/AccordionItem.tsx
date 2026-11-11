"use client";

import { useId, useState, type ReactNode } from "react";

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  badge?: string;
}

export function AccordionItem({ title, children, defaultOpen = false, badge }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const buttonId = useId();
  const contentId = useId();

  return (
    <div className="border-b border-rule last:border-b-0">
      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((prev) => !prev)}
        className="flex min-h-[44px] w-full items-center justify-between gap-4 rounded-md px-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        <span className="flex min-w-0 items-baseline gap-2">
          <span className="text-base font-bold text-ink">{title}</span>
          {badge ? <span className="hidden text-xs font-medium text-ink-muted md:inline">{badge}</span> : null}
        </span>
        <svg
          className={`h-5 w-5 shrink-0 text-ink-muted transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden min-h-0" inert={!open}>
          {children}
        </div>
      </div>
    </div>
  );
}
