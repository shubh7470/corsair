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

  // Fallback suggestions
  const activityFallback = [
    { id: 'f1', title: "Try Summarizing Emails", desc: "Ask Maical to summarize your unread inbox", icon: <span className="text-purple-400"><SparklesIcon /></span> },
    { id: 'f2', title: "Schedule a Meeting", desc: "Ask Maical to block time on your calendar", icon: <span className="text-blue-400"><CalendarIcon /></span> },
  ];

  const activitiesToDisplay = dashboardData.recentActivity?.length > 0 
    ? dashboardData.recentActivity.slice(0, 2).map((act: any) => ({
        id: act.id,
        title: act.title,
        desc: act.desc,
        icon: act.type === 'email' ? <span className="text-purple-400"><MailIcon /></span> : <span className="text-blue-400"><CheckCircleIcon /></span>
      }))
    : activityFallback;

  return (
    <div className="flex h-screen w-full bg-[#0A0A0B] text-white overflow-hidden relative font-sans p-0 md:p-4 md:pl-0">
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0A0A0B] md:border border-[#1C1C1F] md:rounded-2xl overflow-hidden relative">
        
        {/* Scrollable Messages / Greeting Area */}
        <div className="flex-1 overflow-y-auto px-4 md:px-10 py-8 custom-scrollbar relative flex flex-col">
          {messages.length === 0 ? (
            <div className="w-full max-w-3xl mx-auto flex-1 flex flex-col pt-10 md:pt-20">
              {/* Greeting */}
              <div className="flex flex-col items-center text-center mb-16">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(99,102,241,0.3)] mb-6">
                  M
                </div>
                <h1 className="text-3xl font-semibold mb-3">
                  {getGreeting()}, {name}! <span className="text-yellow-400">👋</span>
                </h1>
                <p className="text-zinc-400 text-lg">How can Maical help you today?</p>
              </div>
              
              {/* Suggestions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto mb-4">
                {activitiesToDisplay.map((activity) => (
                  <div 
                    key={activity.id} 
                    onClick={() => handleSubmit(undefined, activity.title)}
                    className="bg-[#131316] border border-[#1C1C1F] rounded-2xl p-4 flex items-center gap-4 hover:bg-[#18181B] hover:border-zinc-700/50 transition-all cursor-pointer group"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1C1C1F] border border-zinc-800 group-hover:scale-110 transition-transform">
                      {activity.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-200">{activity.title}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{activity.desc}</p>
                    </div>
                  </div>
                ))}
                
                {dashboardData.todayEvents.length > 0 ? (
                  <div 
                    onClick={() => handleSubmit(undefined, "Show me details about my next meeting")}
                    className="bg-[#131316] border border-[#1C1C1F] rounded-2xl p-4 flex items-center gap-4 hover:bg-[#18181B] hover:border-zinc-700/50 transition-all cursor-pointer group"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform border border-blue-500/20">
                      <CalendarIcon />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium text-zinc-200 truncate">{dashboardData.todayEvents[0].summary}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        {new Date(dashboardData.todayEvents[0].start.dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={() => handleSubmit(undefined, "Schedule a team standup tomorrow morning")}
                    className="bg-[#131316] border border-[#1C1C1F] rounded-2xl p-4 flex items-center gap-4 hover:bg-[#18181B] hover:border-zinc-700/50 transition-all cursor-pointer group"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform border border-blue-500/20">
                      <CalendarIcon />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-200">Schedule Team Standup</p>
                      <p className="text-xs text-zinc-500 mt-0.5">No upcoming meetings today</p>
                    </div>
                  </div>
                )}
                
                <div 
                  onClick={() => handleSubmit(undefined, "Check my pending tasks")}
                  className="bg-[#131316] border border-[#1C1C1F] rounded-2xl p-4 flex items-center gap-4 hover:bg-[#18181B] hover:border-zinc-700/50 transition-all cursor-pointer group"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-400 group-hover:scale-110 transition-transform border border-green-500/20">
                    <CheckCircleIcon />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-200">Pending Tasks</p>
                    <p className="text-xs text-zinc-500 mt-0.5">Follow up with John & Sarah</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-3xl mx-auto space-y-6 pb-4">
              {messages.map((m) => (
                <div key={m.id} className={`flex gap-4 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  {m.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 mt-1">
                      <BotIcon />
                    </div>
                  )}
                  <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-[15px] leading-relaxed whitespace-pre-wrap ${
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
        </div>

        {/* Anchored Bottom Input Box */}
        <div className="w-full max-w-3xl mx-auto px-4 md:px-0 pb-6 shrink-0 bg-[#0A0A0B]">
          <div className="bg-[#131316] border border-[#1C1C1F] rounded-2xl p-3 shadow-lg flex flex-col transition-shadow focus-within:ring-1 focus-within:ring-indigo-500/50 focus-within:border-indigo-500/50">
            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Message Maical..."
                className="w-full resize-none bg-transparent text-[15px] text-white placeholder-zinc-500 focus:outline-none min-h-[44px] max-h-[200px] overflow-y-auto px-1 py-2"
                rows={1}
              />
              <div className="flex justify-between items-end sm:items-center mt-2 gap-2 border-t border-[#1C1C1F] pt-2">
                <div className="flex gap-1.5 sm:gap-2 flex-wrap max-w-[80%] sm:max-w-none">
                  <button type="button" className="flex items-center gap-1 sm:gap-2 rounded-lg border border-zinc-800 px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-[#1C1C1F] transition-colors shrink-0">
                    <MailIcon /> Emails
                  </button>
                  <button type="button" className="flex items-center gap-1 sm:gap-2 rounded-lg border border-zinc-800 px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-[#1C1C1F] transition-colors shrink-0">
                    <CalendarIcon /> Calendar
                  </button>
                  <button type="button" className="flex items-center gap-1 sm:gap-2 rounded-lg border border-zinc-800 px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-[#1C1C1F] transition-colors shrink-0">
                    <CheckCircleIcon /> Tasks
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white transition-all hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600"
                >
                  <SendIcon />
                </button>
              </div>
            </form>
          </div>
          <div className="text-center text-[10px] sm:text-xs text-zinc-500 mt-3">Maical AI can make mistakes. Verify important information.</div>
        </div>

      </div>
    </div>
  );
}
