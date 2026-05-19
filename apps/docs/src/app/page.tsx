import Link from 'next/link';
import { ArrowRight, Terminal } from 'lucide-react';
import { BasicEditor } from '@/components/editor/basic-editor';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid gap-8 md:grid-cols-1 md:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs font-semibold tracking-[0.24em] text-neutral-600 uppercase dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
              <span>Built on Tiptap</span>
            </div>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl dark:text-neutral-100">
                A neutral, modern editor wrapper for React.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-300">
                Tiptide brings a polished Tailwind and Tiptap experience
                together with clean defaults, composable tools, and neutral
                styling that fits any application.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/docs/introduction" className="gap-2">
                  Read Docs
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/previews" className="gap-2">
                  Try the Editor
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <Card className="border border-neutral-200 dark:border-neutral-800">
            <CardHeader>
              <CardTitle>Neutral design</CardTitle>
              <CardDescription>
                Tailwind neutral tones with subtle borders and clean layouts, no
                shadows, no loud colors.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border border-neutral-200 dark:border-neutral-800">
            <CardHeader>
              <CardTitle>Composable by design</CardTitle>
              <CardDescription>
                Author toolbars, extensions, and editor layout with a
                React-first API built around Tiptap.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border border-neutral-200 dark:border-neutral-800">
            <CardHeader>
              <CardTitle>Ready for docs</CardTitle>
              <CardDescription>
                A minimal landing experience with a consistent header, neutral
                styling, and a polished editor demo.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        <section className="w-full">
          <div className="px-4 sm:px-6 lg:px-0">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3 text-center sm:text-left">
                <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-100">
                  Simple editorial canvas
                </h2>
                <p className="text-base text-neutral-600 dark:text-neutral-400">
                  Showcase a core editor experience with a clean,
                  distraction-free interface.
                </p>
              </div>

              <div className="group relative rounded-[2rem] bg-neutral-200/50 p-2 sm:p-4 dark:bg-neutral-800/50">
                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200 transition-shadow hover:shadow-md dark:bg-neutral-950 dark:ring-neutral-800">
                  <BasicEditor preview={false} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-3xl border border-neutral-200 bg-neutral-100 p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center gap-3 text-sm font-semibold tracking-[0.22em] text-neutral-500 uppercase dark:text-neutral-400">
            <Terminal className="h-4 w-4" />
            <span>Install</span>
          </div>
          <p className="max-w-3xl text-sm leading-6 text-neutral-600 dark:text-neutral-400">
            Bring Tiptide into your React app with a single package install and
            unlock a modular editor system styled with Tailwind and
            shadcn-inspired UI components.
          </p>
          <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200">
            <code className="font-medium">pnpm add tiptide</code>
          </div>
        </section>
      </main>
    </div>
  );
}
