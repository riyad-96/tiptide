import { notFound } from 'next/navigation';
import { getSectionBySlug } from '@/lib/docs-data';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Terminal } from 'lucide-react';
import { CodeBlock } from '@/components/code-block';

interface DocsPageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function DocsPage({ params }: DocsPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug?.[0] || 'introduction';
  const section = getSectionBySlug(slug);

  if (!section) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[1200px] pb-24">
      <div className="mb-10">
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
          {section.title}
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          {section.description}
        </p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none text-neutral-800 dark:text-neutral-200">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ ...props }) => (
              <h1
                className="mt-10 mb-4 border-b border-neutral-100 pb-2 text-2xl font-bold dark:border-neutral-800"
                {...props}
              />
            ),
            h2: ({ ...props }) => (
              <h2
                className="mt-10 mb-4 border-b border-neutral-100 pb-2 text-xl font-bold dark:border-neutral-800"
                {...props}
              />
            ),
            h3: ({ ...props }) => (
              <h3 className="mt-8 mb-3 text-lg font-bold" {...props} />
            ),
            p: ({ ...props }) => (
              <p className="mb-4 text-[15px] leading-relaxed" {...props} />
            ),
            ul: ({ ...props }) => (
              <ul className="mb-4 list-disc space-y-1.5 pl-5" {...props} />
            ),
            ol: ({ ...props }) => (
              <ol className="mb-4 list-decimal space-y-1.5 pl-5" {...props} />
            ),
            li: ({ ...props }) => <li className="text-[15px]" {...props} />,
            strong: ({ ...props }) => (
              <strong
                className="font-semibold text-neutral-900 dark:text-neutral-100"
                {...props}
              />
            ),
            a: ({ ...props }) => (
              <a
                className="font-medium underline underline-offset-4 hover:text-neutral-900 dark:hover:text-neutral-100"
                {...props}
              />
            ),
            code: ({ ...props }) => (
              <code
                className="rounded-md bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-neutral-800 before:hidden after:hidden dark:bg-neutral-800 dark:text-neutral-200"
                {...props}
              />
            ),
            table: ({ ...props }) => (
              <div className="mb-6 w-full overflow-x-auto rounded-md border border-neutral-200 dark:border-neutral-800">
                <table className="w-full text-left text-sm" {...props} />
              </div>
            ),
            thead: ({ ...props }) => (
              <thead
                className="border-b border-neutral-200 bg-neutral-50 text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
                {...props}
              />
            ),
            th: ({ ...props }) => (
              <th className="p-3 font-semibold" {...props} />
            ),
            td: ({ ...props }) => (
              <td
                className="border-b border-neutral-100 p-3 align-top last:border-0 dark:border-neutral-800/50"
                {...props}
              />
            ),
          }}
        >
          {section.content}
        </ReactMarkdown>
      </div>

      {section.codeExample && (
        <div className="mt-12">
          <h3 className="mb-4 text-lg font-bold dark:text-neutral-100">
            Example
          </h3>
          <div className="overflow-hidden rounded-lg border border-neutral-200 bg-[#fafafa] dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-2 dark:border-neutral-800 dark:bg-neutral-950">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-neutral-400" />
                <span className="font-mono text-xs font-medium text-neutral-500 uppercase">
                  {section.codeLanguage || 'typescript'}
                </span>
              </div>
            </div>
            <CodeBlock
              code={section.codeExample}
              language={section.codeLanguage || 'typescript'}
            />
          </div>
        </div>
      )}
    </div>
  );
}
