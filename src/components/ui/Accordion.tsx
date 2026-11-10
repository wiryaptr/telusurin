import type { ReactNode } from "react";

interface AccordionProps {
  title: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function Accordion({ title, children, className = "", contentClassName = "" }: AccordionProps) {
  return (
    <details
      className={`group relative rounded-2xl bg-white shadow-sm border border-rule transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${className}`}
    >
      <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl">
        <h3 className="text-xl font-bold text-ink">{title}</h3>
        <svg
          className="h-5 w-5 shrink-0 text-ink-muted transition-transform duration-300 group-open:rotate-180"
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
      </summary>
      <div className="grid grid-rows-[0fr] transition-all duration-300 group-open:grid-rows-[1fr]">
        <div className={`overflow-hidden ${contentClassName}`}>{children}</div>
      </div>
    </details>
  );
}
