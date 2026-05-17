import React from 'react';
import { cn } from '../style';
import { Tools } from './tools';

type ToolbarProps = { children?: React.ReactNode; className?: string };

export function Toolbar({ children, className }: ToolbarProps) {
  return (
    <div className={cn('tiptide-toolbar', className)}>
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
}

// Attach tools to ToolBar for dot-notation usage
Toolbar.undo = Tools.undo;
Toolbar.redo = Tools.redo;
Toolbar.textBlocks = Tools.textBlocks;
Toolbar.lists = Tools.lists;
Toolbar.blockquote = Tools.blockquote;
Toolbar.codeblock = Tools.codeblock;
Toolbar.bold = Tools.bold;
Toolbar.italic = Tools.italic;
Toolbar.underline = Tools.underline;
Toolbar.strike = Tools.strike;
Toolbar.code = Tools.code;
Toolbar.colorSelector = Tools.colorSelector;
Toolbar.link = Tools.link;
Toolbar.alignLeft = Tools.alignLeft;
Toolbar.alignCenter = Tools.alignCenter;
Toolbar.alignRight = Tools.alignRight;
Toolbar.alignJustify = Tools.alignJustify;
Toolbar.horizontalRule = Tools.horizontalRule;
Toolbar.superscript = Tools.superscript;
Toolbar.subscript = Tools.subscript;
Toolbar.image = Tools.image;
Toolbar.separator = Tools.separator;
