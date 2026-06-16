import Image from "next/image";
import Header from "./ui/landing/header";
import Hero from "./ui/landing/hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black font-sans">
      <Header />
      <main className="flex-1 w-full mt-24">
        <Hero />
      </main>
    </div>
  );
}
