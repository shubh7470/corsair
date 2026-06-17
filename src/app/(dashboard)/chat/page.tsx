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
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

const BotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="14" x="3" y="5" rx="2" ry="2" />
    <path d="M12 5V2" />
    <circle cx="12" cy="2" r="1" />
    <path d="M8 10v.01" />
    <path d="M16 10v.01" />
    <path d="M8 14c2.2 1.3 5.8 1.3 8 0" />
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);


export default function ChatPage() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
        body: JSON.stringify({ message: userMessage.content }),
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

  const suggestions = [
    { text: "Summarize my unread emails", icon: <MailIcon /> },
    { text: "Schedule a 30m meeting tomorrow", icon: <CalendarIcon /> },
  ];

  return (
    <div className="flex h-full flex-col bg-zinc-50 dark:bg-zinc-950 relative">
      {/* Premium Header */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md px-6 z-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400">
            <BotIcon />
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900 dark:text-white leading-tight">Maical Assistant</h1>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Online & Ready</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {session?.user?.image && (
             <img src={session.user.image} alt="User Profile" className="h-8 w-8 rounded-full border border-gray-200 dark:border-zinc-700 shadow-sm" />
          )}
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="mx-auto max-w-3xl space-y-8 pb-20">
          {messages.length === 0 ? (
            <div className="mt-24 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm border border-blue-100 dark:border-blue-800/50">
                <SparklesIcon />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">How can I help you today?</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-md mx-auto">
                I can read your emails, draft responses, and manage your calendar directly through natural language.
              </p>
              
              <div className="flex flex-wrap justify-center gap-3">
                {suggestions.map((sug, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSubmit(undefined, sug.text)}
                    className="flex items-center gap-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl px-5 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:border-blue-200 dark:hover:border-blue-800/50 transition-all shadow-sm"
                  >
                    {sug.icon}
                    {sug.text}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-4 ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {/* Assistant Avatar */}
                {m.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 mt-1">
                    <BotIcon />
                  </div>
                )}

                <div
                  className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-3.5 shadow-sm ${
                    m.role === "user"
                      ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-tr-sm"
                      : "bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-200 border border-gray-100 dark:border-zinc-800 rounded-tl-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-[15px] leading-relaxed">
                    {m.content}
                  </p>
                </div>

                {/* User Avatar */}
                {m.role === "user" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-200 dark:bg-zinc-800 mt-1 overflow-hidden">
                    {session?.user?.image ? (
                      <img src={session.user.image} alt="User" className="h-full w-full object-cover" />
                    ) : (
                      <div className="text-xs font-bold text-gray-500">U</div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
          
          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-4 justify-start">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 mt-1">
                <BotIcon />
              </div>
              <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 px-5 py-4 shadow-sm">
                <div className="flex gap-1.5">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Form Area */}
      <div className="shrink-0 bg-gradient-to-t from-white via-white to-transparent dark:from-zinc-950 dark:via-zinc-950 dark:to-transparent pt-6 pb-6 px-4 md:px-8 absolute bottom-0 left-0 right-0">
        <div className="mx-auto max-w-3xl relative">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="relative flex items-end gap-2 rounded-3xl bg-white dark:bg-zinc-900 p-2 pl-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-gray-200 dark:border-zinc-700 transition-all focus-within:ring-2 focus-within:ring-blue-500/50"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Ask Maical to manage your inbox or calendar..."
              className="max-h-32 min-h-[44px] w-full resize-none bg-transparent py-3.5 text-[15px] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none"
              rows={1}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="mb-1.5 mr-1.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition-all hover:bg-blue-700 disabled:bg-gray-200 dark:disabled:bg-zinc-800 disabled:text-gray-400 dark:disabled:text-zinc-600 hover:scale-105 active:scale-95 shadow-md disabled:shadow-none"
            >
              <SendIcon />
            </button>
          </form>
          <div className="mt-3 text-center text-xs text-gray-500 dark:text-zinc-500">
            Maical can make mistakes. Consider verifying important actions.
          </div>
        </div>
      </div>
    </div>
  );
}
