export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Maical saves me at least 2 hours every day. The context-aware replies are frighteningly accurate. I literally couldn't go back to normal email.",
      name: "Sarah Jenkins",
      role: "Operations Director",
      avatar: "SJ"
    },
    {
      quote: "Finally, an AI that actually executes actions instead of just giving me text to copy-paste. Scheduling meetings is now completely frictionless.",
      name: "Michael Chen",
      role: "Product Manager",
      avatar: "MC"
    },
    {
      quote: "The Inbox zero summaries are a game changer. I read one paragraph in the morning and know exactly which 3 emails out of 50 I need to act on.",
      name: "Elena Rodriguez",
      role: "Startup Founder",
      avatar: "ER"
    }
  ];

  return (
    <section className="py-24 px-4 bg-zinc-50 dark:bg-zinc-950 w-full flex justify-center border-t border-gray-100 dark:border-zinc-900">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white tracking-tight">Loved by professionals</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            See how Maical is transforming the way people work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <div key={idx} className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800 flex flex-col justify-between">
              <div className="text-blue-500 mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                </svg>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8 italic">"{test.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 font-bold flex items-center justify-center rounded-full">
                  {test.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{test.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{test.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
