"use client";

import Image from 'next/image';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 w-full">
      <div className="flex w-full max-w-5xl items-center justify-between rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-3 shadow-sm">
        {/* Left: Logo */}
        <div className="flex items-center gap-2 pl-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={140}
              height={48}
              className="object-contain h-8 sm:h-12 w-auto dark:invert dark:hue-rotate-180 dark:mix-blend-screen shrink-0"
              priority
            />
          </Link>
        </div>

        {/* Center: Nav Links */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/features"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Features
          </Link>
          <Link
            href="/how-it-works"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            How it works
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Pricing
          </Link>
          <Link
            href="/docs"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Docs
          </Link>
        </nav>

        {/* Right: Auth Button */}
        <div className="flex items-center pr-1">
          {status === "loading" ? (
            <div className="w-32 h-10 animate-pulse bg-gray-200 dark:bg-zinc-800 rounded-full"></div>
          ) : session ? (
            <button
              onClick={() => router.push("/chat")}
              className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white transition-colors hover:bg-blue-700 whitespace-nowrap shrink-0"
            >
              Dashboard
            </button>
          ) : (
            <button
              onClick={() => signIn("google", { callbackUrl: "/chat" })}
              className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-black px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 whitespace-nowrap shrink-0"
            >
              <svg
                className="h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              <span className="hidden sm:inline">Sign in with Google</span>
              <span className="sm:hidden">Sign in</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
