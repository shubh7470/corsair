"use client";
import { signIn } from "next-auth/react";

export default function CTASection() {
  return (
    <section className="py-24 px-4 bg-blue-600 w-full flex justify-center relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40V0H40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="max-w-4xl w-full text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">Ready to take back your time?</h2>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
          Join thousands of professionals who have automated their inbox and calendar. Start using Maical today for free.
        </p>
        <button 
          onClick={() => signIn("google", { callbackUrl: "/chat" })}
          className="bg-white text-blue-600 hover:bg-gray-50 font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
        >
          Get Started with Google
        </button>
        <p className="text-blue-200 text-sm mt-6">No credit card required. Free basic tier forever.</p>
      </div>
    </section>
  );
}
