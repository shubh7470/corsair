"use client";

import { useEffect, useState } from "react";

type CalendarEvent = {
  id: string;
  summary: string;
  description?: string;
  start?: { dateTime?: string; date?: string };
  end?: { dateTime?: string; date?: string };
  attendees?: { email: string; responseStatus: string }[];
};

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/calender");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        // Adjust depending on exact return structure
        setEvents(data.data || data || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const formatDateTime = (dateObj?: { dateTime?: string; date?: string }) => {
    if (!dateObj) return "TBD";
    const str = dateObj.dateTime || dateObj.date;
    if (!str) return "TBD";
    const date = new Date(str);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="flex h-full flex-col bg-zinc-950">
      <header className="flex h-16 shrink-0 items-center border-b border-zinc-800 px-6">
        <h1 className="text-lg font-medium text-white">Calendar Events</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-4xl">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 animate-pulse rounded-xl bg-zinc-900/50 ring-1 ring-white/5" />
              ))}
            </div>
          ) : events.length === 0 ? (
            <div className="mt-20 text-center text-zinc-500">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 ring-1 ring-zinc-800">
                📅
              </div>
              <p>No upcoming events found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="group relative rounded-xl bg-zinc-900/40 p-5 transition-all hover:bg-zinc-800/60 ring-1 ring-white/5 hover:ring-white/10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h2 className="truncate text-lg font-medium text-white">
                        {event.summary || "Untitled Event"}
                      </h2>
                      
                      <div className="mt-3 flex items-center gap-6 text-sm text-zinc-400">
                        <div className="flex items-center gap-2">
                          <span>🕒</span>
                          <span>{formatDateTime(event.start)} - {formatDateTime(event.end)}</span>
                        </div>
                      </div>

                      {event.attendees && event.attendees.length > 0 && (
                        <div className="mt-4">
                          <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                            Attendees
                          </h3>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {event.attendees.map((a, i) => (
                              <span
                                key={i}
                                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                                  a.responseStatus === "accepted"
                                    ? "bg-emerald-400/10 text-emerald-400 ring-emerald-400/20"
                                    : a.responseStatus === "declined"
                                    ? "bg-red-400/10 text-red-400 ring-red-400/20"
                                    : "bg-zinc-400/10 text-zinc-400 ring-zinc-400/20"
                                }`}
                              >
                                {a.email}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
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
