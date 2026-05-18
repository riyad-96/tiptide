import Link from 'next/link';
import { docSections } from '@/lib/docs-data';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto flex w-full max-w-[1200px] flex-1">
      {/* Sidebar Navigation */}
      <aside className="hidden w-64 shrink-0 border-r border-neutral-200 py-8 pr-6 md:block">
        <h4 className="mb-4 px-2 text-sm font-semibold tracking-tight text-neutral-900">
          Documentation
        </h4>
        <nav className="flex flex-col gap-1 text-sm text-neutral-600">
          {docSections.map((section) => (
            <Link
              key={section.slug}
              href={`/docs/${section.slug}`}
              className="rounded-md px-2 py-1.5 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
            >
              {section.title}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar Trigger/Nav can be implemented here if needed, but keeping it minimal for now */}

      {/* Main Documentation Content Area */}
      <main className="min-w-0 flex-1 px-6 py-8 md:px-0 md:pl-10">
        {children}
      </main>
    </div>
  );
}
