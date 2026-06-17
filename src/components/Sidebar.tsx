"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const [status, setStatus] = useState({ gmailConnected: false, calendarConnected: false });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/status")
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setStatus(data);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const links = [
    { href: "/chat", label: "AI Assistant", icon: "✨" },
    { href: "/inbox", label: "Inbox", icon: "📥" },
    { href: "/calendar", label: "Calendar", icon: "📅" },
  ];

  const allConnected = status.gmailConnected && status.calendarConnected;

  return (
    <div className="flex h-screen w-64 flex-col border-r border-zinc-800 bg-zinc-950/50 p-4">
      <div className="mb-8 flex items-center gap-3 px-2 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/50">
          M
        </div>
        <span className="text-lg font-semibold tracking-tight text-white">
          Maical
        </span>
      </div>

      <nav className="flex-1 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                  ? "bg-blue-500/10 text-blue-400"
                  : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
                }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-zinc-800 pt-4 space-y-2">
        {!isLoading && !allConnected && (
          <a
            href={status.gmailConnected ? "/api/connect?plugin=googlecalendar" : "/api/connect?plugin=gmail"}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-500/10"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            {status.gmailConnected ? "Connect Calendar" : "Connect Google"}
          </a>
        )}
        {!isLoading && allConnected && (
          <div className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-green-500 bg-green-500/10">
            <span>✅</span>
            Connected
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10"
        >
          <span>🚪</span>
          Sign Out
        </button>
      </div>
    </div>
  );
}
