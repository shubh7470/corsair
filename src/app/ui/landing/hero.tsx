import React from 'react';

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center pt-24 md:pt-32 pb-16 px-4 w-full text-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 dark:bg-blue-600/20 blur-[120px] animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[50%] rounded-full bg-purple-400/20 dark:bg-purple-600/20 blur-[120px] animate-pulse" style={{ animationDelay: '1s', animationDuration: '5s' }}></div>
        <div className="absolute bottom-[0%] left-[20%] w-[60%] h-[50%] rounded-full bg-indigo-400/10 dark:bg-indigo-600/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
      </div>

      {/* Top Badge */}
      <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full px-4 py-1.5 text-sm font-medium mb-8 border border-blue-100 dark:border-blue-800/50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
          <path d="M5 3v4" />
          <path d="M19 17v4" />
          <path d="M3 5h4" />
          <path d="M17 19h4" />
        </svg>
        AI Assistant for Gmail & Google Calendar
      </div>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 md:mb-6 leading-[1.1] max-w-3xl">
        Manage Gmail & <br className="hidden md:block" />
        Google Calendar <br className="hidden md:block" />
        <span className="text-blue-600">with AI.</span>
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-8 md:mb-12 max-w-2xl px-2">
        One AI assistant to read emails, reply automatically, <br className="hidden md:block" />
        and schedule meetings in your calendar.
      </p>

      {/* Input Box */}
      <div className="w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800 mb-8 relative flex flex-col text-left transition-shadow focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500">
        <textarea
          placeholder="Ask AI anything..."
          className="w-full h-32 bg-transparent resize-none p-5 outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
        />
        <div className="absolute right-3 bottom-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 flex items-center gap-2 text-sm font-medium transition-colors">
            Send
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </button>
        </div>
      </div>

      {/* Action Pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-20 max-w-4xl">
        <button className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          Summarize today's emails
        </button>
        <button className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
          Schedule a meeting
        </button>
        <button className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>
          Reply to latest email
        </button>
        <button className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><line x1="10" x2="14" y1="14" y2="14"/><line x1="12" x2="12" y1="12" y2="16"/></svg>
          Create calendar event
        </button>
      </div>

      {/* Feature Cards Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full text-left">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 p-6 flex items-start gap-4 shadow-sm">
          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><rect width="20" height="14" x="2" y="5" rx="2"/></svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Gmail</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Read, search, reply, and manage emails</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 p-6 flex items-start gap-4 shadow-sm">
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Calendar</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Create events, check availability, and more</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 p-6 flex items-start gap-4 shadow-sm">
          <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">AI Assistant</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Natural language commands to get things done</p>
          </div>
        </div>
      </div>
    </section>
  );
}
