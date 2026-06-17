export default function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Connect Accounts",
      desc: "Sign in with Google. Maical uses official APIs to securely connect to Gmail and Google Calendar."
    },
    {
      num: "02",
      title: "Ask the AI",
      desc: "Use natural language commands like 'Draft a polite decline to the latest meeting invite'."
    },
    {
      num: "03",
      title: "Review & Execute",
      desc: "The AI prepares the action. You review the drafted email or calendar invite, and click confirm."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 bg-white dark:bg-black w-full flex justify-center border-t border-gray-100 dark:border-zinc-900">
      <div className="max-w-6xl w-full">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">How it works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              We've designed Maical to feel like a natural extension of your brain. No complex setups, just immediate productivity.
            </p>
            <div className="space-y-8">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="text-blue-600 dark:text-blue-500 font-mono font-bold text-lg mt-1">{step.num}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-8 aspect-square flex flex-col justify-center border border-gray-200 dark:border-zinc-800 shadow-xl relative overflow-hidden">
              {/* Abstract decorative graphic */}
              <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
              
              <div className="bg-white dark:bg-black rounded-2xl shadow-lg border border-gray-100 dark:border-zinc-800 p-6 z-10 relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">AI</div>
                  <div className="text-sm font-medium">Maical Assistant</div>
                </div>
                <div className="bg-gray-100 dark:bg-zinc-900 text-gray-800 dark:text-gray-200 p-4 rounded-xl rounded-tl-none mb-4 text-sm">
                  I've drafted the reply and found a 30-minute slot for tomorrow at 2 PM. Should I send the email and book it?
                </div>
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white p-3 px-5 rounded-xl rounded-tr-none text-sm font-medium">
                    Yes, looks perfect. Send it!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
