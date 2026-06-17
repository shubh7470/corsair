"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

// --- SVG Icons ---
const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

const InboxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const LogOutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </svg>
);


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
    { href: "/chat", label: "AI Assistant", icon: <SparklesIcon /> },
    { href: "/inbox", label: "Inbox", icon: <InboxIcon /> },
    { href: "/calendar", label: "Calendar", icon: <CalendarIcon /> },
  ];

  const allConnected = status.gmailConnected && status.calendarConnected;

  return (
    <div className="flex h-screen w-64 flex-col border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 p-4">
      {/* Brand Header */}
      <div className="mb-8 flex items-center gap-3 px-2 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm shadow-blue-500/20">
          M
        </div>
        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Maical
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 shadow-sm"
                  : "text-gray-600 dark:text-zinc-400 hover:bg-white hover:text-gray-900 hover:shadow-sm dark:hover:bg-zinc-800/50 dark:hover:text-white"
                }`}
            >
              <span className={isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-zinc-500"}>
                {link.icon}
              </span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto border-t border-zinc-200 dark:border-zinc-800 pt-6 space-y-3 pb-2">
        {!isLoading && !allConnected && (
          <a
            href={status.gmailConnected ? "/api/connect?plugin=googlecalendar" : "/api/connect?plugin=gmail"}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white bg-blue-600 transition-all hover:bg-blue-700 hover:shadow-md shadow-sm"
          >
            <svg className="w-4 h-4 bg-white rounded-full p-[1px]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            {status.gmailConnected ? "Connect Calendar" : "Connect Google"}
          </a>
        )}
        {!isLoading && allConnected && (
          <div className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20">
            <span className="text-green-600 dark:text-green-400"><CheckIcon /></span>
            All Connected
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-zinc-400 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 group"
        >
          <span className="text-gray-400 group-hover:text-red-500 dark:text-zinc-500 dark:group-hover:text-red-400 transition-colors"><LogOutIcon /></span>
          Sign Out
        </button>
      </div>
    </div>
  );
}
