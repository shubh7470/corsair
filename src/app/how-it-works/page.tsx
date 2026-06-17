import Header from "@/app/ui/landing/header";
import Footer from "@/app/ui/landing/footer";
import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black font-sans text-gray-900 dark:text-white">
      <Header />
      <main className="flex-1 w-full mt-32 px-6 pb-24 flex flex-col items-center">
        <div className="max-w-4xl w-full text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight mb-6">How it Works</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400">Get up and running with Maical in just 3 simple steps.</p>
        </div>

        <div className="max-w-3xl w-full space-y-12 text-left mb-24">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">1</div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Connect Your Google Account</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Sign in with your existing Google Account. We use secure OAuth to request permission to read your emails and manage your calendar. You always retain full control of your data.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">2</div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Chat with the AI Assistant</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Navigate to the dashboard and start typing. "What did Sarah say in the last email?" or "Block 2 hours for deep work this afternoon." The AI understands natural language perfectly.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">3</div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Review & Execute</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Before sending an email or booking a calendar slot, the AI presents its plan for your review. Approve the action with a single click, or type a quick adjustment.
              </p>
            </div>
          </div>
        </div>

        {/* Integration FAQ */}
        <div className="max-w-3xl w-full text-left bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800">
          <h2 className="text-2xl font-bold mb-6">Integration Details</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">Do I need to install any Chrome extensions?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">No! Maical works entirely through our web dashboard. No messy extensions or downloads required.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Can I disconnect my account later?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Absolutely. You can revoke Maical's access to your Google Account at any time directly from your Google Security settings.</p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Link href="/" className="text-blue-600 hover:underline font-medium">← Back to Home</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
