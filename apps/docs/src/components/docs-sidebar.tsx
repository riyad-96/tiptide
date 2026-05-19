'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { docSections } from '@/lib/docs-data';

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-[280px] shrink-0 overflow-y-auto border-r border-neutral-200 py-8 pl-4 pr-6 md:block sm:pl-6 dark:border-neutral-800">
      <h4 className="mb-4 px-2 text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        Documentation
      </h4>
      <nav className="flex flex-col gap-1 text-sm text-neutral-600 dark:text-neutral-400">
        {docSections.map((section) => {
          const isActive = pathname === `/docs/${section.slug}`;
          return (
            <Link
              key={section.slug}
              href={`/docs/${section.slug}`}
              className={`rounded-md px-2 py-1.5 transition-colors ${
                isActive
                  ? 'bg-neutral-100 font-medium text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
                  : 'hover:bg-neutral-50 hover:text-neutral-900 dark:hover:bg-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              {section.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
