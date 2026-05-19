'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Moon, SunMedium } from 'lucide-react';
import pkg from '../../../../packages/tiptide/package.json';
import { Button } from '@/components/ui/button';

const GITHUB_URL = 'https://github.com/riyad-96/tiptide';

export function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('docs-theme');
    const preferredTheme =
      storedTheme ??
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light');
    const nextTheme = preferredTheme === 'dark' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    window.localStorage.setItem('docs-theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  const isLinkActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/95">
      <div className="flex h-14 w-full items-center justify-between px-4 sm:px-6">
        <div className="flex flex-1 items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-base font-semibold tracking-tight text-neutral-950 dark:text-neutral-100"
          >
            <span className="rounded-full border border-neutral-200 bg-neutral-100 px-2 py-1 text-xs font-semibold text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
              T
            </span>
            <span>Tiptide</span>
            <span className="hidden rounded-full border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] font-normal text-neutral-500 sm:inline dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
              v{pkg.version}
            </span>
          </Link>

          <nav className="hidden items-center gap-5 text-sm font-medium sm:flex">
            <Link
              href="/"
              className={`text-neutral-600 transition-colors ${
                isLinkActive('/') && pathname === '/'
                  ? 'font-semibold text-neutral-950 dark:text-neutral-100'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
              }`}
            >
              Overview
            </Link>
            <Link
              href="/docs/introduction"
              className={`text-neutral-600 transition-colors ${
                isLinkActive('/docs')
                  ? 'font-semibold text-neutral-950 dark:text-neutral-100'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
              }`}
            >
              Docs
            </Link>
            <Link
              href="/previews"
              className={`text-neutral-600 transition-colors ${
                isLinkActive('/previews')
                  ? 'font-semibold text-neutral-950 dark:text-neutral-100'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
              }`}
            >
              Previews
            </Link>
            <Link
              href="/builder"
              className={`text-neutral-600 transition-colors ${
                isLinkActive('/builder')
                  ? 'font-semibold text-neutral-950 dark:text-neutral-100'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
              }`}
            >
              Builder
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <SunMedium className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Open GitHub repository"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>

      <div className="flex border-t border-neutral-100 bg-white/95 px-4 text-xs font-semibold tracking-[0.16em] text-neutral-500 sm:hidden dark:border-neutral-900 dark:bg-neutral-950/95 dark:text-neutral-400">
        <Link
          href="/"
          className={`flex flex-1 items-center justify-center border-r border-neutral-100 py-2 ${
            pathname === '/'
              ? 'bg-neutral-50 text-neutral-950 dark:bg-neutral-900 dark:text-neutral-100'
              : 'bg-white text-neutral-500 dark:bg-neutral-950 dark:text-neutral-400'
          }`}
        >
          Overview
        </Link>
        <Link
          href="/docs/introduction"
          className={`flex flex-1 items-center justify-center border-r border-neutral-100 py-2 ${
            isLinkActive('/docs')
              ? 'bg-neutral-50 text-neutral-950 dark:bg-neutral-900 dark:text-neutral-100'
              : 'bg-white text-neutral-500 dark:bg-neutral-950 dark:text-neutral-400'
          }`}
        >
          Docs
        </Link>
        <Link
          href="/previews"
          className={`flex flex-1 items-center justify-center border-r border-neutral-100 py-2 ${
            isLinkActive('/previews')
              ? 'bg-neutral-50 text-neutral-950 dark:bg-neutral-900 dark:text-neutral-100'
              : 'bg-white text-neutral-500 dark:bg-neutral-950 dark:text-neutral-400'
          }`}
        >
          Previews
        </Link>
        <Link
          href="/builder"
          className={`flex flex-1 items-center justify-center py-2 ${
            isLinkActive('/builder')
              ? 'bg-neutral-50 text-neutral-950 dark:bg-neutral-900 dark:text-neutral-100'
              : 'bg-white text-neutral-500 dark:bg-neutral-950 dark:text-neutral-400'
          }`}
        >
          Builder
        </Link>
      </div>
    </header>
  );
}
