"use client";

import { useEffect, useState } from "react";

type Email = {
  id: string;
  snippet: string;
  payload?: any;
};

const FOLDERS = [
  { id: "INBOX", label: "Inbox", icon: "📥" },
  { id: "STARRED", label: "Starred", icon: "⭐" },
  { id: "SENT", label: "Sent", icon: "📤" },
  { id: "DRAFT", label: "Drafts", icon: "📝" },
  { id: "TRASH", label: "Bin", icon: "🗑️" },
];

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
  const [selectedFolder, setSelectedFolder] = useState("INBOX");
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEmails() {
      setIsLoading(true);
      setSelectedEmail(null);
      try {
        const res = await fetch(`/api/gmail?folder=${selectedFolder}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        const rows = data.data || data || [];
        const mappedEmails = rows.map((row: any) => row.data || row);
        setEmails(mappedEmails);
      } catch (error) {
        console.error("Error fetching emails:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchEmails();
  }, [selectedFolder]);

  const getHeader = (email: Email, headerName: string) => {
    return email.payload?.headers?.find((h: any) => h.name.toLowerCase() === headerName.toLowerCase())?.value || "Unknown";
  };

  const activeEmailBody = selectedEmail ? extractEmailBody(selectedEmail.payload) : { text: "", html: "" };

  return (
    <div className="flex h-full bg-zinc-950 text-white overflow-hidden">
      
      {/* 1. Folders Sidebar */}
      <div className="w-56 flex-shrink-0 border-r border-zinc-800 bg-zinc-950 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800 shrink-0">
          <h2 className="text-lg font-medium">Mailboxes</h2>
        </div>
        <div className="p-3 space-y-1 overflow-y-auto">
          {FOLDERS.map((folder) => (
            <button
              key={folder.id}
              onClick={() => setSelectedFolder(folder.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFolder === folder.id
                  ? "bg-indigo-500/10 text-indigo-400"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
              }`}
            >
              <span>{folder.icon}</span>
              {folder.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Email List */}
      <div className="w-80 flex-shrink-0 border-r border-zinc-800 bg-zinc-900/20 flex flex-col">
        <div className="h-16 flex items-center px-4 border-b border-zinc-800 shrink-0 bg-zinc-950/50">
          <h2 className="text-sm font-medium text-zinc-400">
            {FOLDERS.find(f => f.id === selectedFolder)?.label}
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {isLoading ? (
            [...Array(5)].map((_, i) => (
              <div key={i} className="h-20 animate-pulse rounded-lg bg-zinc-800/50" />
            ))
          ) : emails.length === 0 ? (
            <div className="p-4 text-center text-sm text-zinc-500">No emails found</div>
          ) : (
            emails.map((email) => {
              const isSelected = selectedEmail?.id === email.id;
              return (
                <button
                  key={email.id}
                  onClick={() => setSelectedEmail(email)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    isSelected ? "bg-indigo-500 text-white" : "hover:bg-zinc-800 text-zinc-300"
                  }`}
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-medium truncate pr-2 text-sm">
                      {getHeader(email, "From").split('<')[0].trim()}
                    </span>
                    <span className={`text-xs flex-shrink-0 ${isSelected ? "text-indigo-200" : "text-zinc-500"}`}>
                      {getHeader(email, "Date").split(" ").slice(1, 3).join(" ")}
                    </span>
                  </div>
                  <div className={`text-sm truncate mb-1 ${isSelected ? "text-indigo-100" : "text-zinc-200"}`}>
                    {getHeader(email, "Subject")}
                  </div>
                  <div className={`text-xs truncate ${isSelected ? "text-indigo-200/80" : "text-zinc-500"}`}>
                    {email.snippet}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* 3. Reading Pane */}
      <div className="flex-1 flex flex-col bg-zinc-950 overflow-hidden relative">
        {selectedEmail ? (
          <>
            <div className="h-auto min-h-[4rem] flex flex-col justify-center px-8 py-4 border-b border-zinc-800 shrink-0 bg-zinc-950">
              <h1 className="text-xl font-semibold mb-2">{getHeader(selectedEmail, "Subject")}</h1>
              <div className="flex justify-between items-center text-sm text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-zinc-200">{getHeader(selectedEmail, "From")}</span>
                  <span>to {getHeader(selectedEmail, "To")}</span>
                </div>
                <span>{getHeader(selectedEmail, "Date")}</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {activeEmailBody.html ? (
                <div 
                  className="prose prose-invert max-w-none bg-white text-black p-8 rounded-xl shadow-inner min-h-full"
                  dangerouslySetInnerHTML={{ __html: activeEmailBody.html }} 
                />
              ) : (
                <pre className="whitespace-pre-wrap font-sans text-sm text-zinc-300 leading-relaxed max-w-4xl">
                  {activeEmailBody.text || "No content to display."}
                </pre>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-zinc-500">
            <div className="w-16 h-16 mb-4 rounded-full bg-zinc-900 flex items-center justify-center">
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
