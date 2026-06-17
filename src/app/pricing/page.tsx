import Header from "@/app/ui/landing/header";
import Footer from "@/app/ui/landing/footer";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black font-sans text-gray-900 dark:text-white">
      <Header />
      <main className="flex-1 w-full mt-32 px-6 pb-24 flex flex-col items-center">
        <div className="max-w-4xl w-full text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight mb-6">Simple, transparent pricing</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400">Start for free, upgrade when you need to.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full mb-24">
          {/* Free Tier */}
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-3xl p-8 border border-gray-100 dark:border-zinc-800 flex flex-col">
            <h3 className="text-2xl font-bold mb-2">Basic</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Perfect for trying out Maical.</p>
            <div className="text-5xl font-extrabold mb-8">Rs. 0<span className="text-xl font-medium text-gray-500 dark:text-gray-400">/mo</span></div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3">
                <span className="text-green-500">✓</span> Up to 50 AI prompts/month
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-500">✓</span> Basic email summarization
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-500">✓</span> Calendar scheduling
              </li>
            </ul>
            <button className="w-full bg-white dark:bg-zinc-800 text-gray-900 dark:text-white border border-gray-200 dark:border-zinc-700 rounded-full py-3 font-medium hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors">
              Get Started
            </button>
          </div>

          {/* Pro Tier */}
          <div className="bg-blue-600 rounded-3xl p-8 border border-blue-500 flex flex-col text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <p className="text-blue-100 mb-6">For professionals who need ultimate productivity.</p>
            <div className="text-5xl font-extrabold mb-8">Rs. 1200<span className="text-xl font-medium text-blue-200">/mo</span></div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3">
                <span className="text-white font-bold">✓</span> Unlimited AI prompts
              </li>
              <li className="flex items-center gap-3">
                <span className="text-white font-bold">✓</span> Advanced email drafting
              </li>
              <li className="flex items-center gap-3">
                <span className="text-white font-bold">✓</span> Priority support
              </li>
              <li className="flex items-center gap-3">
                <span className="text-white font-bold">✓</span> Custom integrations
              </li>
            </ul>
            <button className="w-full bg-white text-blue-600 rounded-full py-3 font-bold hover:bg-gray-100 transition-colors">
              Upgrade to Pro
            </button>
          </div>
        </div>

        {/* Pricing FAQ Section */}
        <div className="max-w-3xl w-full text-left">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800">
              <h3 className="text-xl font-semibold mb-2">Can I cancel my subscription anytime?</h3>
              <p className="text-gray-600 dark:text-gray-400">Yes, you can cancel your Pro subscription at any time from your dashboard settings. You will continue to have Pro access until the end of your billing cycle.</p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800">
              <h3 className="text-xl font-semibold mb-2">Do you offer custom plans for large teams?</h3>
              <p className="text-gray-600 dark:text-gray-400">Absolutely! If you have a team of more than 10 people, please reach out to our sales team for Enterprise pricing and customized integrations tailored to your company's needs.</p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800">
              <h3 className="text-xl font-semibold mb-2">Is there a free trial for the Pro plan?</h3>
              <p className="text-gray-600 dark:text-gray-400">We currently offer a 14-day free trial of the Pro plan when you first sign up. No credit card is required to start your trial.</p>
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
