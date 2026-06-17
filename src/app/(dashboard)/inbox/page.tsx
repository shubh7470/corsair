"use client";

import { useEffect, useState } from "react";

type Email = {
  id: string;
  snippet: string;
  payload?: {
    headers: { name: string; value: string }[];
  };
};

export default function InboxPage() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEmails() {
      try {
        const res = await fetch("/api/gmail");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        // Corsair db.messages.search typically returns data in a 'data' array or directly as the array.
        // Adjust depending on the exact structure, assuming the raw array or data.data here:
        setEmails(data.data || data || []);
      } catch (error) {
        console.error("Error fetching emails:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchEmails();
  }, []);

  const getHeader = (email: Email, headerName: string) => {
    return email.payload?.headers?.find((h) => h.name.toLowerCase() === headerName.toLowerCase())?.value || "Unknown";
  };

  return (
    <div className="flex h-full flex-col bg-zinc-950">
      <header className="flex h-16 shrink-0 items-center border-b border-zinc-800 px-6">
        <h1 className="text-lg font-medium text-white">Inbox</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-4xl">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-24 animate-pulse rounded-xl bg-zinc-900/50 ring-1 ring-white/5" />
              ))}
            </div>
          ) : emails.length === 0 ? (
            <div className="mt-20 text-center text-zinc-500">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 ring-1 ring-zinc-800">
                📥
              </div>
              <p>No recent emails found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {emails.map((email) => (
                <div
                  key={email.id}
                  className="group relative cursor-pointer rounded-xl bg-zinc-900/40 p-5 transition-all hover:bg-zinc-800/60 ring-1 ring-white/5 hover:ring-white/10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <p className="truncate font-medium text-zinc-200">
                          {getHeader(email, "From")}
                        </p>
                        <span className="shrink-0 text-xs text-zinc-500">
                          {getHeader(email, "Date").split(" ").slice(0, 4).join(" ")}
                        </span>
                      </div>
                      <p className="mt-1 truncate font-medium text-white">
                        {getHeader(email, "Subject")}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
                        {email.snippet}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
