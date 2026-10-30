"use client";

import { useState } from "react";

export function NotificationBanner({ message }: { message: string }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="mb-8 p-4 bg-status-belum-bg border border-rule rounded-sm text-status-belum-fg flex items-start gap-3">
      <p className="text-sm flex-1">{message}</p>
      <button
        onClick={() => setIsVisible(false)}
        className="p-1 hover:bg-black/5 rounded-sm transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
        aria-label="Tutup pemberitahuan"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
  );
}
