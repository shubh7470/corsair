"use client";

import { useEffect, useState } from "react";

type Email = {
  id: string;
  snippet: string;
  payload?: any;
};

// --- SVG Icons ---
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
  </svg>
);

const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line>
    <line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line>
    <line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line>
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const ArchiveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line>
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
  </svg>
);

const TagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line>
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const MoreIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle>
  </svg>
);

const StarIcon = ({ filled }: { filled?: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={filled ? "#FBBF24" : "none"} stroke={filled ? "#FBBF24" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const ReplyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 17 4 12 9 7"></polyline><path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
  </svg>
);

const ReplyAllIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="7 17 2 12 7 7"></polyline><polyline points="12 17 7 12 12 7"></polyline><path d="M22 18v-2a4 4 0 0 0-4-4H7"></path>
  </svg>
);

const ForwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 17 20 12 15 7"></polyline><path d="M4 18v-2a4 4 0 0 1 4-4h12"></path>
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

const ChevronLeft = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>;
const ChevronRight = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>;

function decodeBase64Url(base64Url: string) {
  try {
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch (e) {
    return "Error decoding email body.";
  }
}

function extractEmailBody(payload: any): { text: string; html: string } {
  let text = '';
  let html = '';

  function parsePart(part: any) {
    if (part.mimeType === 'text/plain' && part.body?.data) {
      text += decodeBase64Url(part.body.data);
    } else if (part.mimeType === 'text/html' && part.body?.data) {
      html += decodeBase64Url(part.body.data);
    }
    if (part.parts) {
      part.parts.forEach(parsePart);
    }
  }

  if (payload) {
    parsePart(payload);
    if (!text && !html && payload.body?.data) {
      const decoded = decodeBase64Url(payload.body.data);
      if (payload.mimeType === 'text/html') html = decoded;
      else text = decoded;
    }
  }

  return { text, html };
}

export default function InboxPage() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEmails() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/gmail?folder=INBOX`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        const rows = data.data || data || [];
        const mappedEmails = rows.map((row: any) => row.data || row);
        setEmails(mappedEmails);
        if (mappedEmails.length > 0) setSelectedEmail(mappedEmails[0]);
      } catch (error) {
        console.error("Error fetching emails:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchEmails();
  }, []);

  const getHeader = (email: Email, headerName: string) => {
    return email.payload?.headers?.find((h: any) => h.name.toLowerCase() === headerName.toLowerCase())?.value || "Unknown";
  };

  const activeEmailBody = selectedEmail ? extractEmailBody(selectedEmail.payload) : { text: "", html: "" };

  const getInitials = (name: string) => name ? name.charAt(0).toUpperCase() : 'U';

  const avatarColors = ["bg-green-500", "bg-blue-500", "bg-purple-500", "bg-orange-500", "bg-pink-500"];

  return (
    <div className="flex h-full bg-[#0A0A0B] text-white overflow-hidden font-sans">
      
      {/* 1. Middle Column: Email List */}
      <div className={`w-full md:w-[380px] flex-shrink-0 flex-col border-r border-[#1C1C1F] ${selectedEmail ? 'hidden md:flex' : 'flex'}`}>
        
        {/* Header */}
        <div className="px-5 pt-6 pb-4">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-2xl font-semibold">Inbox</h1>
            <div className="flex gap-2">
              <button className="h-9 w-9 flex items-center justify-center rounded-xl bg-[#18181B] border border-[#27272A] text-zinc-300 hover:text-white hover:bg-[#27272A] transition-colors">
                <EditIcon />
              </button>
              <button className="h-9 w-9 flex items-center justify-center rounded-xl bg-[#18181B] border border-[#27272A] text-zinc-300 hover:text-white hover:bg-[#27272A] transition-colors">
                <FilterIcon />
              </button>
            </div>
          </div>
          <p className="text-xs text-zinc-500">128 messages</p>
        </div>

        {/* Search */}
        <div className="px-5 mb-4">
          <div className="relative flex items-center">
            <span className="absolute left-3 text-zinc-500"><SearchIcon /></span>
            <input 
              type="text" 
              placeholder="Search messages..." 
              className="w-full bg-[#131316] border border-[#27272A] rounded-xl py-2 pl-10 pr-4 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="px-5 mb-4 flex gap-2 overflow-x-auto no-scrollbar">
          <button className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-medium shrink-0">All</button>
          <button className="px-4 py-1.5 rounded-lg bg-[#18181B] border border-[#27272A] text-zinc-300 hover:bg-[#27272A] text-xs font-medium shrink-0 flex items-center gap-1.5">
            Unread <span className="bg-[#27272A] px-1.5 py-0.5 rounded text-[10px]">28</span>
          </button>
          <button className="px-4 py-1.5 rounded-lg bg-[#18181B] border border-[#27272A] text-zinc-300 hover:bg-[#27272A] text-xs font-medium shrink-0">Flagged</button>
          <button className="px-4 py-1.5 rounded-lg bg-[#18181B] border border-[#27272A] text-zinc-300 hover:bg-[#27272A] text-xs font-medium shrink-0">Attachments</button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1 custom-scrollbar">
          {isLoading ? (
            [...Array(5)].map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-xl bg-[#131316] mx-2" />
            ))
          ) : emails.length === 0 ? (
            <div className="p-8 text-center text-sm text-zinc-500">No emails found</div>
          ) : (
            emails.map((email, i) => {
              const isSelected = selectedEmail?.id === email.id;
              const senderFull = getHeader(email, "From");
              const senderName = senderFull.split('<')[0].replace(/"/g, '').trim() || "Unknown";
              const dateRaw = getHeader(email, "Date");
              // Parse basic time, mock unread status for demo
              const isUnread = i === 0 || i === 1; 
              const colorClass = avatarColors[i % avatarColors.length];
              
              return (
                <button
                  key={email.id}
                  onClick={() => setSelectedEmail(email)}
                  className={`w-full text-left p-3.5 rounded-2xl transition-all relative group flex gap-3 ${
                    isSelected 
                      ? "bg-[#16161D] border border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.1)]" 
                      : "bg-transparent border border-transparent hover:bg-[#131316]"
                  }`}
                >
                  <div className="shrink-0 pt-0.5">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-medium text-sm ${colorClass}`}>
                      {getInitials(senderName)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1 gap-2">
                      <div className="flex items-center gap-2 truncate">
                        {isUnread && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>}
                        <span className={`font-semibold truncate text-sm ${isSelected ? "text-white" : isUnread ? "text-white" : "text-zinc-300"}`}>
                          {senderName}
                        </span>
                      </div>
                      <span className={`text-[11px] shrink-0 ${isSelected ? "text-indigo-300" : isUnread ? "text-zinc-300" : "text-zinc-500"}`}>
                        {dateRaw.split(" ").slice(1, 3).join(" ")}
                      </span>
                    </div>
                    <div className={`text-xs font-medium truncate mb-1 ${isSelected ? "text-indigo-100" : isUnread ? "text-zinc-200" : "text-zinc-400"}`}>
                      {getHeader(email, "Subject")}
                    </div>
                    <div className="text-xs truncate text-zinc-500 pr-4">
                      {email.snippet}
                    </div>
                  </div>
                  <div className={`absolute right-4 bottom-4 ${i === 0 ? 'text-yellow-500 opacity-100' : 'text-zinc-600 opacity-0 group-hover:opacity-100'} transition-opacity`}>
                     <StarIcon filled={i === 0} />
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* 2. Right Column: Reading Pane */}
      <div className={`flex-1 flex-col bg-[#0A0A0B] overflow-hidden relative md:m-2 md:rounded-2xl md:border border-[#1C1C1F] ${selectedEmail ? 'flex' : 'hidden md:flex'}`}>
        {selectedEmail ? (
          <>
            {/* Top Action Bar */}
            <div className="h-14 flex items-center justify-between px-2 md:px-4 border-b border-[#1C1C1F] shrink-0 bg-[#0E0E12]">
              <div className="flex items-center gap-1 text-zinc-400">
                <button onClick={() => setSelectedEmail(null)} className="w-8 h-8 flex md:hidden items-center justify-center rounded hover:bg-[#18181B] transition-colors text-white"><ArrowLeftIcon /></button>
                <button className="w-8 h-8 hidden md:flex items-center justify-center rounded hover:bg-[#18181B] transition-colors"><ArrowLeftIcon /></button>
                <div className="w-px h-4 bg-zinc-800 mx-1 md:mx-2"></div>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#18181B] transition-colors"><ArchiveIcon /></button>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#18181B] transition-colors"><TrashIcon /></button>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#18181B] transition-colors"><FolderIcon /></button>
                <button className="w-8 h-8 hidden sm:flex items-center justify-center rounded hover:bg-[#18181B] transition-colors"><TagIcon /></button>
                <button className="w-8 h-8 hidden sm:flex items-center justify-center rounded hover:bg-[#18181B] transition-colors"><ClockIcon /></button>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#18181B] transition-colors"><MoreIcon /></button>
              </div>
              <div className="flex items-center gap-2 text-zinc-500">
                <span className="text-xs mr-2">1 of 128</span>
                <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#18181B] transition-colors"><ChevronLeft /></button>
                <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#18181B] transition-colors"><ChevronRight /></button>
              </div>
            </div>

            {/* Email Header Area */}
            <div className="px-5 md:px-10 py-6 md:py-8 bg-[#0A0A0B] shrink-0">
              <div className="flex items-start justify-between mb-6">
                <h1 className="text-xl md:text-2xl font-semibold text-white flex items-center gap-3 flex-wrap">
                  {getHeader(selectedEmail, "Subject")}
                  <span className="text-[10px] md:text-xs font-medium bg-indigo-500/20 text-indigo-300 px-2 md:px-2.5 py-1 rounded-md border border-indigo-500/30 flex items-center gap-1">
                    Work <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </span>
                </h1>
                <button className="hidden sm:flex items-center gap-2 bg-[#312E81] hover:bg-indigo-800 text-indigo-100 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors shrink-0">
                  <ReplyIcon /> Reply <span className="ml-1 opacity-60">v</span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-medium">
                    {getInitials(getHeader(selectedEmail, "From").split('<')[0].replace(/"/g, '').trim())}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-zinc-100">{getHeader(selectedEmail, "From").split('<')[0].replace(/"/g, '').trim()}</span>
                      <span className="text-xs text-zinc-500">&lt;{getHeader(selectedEmail, "From").match(/<([^>]+)>/)?.[1] || "email"}&gt;</span>
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5">to me v</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-zinc-500">
                  <span className="text-xs">{getHeader(selectedEmail, "Date")}</span>
                  <button className="hover:text-yellow-500 transition-colors"><StarIcon filled={true} /></button>
                  <button className="hover:text-white transition-colors"><ReplyIcon /></button>
                  <button className="hover:text-white transition-colors"><MoreIcon /></button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 md:px-10 pb-10 custom-scrollbar relative">
              {/* AI Summary Block (Mocked) */}
              <div className="mb-6 md:mb-8 rounded-xl bg-gradient-to-r from-[#1E1B4B] to-[#17172B] p-4 md:p-5 border border-indigo-500/20 shadow-inner">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-indigo-400"><SparklesIcon /></span>
                  <h3 className="text-sm font-semibold text-indigo-100">Maical AI Summary <span className="text-[10px] bg-indigo-500/30 px-1.5 py-0.5 rounded text-indigo-300 ml-1">BETA</span></h3>
                </div>
                <p className="text-sm text-indigo-50/80 leading-relaxed mb-4">
                  The sender shared the latest project update and outlined next steps. The design phase is 98% complete and development starts tomorrow.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs bg-indigo-950 border border-indigo-800 text-indigo-200 px-3 py-1 rounded-full cursor-pointer hover:bg-indigo-900 transition-colors">Project Update</span>
                  <span className="text-xs bg-indigo-950 border border-indigo-800 text-indigo-200 px-3 py-1 rounded-full cursor-pointer hover:bg-indigo-900 transition-colors">Next Steps</span>
                  <span className="hidden sm:inline-flex text-xs bg-indigo-950 border border-indigo-800 text-indigo-200 px-3 py-1 rounded-full cursor-pointer hover:bg-indigo-900 transition-colors">Design 98% Complete</span>
                  <span className="text-xs text-indigo-400 px-3 py-1 cursor-pointer hover:text-indigo-300 transition-colors">Show more v</span>
                </div>
              </div>

              {/* Email Body */}
              <div className="mb-10 text-sm text-zinc-300">
                {activeEmailBody.html ? (
                  <div 
                    className="prose prose-invert max-w-none [&>p]:mb-4 [&>ul]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 text-[15px] leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: activeEmailBody.html }} 
                  />
                ) : (
                  <pre className="whitespace-pre-wrap font-sans text-[15px] leading-relaxed max-w-4xl text-zinc-300">
                    {activeEmailBody.text || "No content to display."}
                  </pre>
                )}
              </div>

              {/* Mock Attachments */}
              <div className="mb-10 border-t border-zinc-800 pt-6">
                <p className="text-xs font-medium text-zinc-500 mb-4">2 Attachments</p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-3 bg-[#131316] border border-[#27272A] rounded-xl p-3 w-64 cursor-pointer hover:bg-[#18181B] transition-colors">
                    <div className="w-10 h-10 rounded bg-red-500/10 text-red-500 flex items-center justify-center font-bold text-xs shrink-0">PDF</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-200 truncate">Project_Overview.pdf</p>
                      <p className="text-xs text-zinc-500">2.4 MB</p>
                    </div>
                    <button className="text-zinc-500 hover:text-zinc-300"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></button>
                  </div>
                  <div className="flex items-center gap-3 bg-[#131316] border border-[#27272A] rounded-xl p-3 w-64 cursor-pointer hover:bg-[#18181B] transition-colors">
                    <div className="w-10 h-10 rounded bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-xs shrink-0">DOC</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-200 truncate">Timeline_Updated.docx</p>
                      <p className="text-xs text-zinc-500">1.1 MB</p>
                    </div>
                    <button className="text-zinc-500 hover:text-zinc-300"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></button>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center gap-3 mt-auto">
                <button className="flex items-center gap-2 bg-[#312E81] hover:bg-indigo-800 text-indigo-100 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
                  <ReplyIcon /> Reply
                </button>
                <button className="flex items-center gap-2 bg-transparent border border-zinc-700 hover:border-zinc-500 text-zinc-300 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
                  <ReplyAllIcon /> Reply all
                </button>
                <button className="flex items-center gap-2 bg-transparent border border-zinc-700 hover:border-zinc-500 text-zinc-300 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
                  <ForwardIcon /> Forward
                </button>
                <div className="flex-1"></div>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-700 text-zinc-400 hover:text-white transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-zinc-500">
            <div className="w-16 h-16 mb-4 rounded-full bg-[#131316] flex items-center justify-center">
              <svg className="w-8 h-8 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p>Select an email to read</p>
          </div>
        )}
      </div>

    </div>
  );
}
