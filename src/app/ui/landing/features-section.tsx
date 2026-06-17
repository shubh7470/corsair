export default function FeaturesSection() {
  const features = [
    {
      title: "Context-Aware Replies",
      description: "Maical reads the thread and crafts the perfect reply in seconds. It understands tone, intent, and context.",
      icon: "💬"
    },
    {
      title: "Smart Scheduling",
      description: "Ask the AI to find a time that works for everyone. It directly hooks into your Google Calendar to book events.",
      icon: "📅"
    },
    {
      title: "Inbox Zero Summaries",
      description: "Get a quick digest of your unread emails. Know exactly what needs your attention without reading everything.",
      icon: "⚡"
    },
    {
      title: "Seamless Integration",
      description: "Connects securely via OAuth. We don't store your emails or calendar data permanently. Everything stays private.",
      icon: "🔒"
    }
  ];

  return (
    <section id="features" className="py-24 px-4 bg-zinc-50 dark:bg-zinc-950 w-full flex justify-center">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white tracking-tight">Supercharge your workflow</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to manage your communications faster than ever before.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 hover:-translate-y-1 transition-transform duration-300">
              <div className="text-4xl mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
