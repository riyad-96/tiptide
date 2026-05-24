import React, { memo } from 'react';
import { cn } from '../style';
import { Tools } from './tools';

type ToolbarProps = { children?: React.ReactNode; className?: string };

const ToolbarComponent = memo(function Toolbar({
  children,
  className,
}: ToolbarProps) {
  return (
    <div
      className={cn(
        'tt:bg-background tt:border-border tt:h tt:flex tt:min-w-0 tt:items-center tt:gap-1 tt:overflow-x-auto tt:border-b tt:p-2',
        className,
      )}
    >
      {children || (
        <>
          <Tools.undo />
          <Tools.redo />

          <Tools.separator />

          <Tools.textBlocks />
          <Tools.lists />

          <Tools.blockquote />
          <Tools.codeblock />

          <Tools.separator />

          <Tools.bold />
          <Tools.italic />
          <Tools.underline />
          <Tools.strike />
          <Tools.code />

          <Tools.separator />

          <Tools.colorSelector />

          <Tools.separator />

          <Tools.link />

          <Tools.separator />

          <Tools.alignLeft />
          <Tools.alignCenter />
          <Tools.alignRight />
          <Tools.alignJustify />
          <Tools.horizontalRule />

          <Tools.separator />

          <Tools.superscript />
          <Tools.subscript />

          <Tools.separator />

          <Tools.image />
        </>
      )}
    </div>
  );
});

// Attach tools to ToolBar for dot-notation usage
export const Toolbar = Object.assign(ToolbarComponent, {
  undo: Tools.undo,
  redo: Tools.redo,
  textBlocks: Tools.textBlocks,
  lists: Tools.lists,
  blockquote: Tools.blockquote,
  codeblock: Tools.codeblock,
  bold: Tools.bold,
  italic: Tools.italic,
  underline: Tools.underline,
  strike: Tools.strike,
  code: Tools.code,
  colorSelector: Tools.colorSelector,
  link: Tools.link,
  alignLeft: Tools.alignLeft,
  alignCenter: Tools.alignCenter,
  alignRight: Tools.alignRight,
  alignJustify: Tools.alignJustify,
  horizontalRule: Tools.horizontalRule,
  superscript: Tools.superscript,
  subscript: Tools.subscript,
  image: Tools.image,
  separator: Tools.separator,
});
