import type { Content } from '@tiptap/core';
import { generateHTML } from '@tiptap/html';

import { tiptapExtensions } from './extensions';
import { cn, tiptapStyleClasses } from './style';

export function Viewer({
  content,
  className,
  containerClassName,
}: {
  content: Content | undefined;
  containerClassName?: string;
  className?: string;
}) {
  function getHTML() {
    if (!content) return '';
    return typeof content === 'string'
      ? content
      : generateHTML(content, tiptapExtensions());
  }

  return (
    <div
      className={cn('tiptide-theme tt:h-full tt:overflow-x-auto', containerClassName)}
    >
      <div
        className={cn(
          `${tiptapStyleClasses} tiptide-preview whitespace-pre-wrap`,
          className,
        )}
        dangerouslySetInnerHTML={{ __html: getHTML() }}
      ></div>
    </div>
  );
}
