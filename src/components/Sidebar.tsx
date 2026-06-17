"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/chat", label: "AI Assistant", icon: "✨" },
    { href: "/inbox", label: "Inbox", icon: "📥" },
    { href: "/calendar", label: "Calendar", icon: "📅" },
  ];

  return (
    <div className="flex h-screen w-64 flex-col border-r border-zinc-800 bg-zinc-950/50 p-4">
      <div className="mb-8 flex items-center gap-3 px-2 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/50">
          M
        </div>
        <span className="text-lg font-semibold tracking-tight text-white">
          MailMind
        </span>
      </div>

      <nav className="flex-1 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
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

      <div className="mt-auto border-t border-zinc-800 pt-4">
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
