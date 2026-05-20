import { DocsSidebar } from '@/components/docs-sidebar';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex w-full flex-1">
      <DocsSidebar />

      {/* Mobile Sidebar Trigger/Nav can be implemented here if needed, but keeping it minimal for now */}

      {/* Main Documentation Content Area */}
      <main className="min-w-0 flex-1 px-6 py-8 md:px-8">{children}</main>
    </div>
  );
}
