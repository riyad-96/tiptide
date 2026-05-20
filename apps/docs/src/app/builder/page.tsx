import { EditorBuilder } from '@/components/editor-builder';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editor Builder | Tiptide',
  description: 'Construct your custom Tiptide editor visually.',
};

export default function BuilderPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b border-neutral-200 bg-neutral-50 px-6 py-8 md:px-10 dark:border-neutral-800 dark:bg-neutral-900/50">
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
          Editor Builder
        </h1>
        <p className="max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
          Construct your own custom rich text editor by toggling the components
          you need. View the live preview and instantly copy the generated code.
        </p>
      </div>
      <EditorBuilder />
    </div>
  );
}
