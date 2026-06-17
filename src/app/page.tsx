import Header from "./ui/landing/header";
import Hero from "./ui/landing/hero";
import FeaturesSection from "./ui/landing/features-section";
import HowItWorksSection from "./ui/landing/how-it-works-section";
import TestimonialsSection from "./ui/landing/testimonials-section";
import CTASection from "./ui/landing/cta-section";
import Footer from "./ui/landing/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black font-sans scroll-smooth">
      <Header />
      <main className="flex-1 w-full mt-24">
        <Hero />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
