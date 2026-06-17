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
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/calender");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setEvents(data.data || data || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const today = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const days = [];
  // Previous month padding
  const prevMonthDays = getDaysInMonth(currentYear, currentMonth - 1);
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: prevMonthDays - i, isCurrentMonth: false, date: new Date(currentYear, currentMonth - 1, prevMonthDays - i) });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, isCurrentMonth: true, date: new Date(currentYear, currentMonth, i) });
  }

  // Next month padding
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({ day: i, isCurrentMonth: false, date: new Date(currentYear, currentMonth + 1, i) });
  }

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      if (!event.start) return false;
      const eventDateStr = event.start.dateTime || event.start.date;
      if (!eventDateStr) return false;
      const eventDate = new Date(eventDateStr);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const formatEventTime = (dateStr?: string) => {
    if (!dateStr || !dateStr.includes('T')) return '';
    return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(new Date(dateStr));
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex h-full flex-col bg-zinc-950 text-white">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-800 px-6">
        <h1 className="text-xl font-semibold text-white tracking-tight">Calendar</h1>
        <div className="flex items-center gap-4">
          <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-zinc-800 transition-colors">
            <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h2 className="text-lg font-medium min-w-[150px] text-center">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-zinc-800 transition-colors">
            <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-6xl h-full flex flex-col">
          <div className="grid grid-cols-7 gap-px bg-zinc-800 rounded-t-xl overflow-hidden border border-zinc-800">
            {dayNames.map(day => (
              <div key={day} className="bg-zinc-900 py-3 text-center text-sm font-medium text-zinc-400">
                {day}
              </div>
            ))}
          </div>
          
          <div className="flex-1 grid grid-cols-7 gap-px bg-zinc-800 border-x border-b border-zinc-800 rounded-b-xl overflow-hidden">
            {days.map((dayObj, i) => {
              const dayEvents = getEventsForDate(dayObj.date);
              return (
                <div 
                  key={i} 
                  className={`min-h-[120px] bg-zinc-950 p-2 transition-colors hover:bg-zinc-900/80 ${dayObj.isCurrentMonth ? '' : 'bg-zinc-950/50'}`}
                >
                  <div className="flex justify-between items-start">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${isToday(dayObj.date) ? 'bg-indigo-500 text-white font-bold shadow-[0_0_12px_rgba(99,102,241,0.5)]' : dayObj.isCurrentMonth ? 'text-zinc-200' : 'text-zinc-600'}`}>
                      {dayObj.day}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-col gap-1 overflow-y-auto max-h-[80px] no-scrollbar">
                    {dayEvents.map((event) => (
                      <div 
                        key={event.id} 
                        className="truncate rounded px-2 py-1 text-xs font-medium bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-500/20 hover:bg-indigo-500/20 cursor-pointer transition-all"
                        title={event.summary || "Untitled Event"}
                      >
                        {formatEventTime(event.start?.dateTime)} {event.summary || "Untitled"}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
