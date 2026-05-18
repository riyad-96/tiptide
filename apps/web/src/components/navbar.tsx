'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, Eye } from 'lucide-react';
import pkg from '../../../../packages/tiptide/package.json';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const pathname = usePathname();

  const isLinkActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-md">
      <div className="flex h-14 w-full items-center justify-between px-4 sm:px-6">
        <div className="flex flex-1 items-center justify-start">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-base font-bold tracking-tight text-neutral-900"
          >
            <span className="rounded-[4px] bg-neutral-900 px-1.5 py-0.5 text-xs text-white">
              T
            </span>
            <span>TIPTIDE</span>
            <span className="hidden rounded-full border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] font-normal text-neutral-500 sm:inline">
              v{pkg.version}
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-4 text-sm font-medium sm:flex">
          <Link
            href="/"
            className={`transition-colors hover:text-neutral-900 ${
              isLinkActive('/') && pathname === '/'
                ? 'font-semibold text-neutral-900'
                : 'text-neutral-500'
            }`}
          >
            Overview
          </Link>
          <Link
            href="/docs/introduction"
            className={`transition-colors hover:text-neutral-900 ${
              isLinkActive('/docs')
                ? 'font-semibold text-neutral-900'
                : 'text-neutral-500'
            }`}
          >
            Documentation
          </Link>
          <Link
            href="/previews"
            className={`transition-colors hover:text-neutral-900 ${
              isLinkActive('/previews')
                ? 'font-semibold text-neutral-900'
                : 'text-neutral-500'
            }`}
          >
            Advanced Previews
          </Link>
        </nav>

        <div className="flex flex-1 items-center justify-end gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link href="/docs/introduction" className="gap-1.5">
              <FileText className="size-3.5" />
              <span>Docs</span>
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/previews" className="gap-1.5">
              <Eye className="size-3.5" />
              <span>Try Editor</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile navigation tab-strip (clean, thin border layout) */}
      <div className="flex border-t border-neutral-100 sm:hidden">
        <Link
          href="/"
          className={`flex flex-1 items-center justify-center border-r border-neutral-100 py-2 text-center text-xs font-medium ${
            pathname === '/'
              ? 'bg-neutral-50 text-neutral-900'
              : 'bg-white text-neutral-500'
          }`}
        >
          Overview
        </Link>
        <Link
          href="/docs/introduction"
          className={`flex flex-1 items-center justify-center border-r border-neutral-100 py-2 text-center text-xs font-medium ${
            isLinkActive('/docs')
              ? 'bg-neutral-50 text-neutral-900'
              : 'bg-white text-neutral-500'
          }`}
        >
          Docs
        </Link>
        <Link
          href="/previews"
          className={`flex flex-1 items-center justify-center py-2 text-center text-xs font-medium ${
            isLinkActive('/previews')
              ? 'bg-neutral-50 text-neutral-900'
              : 'bg-white text-neutral-500'
          }`}
        >
          Previews
        </Link>
      </div>
    </header>
  );
}
