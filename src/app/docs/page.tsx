import Header from "@/app/ui/landing/header";
import Footer from "@/app/ui/landing/footer";
import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black font-sans text-gray-900 dark:text-white">
      <Header />
      <main className="flex-1 w-full mt-32 px-6 pb-24 flex justify-center">
        <div className="max-w-6xl w-full flex flex-col md:flex-row gap-12">
          
          {/* Left Margin / Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="md:sticky md:top-32 space-y-8">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 px-3">Topics</h3>
                <nav className="flex flex-col space-y-1">
                  <a href="#getting-started" className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-900 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors">
                    Getting Started
                  </a>
                  <a href="#talking-to-ai" className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-900 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors">
                    Talking to the AI
                  </a>
                  <a href="#privacy-security" className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-900 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors">
                    Privacy & Security
                  </a>
                  <a href="#troubleshooting" className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-900 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors">
                    Troubleshooting
                  </a>
                </nav>
              </div>
              <div className="px-3">
                <Link href="/" className="text-blue-600 hover:underline text-sm font-medium">← Back to Home</Link>
              </div>
            </div>
          </aside>

          {/* Right Content Pane */}
          <div className="flex-1 max-w-3xl">
            <h1 className="text-5xl font-bold tracking-tight mb-6">Documentation</h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-zinc-800 pb-8">
              Learn how to use Maical to supercharge your productivity.
            </p>

            <div className="mt-12 space-y-16">
              <section id="getting-started" className="scroll-mt-32">
                <h2 className="text-3xl font-semibold mb-4">Getting Started</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  To begin, you need to link your Google account. This gives Maical permission to read your emails and manage your calendar. You can do this by clicking the "Connect Google" button in your dashboard sidebar.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 p-4 rounded-xl text-sm text-blue-800 dark:text-blue-300">
                  <strong>Note:</strong> We only request the permissions necessary to operate the AI assistant on your behalf.
                </div>
              </section>

              <section id="talking-to-ai" className="scroll-mt-32">
                <h2 className="text-3xl font-semibold mb-4">Talking to the AI</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  The core of Maical is the AI Chat Assistant. You can access it from the dashboard. Simply type commands in natural language.
                </p>
                <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-2xl font-mono text-sm text-blue-600 dark:text-blue-400 border border-gray-200 dark:border-zinc-800 space-y-3 shadow-inner">
                  <p>"What did my boss say in his last email?"</p>
                  <p>"Schedule a 30-minute sync with the marketing team tomorrow at 2 PM."</p>
                  <p>"Draft a polite decline to the invitation from StartupX."</p>
                </div>
              </section>

              <section id="privacy-security" className="scroll-mt-32">
                <h2 className="text-3xl font-semibold mb-4">Privacy & Security</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  We take your privacy seriously. Your emails and calendar events are never stored permanently on our servers. They are only fetched on-demand when you ask the AI a question, and the data is processed securely through encrypted channels.
                </p>
              </section>

              <section id="troubleshooting" className="scroll-mt-32">
                <h2 className="text-3xl font-semibold mb-4">Troubleshooting</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  If you encounter an "Auth Error" or if the AI says it cannot access your calendar, ensure that you have clicked the "Connect Google" button in the sidebar. This refreshes your OAuth tokens and grants the necessary permissions.
                </p>
              </section>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
