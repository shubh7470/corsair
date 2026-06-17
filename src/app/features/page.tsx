import Header from "@/app/ui/landing/header";
import Link from "next/link";

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black font-sans text-gray-900 dark:text-white">
      <Header />
      <main className="flex-1 w-full mt-32 px-6 pb-24 flex flex-col items-center">
        <div className="max-w-4xl w-full text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight mb-6">Powerful Features</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400">Everything you need to manage your email and schedule with AI.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full text-left">
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-8 border border-gray-100 dark:border-zinc-800">
            <h3 className="text-2xl font-semibold mb-4">Smart Replies</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              MailMind uses advanced AI models to read incoming emails and instantly draft personalized, context-aware responses. Save hours of typing.
            </p>
          </div>
          
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-8 border border-gray-100 dark:border-zinc-800">
            <h3 className="text-2xl font-semibold mb-4">Calendar Automation</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Simply tell the AI to "Schedule a meeting with John next Friday". It will automatically check availability and create the calendar invite.
            </p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-8 border border-gray-100 dark:border-zinc-800">
            <h3 className="text-2xl font-semibold mb-4">Daily Summaries</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Get a concise bullet-point summary of your most important emails every morning. Never miss critical updates in a crowded inbox.
            </p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-8 border border-gray-100 dark:border-zinc-800">
            <h3 className="text-2xl font-semibold mb-4">Natural Language Chat</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Interact with your inbox like you would with a human assistant. Ask "Did I get the invoice from Acme Corp?" and get instant answers.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <Link href="/" className="text-blue-600 hover:underline font-medium">← Back to Home</Link>
        </div>
      </main>
    </div>
  );
}
