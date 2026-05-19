import Link from 'next/link';
import { ArrowRight, Terminal } from 'lucide-react';
import { BasicEditor } from '@/components/editor/basic-editor';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center">
      {/* Hero Section */}
      <section className="flex w-full max-w-[1200px] flex-col items-center px-6 py-20 text-center md:py-32">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-neutral-900 md:text-6xl">
          The Modular Rich Text Editor
          <br /> for React.
        </h1>
        <p className="mb-10 max-w-2xl text-lg text-neutral-600 md:text-xl">
          A headless, highly customizable, and beautifully styled compound
          component wrapper around Tiptap. Build exactly the editor you want,
          without fighting the default layout.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/docs/introduction" className="gap-2">
              Read the Docs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/previews" className="gap-2">
              View Previews
            </Link>
          </Button>
        </div>

        <div className="mt-12 flex items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 px-4 py-2 font-mono text-sm text-neutral-700">
          <Terminal className="h-4 w-4 text-neutral-400" />
          <span>pnpm add tiptide</span>
        </div>
      </section>

      {/* Editor Demo Section */}
      <section className="w-full max-w-[1200px] px-6 pb-24">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            Live Interactive Demo
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Type in the editor on the left to see the live rendered read-only
            version on the right.
          </p>
        </div>

        <div className="h-[500px] overflow-hidden rounded-md border border-neutral-200 bg-white">
          <BasicEditor />
        </div>
      </section>

      {/* Features Minimal Grid */}
      <section className="w-full max-w-[1200px] px-6 pb-32">
        <div className="grid grid-cols-1 gap-8 border-t border-neutral-100 pt-16 md:grid-cols-3">
          <div>
            <h3 className="mb-2 font-bold text-neutral-900">
              Compound Components
            </h3>
            <p className="text-sm leading-relaxed text-neutral-600">
              Tiptide uses the compound component pattern. Render the toolbar
              above, below, or entirely detached from the editor canvas. You
              have complete layout control.
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-bold text-neutral-900">
              Zero-Config Styles
            </h3>
            <p className="text-sm leading-relaxed text-neutral-600">
              Styled purely with Tailwind CSS and standard neutral classes. No
              complex CSS-in-JS or shadow DOMs. Just clean, easily override-able
              utility classes.
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-bold text-neutral-900">Built for React</h3>
            <p className="text-sm leading-relaxed text-neutral-600">
              Powered by Tiptap under the hood, but optimized for React
              developers. Provides context providers and hooks for advanced
              custom extension integrations.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-neutral-200 py-8 text-center">
        <p className="text-sm text-neutral-500">Tiptide text editor</p>
      </footer>
    </div>
  );
}
