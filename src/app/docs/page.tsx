import Header from "@/app/ui/landing/header";
import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black font-sans text-gray-900 dark:text-white">
      <Header />
      <main className="flex-1 w-full mt-32 px-6 pb-24 flex flex-col items-center">
        <div className="max-w-3xl w-full text-left mb-16">
          <h1 className="text-5xl font-bold tracking-tight mb-6">Documentation</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-zinc-800 pb-8">
            Learn how to use MailMind to supercharge your productivity.
          </p>

          <div className="mt-12 space-y-12">
            <section>
              <h2 className="text-3xl font-semibold mb-4">Getting Started</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                To begin, you need to link your Google account. This gives MailMind permission to read your emails and manage your calendar. You can do this by clicking the "Connect Gmail" button in your dashboard sidebar.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold mb-4">Talking to the AI</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                The core of MailMind is the AI Chat Assistant. You can access it from the dashboard. Simply type commands in natural language.
              </p>
              <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg font-mono text-sm text-blue-600 dark:text-blue-400">
                "What did my boss say in his last email?"<br/>
                "Schedule a 30-minute sync with the marketing team tomorrow at 2 PM."<br/>
                "Draft a polite decline to the invitation from StartupX."
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold mb-4">Privacy & Security</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We take your privacy seriously. Your emails and calendar events are never stored permanently on our servers. They are only fetched on-demand when you ask the AI a question, and the data is processed securely.
              </p>
            </section>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-blue-600 hover:underline font-medium">← Back to Home</Link>
        </div>
      </main>
    </div>
  );
}
