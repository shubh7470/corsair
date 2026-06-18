"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
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

const DraftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

const PanelRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 hover:text-white transition-colors cursor-pointer">
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <line x1="15" x2="15" y1="3" y2="21" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const ViewIcons = {
  primary: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
  social: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  updates: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>,
  promotions: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>,
  forums: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>,
};

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [dashboardData, setDashboardData] = useState({ unreadEmails: 0, todayEvents: [] });
  const [status, setStatus] = useState({ gmailConnected: false, calendarConnected: false });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/api/status")
      .then(res => res.json())
      .then(data => {
        if (!data.error) setStatus(data);
      })
      .catch(console.error);

    fetch("/api/dashboard")
      .then(res => res.json())
      .then(data => {
        if (!data.error) setDashboardData(data);
      })
      .catch(console.error);
  }, []);

  const links = [
    { href: "/chat", label: "AI Assist", icon: <SparklesIcon /> },
    { href: "/inbox", label: "Inbox", icon: <InboxIcon /> },
    { href: "/calendar", label: "Calendar", icon: <CalendarIcon /> },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-[#1C1C1F] bg-[#0A0A0B] shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-lg shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            M
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Maical</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(true)} className="text-zinc-300 hover:text-white">
          <MenuIcon />
        </button>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar Drawer */}
      <div className={`fixed inset-y-0 left-0 z-50 flex h-full w-[280px] flex-col border-r border-[#1C1C1F] bg-[#0A0A0B] text-zinc-300 p-5 font-sans transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Brand Header */}
        <div className="mb-8 flex items-center justify-between px-1 hidden md:flex">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-lg shadow-[0_0_15px_rgba(99,102,241,0.5)]">
              M
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Maical
            </span>
          </div>
          <PanelRightIcon />
        </div>
        
        {/* Mobile Close Button (Optional, clicking overlay works too, but good UX) */}
        <div className="mb-8 flex items-center justify-between px-1 md:hidden">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Menu</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-500 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

      {/* Navigation Links */}
      <nav className="space-y-1.5 mb-8">
        {links.map((link) => {
          const isActive = pathname === link.href || (link.href === "/chat" && pathname === "/");
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-[0_4px_20px_rgba(99,102,241,0.3)]"
                  : "text-zinc-400 hover:bg-[#18181B] hover:text-white"
                }`}
            >
              <span className={isActive ? "text-white" : "text-zinc-500"}>
                {link.icon}
              </span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Conditionally Render Bottom Sections */}
      {pathname !== "/inbox" ? (
        <>
          {/* Quick Actions */}
          <div className="mb-8 px-1">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Quick Actions</h3>
            <div className="space-y-1">
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 hover:bg-[#18181B] transition-colors">
                <span className="text-pink-500"><InboxIcon /></span>
                Summarize Emails
              </button>
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 hover:bg-[#18181B] transition-colors">
                <span className="text-purple-500"><CalendarIcon /></span>
                Schedule Meeting
              </button>
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 hover:bg-[#18181B] transition-colors">
                <span className="text-blue-500"><DraftIcon /></span>
                Draft Email
              </button>
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 hover:bg-[#18181B] transition-colors">
                <span className="text-green-500"><CheckCircleIcon /></span>
                Create Task
              </button>
            </div>
          </div>

          {/* Today's Overview */}
          <div className="px-1 flex-1">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Today's Overview</h3>
            <div className="space-y-1">
              <div className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300">
                <div className="flex items-center gap-3">
                  <span className="text-blue-500"><InboxIcon /></span>
                  Emails
                </div>
                <span className="text-zinc-500 text-xs">{dashboardData.unreadEmails} unread</span>
              </div>
              <div className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300">
                <div className="flex items-center gap-3">
                  <span className="text-red-500"><CalendarIcon /></span>
                  Meetings
                </div>
                <span className="text-zinc-500 text-xs">{dashboardData.todayEvents.length} today</span>
              </div>
              <div className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300">
                <div className="flex items-center gap-3">
                  <span className="text-green-500"><CheckCircleIcon /></span>
                  Tasks
                </div>
                <span className="text-zinc-500 text-xs">0 pending</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Smart Views */}
          <div className="mb-8 px-1">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Smart Views</h3>
            <div className="space-y-1">
              <button className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 hover:bg-[#18181B] transition-colors bg-indigo-500/10 text-indigo-400">
                <div className="flex items-center gap-3"><span className="text-indigo-400"><ViewIcons.primary /></span>Primary</div>
                <span className="text-xs font-bold text-indigo-400 bg-indigo-500/20 px-2 py-0.5 rounded-full">24</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 hover:bg-[#18181B] transition-colors hover:text-white">
                <div className="flex items-center gap-3"><span className="text-blue-400"><ViewIcons.social /></span>Social</div>
                <span className="text-xs font-bold text-zinc-500">15</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 hover:bg-[#18181B] transition-colors hover:text-white">
                <div className="flex items-center gap-3"><span className="text-orange-400"><ViewIcons.updates /></span>Updates</div>
                <span className="text-xs font-bold text-zinc-500">8</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 hover:bg-[#18181B] transition-colors hover:text-white">
                <div className="flex items-center gap-3"><span className="text-green-400"><ViewIcons.promotions /></span>Promotions</div>
                <span className="text-xs font-bold text-zinc-500">6</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 hover:bg-[#18181B] transition-colors hover:text-white">
                <div className="flex items-center gap-3"><span className="text-purple-400"><ViewIcons.forums /></span>Forums</div>
                <span className="text-xs font-bold text-zinc-500">3</span>
              </button>
            </div>
          </div>

          {/* Labels */}
          <div className="px-1 flex-1">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Labels</h3>
            <div className="space-y-1">
              <div className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-[#18181B] cursor-pointer">
                <div className="flex items-center gap-3"><div className="h-2.5 w-2.5 rounded-sm bg-blue-500"></div>Work</div>
                <span className="text-zinc-500 text-xs">12</span>
              </div>
              <div className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-[#18181B] cursor-pointer">
                <div className="flex items-center gap-3"><div className="h-2.5 w-2.5 rounded-sm bg-green-500"></div>Personal</div>
                <span className="text-zinc-500 text-xs">8</span>
              </div>
              <div className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-[#18181B] cursor-pointer">
                <div className="flex items-center gap-3"><div className="h-2.5 w-2.5 rounded-sm bg-orange-500"></div>Finance</div>
                <span className="text-zinc-500 text-xs">6</span>
              </div>
              <div className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-[#18181B] cursor-pointer">
                <div className="flex items-center gap-3"><div className="h-2.5 w-2.5 rounded-sm bg-red-500"></div>Important</div>
                <span className="text-zinc-500 text-xs">4</span>
              </div>
              <div className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-500 hover:text-zinc-300 cursor-pointer mt-2">
                <PlusIcon /> Add Label
              </div>
            </div>
          </div>
        </>
      )}

      {/* Bottom Section: Profile */}
      <div className="mt-auto pt-4 flex flex-col gap-4">
        {(!status.gmailConnected || !status.calendarConnected) && (
           <a
             href={status.gmailConnected ? "/api/connect?plugin=googlecalendar" : "/api/connect?plugin=gmail"}
             className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-white bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30 transition-all"
           >
             {status.gmailConnected ? "Connect Calendar" : "Connect Google"}
           </a>
        )}
        
        <div className="flex items-center justify-between group cursor-pointer hover:bg-[#18181B] p-2 rounded-xl transition-colors" onClick={() => signOut({ callbackUrl: "/" })}>
          <div className="flex items-center gap-3 overflow-hidden">
            {session?.user?.image ? (
              <img src={session.user.image} alt="User" className="h-9 w-9 rounded-full object-cover border border-zinc-700" />
            ) : (
              <div className="h-9 w-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-400">
                U
              </div>
            )}
            <div className="flex flex-col truncate">
              <span className="text-sm font-medium text-white truncate">{session?.user?.name || 'User'}</span>
              <span className="text-xs text-zinc-500 truncate">{session?.user?.email || 'user@example.com'}</span>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600 shrink-0">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
        
        <div className="flex items-center px-2">
           <MoonIcon />
        </div>
      </div>
    </div>
    </>
  );
}
