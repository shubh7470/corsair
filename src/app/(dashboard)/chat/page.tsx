"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

// --- SVG Icons ---
const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

const HistoryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
    <path d="M12 7v5l4 2"/>
  </svg>
);

const BotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="14" x="3" y="5" rx="2" ry="2" />
    <path d="M12 5V2" />
    <circle cx="12" cy="2" r="1" />
    <path d="M8 10v.01" />
    <path d="M16 10v.01" />
    <path d="M8 14c2.2 1.3 5.8 1.3 8 0" />
  </svg>
);

export default function DashboardPage() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState({ unreadEmails: 0, todayEvents: [] as any[], recentActivity: [] as any[] });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetch("/api/dashboard")
      .then(res => res.json())
      .then(data => {
        if (!data.error) setDashboardData(data);
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async (e?: React.FormEvent, predefinedMessage?: string) => {
    if (e) e.preventDefault();
    const textToSend = predefinedMessage || input.trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || "No response received.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error while processing your request. Please make sure your Google account is connected.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const name = session?.user?.name?.split(' ')[0] || "User";

  // Fallback suggestions if there is no recent activity
  const activityFallback = [
    { id: 'f1', title: "Try Summarizing Emails", desc: "Ask Maical to summarize your unread inbox", time: "", icon: <span className="text-purple-400"><SparklesIcon /></span> },
    { id: 'f2', title: "Schedule a Meeting", desc: "Ask Maical to block time on your calendar", time: "", icon: <span className="text-blue-400"><CalendarIcon /></span> },
    { id: 'f3', title: "Draft a Reply", desc: "Let Maical write an email for you", time: "", icon: <span className="text-green-400"><MailIcon /></span> },
  ];

  const activitiesToDisplay = dashboardData.recentActivity?.length > 0 
    ? dashboardData.recentActivity.map((act: any) => ({
        id: act.id,
        title: act.title,
        desc: act.desc,
        time: act.time,
        icon: act.type === 'email' ? <span className="text-purple-400"><MailIcon /></span> : <span className="text-blue-400"><CheckCircleIcon /></span>
      }))
    : activityFallback;

  return (
    <div className="flex h-screen w-full bg-[#0A0A0B] text-white overflow-hidden relative font-sans">
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto px-10 py-12">
        
        {/* Header / Greeting */}
        <div className="flex justify-between items-start mb-8 w-full max-w-4xl mx-auto">
          <div>
            <h1 className="text-3xl font-semibold mb-2">
              {getGreeting()}, {name}! <span className="text-yellow-400">👋</span>
            </h1>
            <p className="text-zinc-400">What would you like Maical AI to help you with today?</p>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#18181B] border border-zinc-800 text-zinc-400 hover:text-white transition-colors">
            <HistoryIcon />
          </button>
        </div>

        {/* Prompt Input Box */}
        <div className="w-full max-w-4xl mx-auto bg-[#131316] border border-[#1C1C1F] rounded-2xl p-4 shadow-lg mb-10 flex flex-col min-h-[140px]">
          {messages.length === 0 ? (
             <form onSubmit={(e) => handleSubmit(e)} className="flex-1 flex flex-col h-full">
               <textarea
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 onKeyDown={(e) => {
                   if (e.key === "Enter" && !e.shiftKey) {
                     e.preventDefault();
                     handleSubmit(e);
                   }
                 }}
                 placeholder="Ask anything... e.g. Summarize unread emails, schedule a meeting, draft a reply"
                 className="w-full flex-1 resize-none bg-transparent text-[15px] text-white placeholder-zinc-500 focus:outline-none"
               />
               <div className="flex justify-between items-center mt-auto pt-2">
                 <div className="flex gap-2">
                   <button type="button" className="flex items-center gap-2 rounded-lg border border-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-[#1C1C1F] transition-colors">
                     <MailIcon /> Emails
                   </button>
                   <button type="button" className="flex items-center gap-2 rounded-lg border border-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-[#1C1C1F] transition-colors">
                     <CalendarIcon /> Calendar
                   </button>
                   <button type="button" className="flex items-center gap-2 rounded-lg border border-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-[#1C1C1F] transition-colors">
                     <CheckCircleIcon /> Tasks
                   </button>
                 </div>
                 <button
                   type="submit"
                   disabled={!input.trim() || isLoading}
                   className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                 >
                   <SendIcon />
                 </button>
               </div>
             </form>
          ) : (
            <div className="flex-1 overflow-y-auto max-h-[50vh] pr-2 space-y-6 mb-4">
              {messages.map((m) => (
                <div key={m.id} className={`flex gap-4 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  {m.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 mt-1">
                      <BotIcon />
                    </div>
                  )}
                  <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-[15px] leading-relaxed ${
                    m.role === "user" ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white" : "bg-[#18181B] text-zinc-200 border border-zinc-800"
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex gap-4 justify-start">
                   <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 mt-1"><BotIcon /></div>
                   <div className="rounded-2xl bg-[#18181B] border border-zinc-800 px-5 py-4">
                     <div className="flex gap-1.5">
                       <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.3s]"></div>
                       <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.15s]"></div>
                       <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-500"></div>
                     </div>
                   </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
          
          {messages.length > 0 && (
            <form onSubmit={(e) => handleSubmit(e)} className="flex items-center gap-2 border-t border-zinc-800 pt-3 mt-auto">
               <textarea
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 onKeyDown={(e) => {
                   if (e.key === "Enter" && !e.shiftKey) {
                     e.preventDefault();
                     handleSubmit(e);
                   }
                 }}
                 placeholder="Type a message..."
                 className="flex-1 resize-none bg-transparent py-2 text-[15px] text-white placeholder-zinc-500 focus:outline-none"
                 rows={1}
               />
               <button type="submit" disabled={!input.trim() || isLoading} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-50">
                 <SendIcon />
               </button>
            </form>
          )}
        </div>

        {/* Recent Activity (Only show if no active chat) */}
        {messages.length === 0 && (
          <div className="w-full max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4 px-1">
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                <span className="text-blue-500">{dashboardData.recentActivity?.length > 0 ? <HistoryIcon /> : <SparklesIcon />}</span>
                {dashboardData.recentActivity?.length > 0 ? "Recent Activity" : "Quick Suggestions"}
              </div>
              <button className="text-xs font-medium text-zinc-500 bg-[#131316] border border-zinc-800 rounded-lg px-3 py-1.5 hover:text-zinc-300 transition-colors">
                {dashboardData.recentActivity?.length > 0 ? "All Activity v" : "View All v"}
              </button>
            </div>
            <div className="bg-[#131316] border border-[#1C1C1F] rounded-2xl flex flex-col divide-y divide-[#1C1C1F]">
              {activitiesToDisplay.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 hover:bg-[#18181B] transition-colors cursor-pointer first:rounded-t-2xl last:rounded-b-2xl">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1C1C1F] border border-zinc-800">
                      {activity.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-200">{activity.title}</p>
                      <p className="text-xs text-zinc-500">{activity.desc}</p>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Right Panel */}
      <div className="w-[340px] border-l border-[#1C1C1F] bg-[#0A0A0B] p-6 flex flex-col gap-6 overflow-y-auto">
        
        {/* AI Suggestions Widget */}
        <div className="bg-[#131316] border border-[#1C1C1F] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-zinc-300 flex items-center gap-2">
              <span className="text-indigo-400"><SparklesIcon /></span> AI Suggestions
            </h3>
            <button className="text-zinc-500 hover:text-zinc-300"><HistoryIcon /></button>
          </div>
          
          <div className="space-y-3">
            <div className="bg-[#18181B] rounded-xl p-3 flex gap-3 cursor-pointer hover:bg-[#1C1C1F] border border-zinc-800/50 transition-colors" onClick={() => handleSubmit(undefined, "Summarize my unread emails")}>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 mt-0.5">
                <MailIcon />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-200">You have {dashboardData.unreadEmails} unread emails</p>
                <p className="text-xs text-zinc-500">Click to summarize</p>
              </div>
            </div>
            
            {dashboardData.todayEvents.length > 0 ? (
              <div className="bg-[#18181B] rounded-xl p-3 flex gap-3 cursor-pointer hover:bg-[#1C1C1F] border border-zinc-800/50 transition-colors">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 mt-0.5">
                  <CalendarIcon />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-200">{dashboardData.todayEvents[0].summary}</p>
                  <p className="text-xs text-zinc-500">
                    {new Date(dashboardData.todayEvents[0].start.dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-[#18181B] rounded-xl p-3 flex gap-3 cursor-pointer hover:bg-[#1C1C1F] border border-zinc-800/50 transition-colors" onClick={() => handleSubmit(undefined, "Schedule a team standup tomorrow morning")}>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 mt-0.5">
                  <CalendarIcon />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-200">Schedule Team Standup</p>
                  <p className="text-xs text-zinc-500">No upcoming meetings today</p>
                </div>
              </div>
            )}
            
            <div className="bg-[#18181B] rounded-xl p-3 flex gap-3 cursor-pointer hover:bg-[#1C1C1F] border border-zinc-800/50 transition-colors" onClick={() => handleSubmit(undefined, "Check my pending tasks")}>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-400 mt-0.5">
                <CheckCircleIcon />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-200">3 follow-ups pending</p>
                <p className="text-xs text-zinc-500">Follow up with John & Sarah</p>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Schedule Widget */}
        <div className="bg-[#131316] border border-[#1C1C1F] rounded-2xl p-5 flex-1 flex flex-col">
          <div className="flex items-center mb-5 gap-2">
            <span className="text-blue-400"><CalendarIcon /></span>
            <h3 className="text-sm font-medium text-zinc-300">Today's Schedule</h3>
          </div>
          
          <div className="flex-1 space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-800 before:to-transparent">
            {dashboardData.todayEvents.length > 0 ? (
              dashboardData.todayEvents.map((event: any, i: number) => {
                const colors = ['bg-indigo-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500'];
                const dotColor = colors[i % colors.length];
                return (
                  <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className={`flex items-center justify-center w-4 h-4 rounded-full border-4 border-[#131316] ${dotColor} absolute left-0 shrink-0 md:mx-auto md:left-1/2 md:-translate-x-1/2`}></div>
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-8 md:ml-0 pl-2 md:pl-0">
                      <p className="text-sm font-medium text-zinc-200">{event.summary}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        {new Date(event.start.dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(event.end.dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                  </div>
                )
              })
            ) : (
               <div className="text-center text-sm text-zinc-500 mt-10">No events scheduled for today.</div>
            )}
          </div>
          
          <button className="mt-4 w-full rounded-xl bg-[#18181B] border border-zinc-800 py-2.5 text-sm font-medium text-zinc-300 hover:bg-[#1C1C1F] hover:text-white transition-colors">
            View Calendar
          </button>
        </div>

      </div>

      {/* Floating Explore Button */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 -ml-36">
         <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-medium shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:scale-105 transition-all">
           <SparklesIcon /> Explore Maical AI
         </button>
      </div>

    </div>
  );
}
