import { useState, memo } from 'react';
import { useEditorState } from '@tiptap/react';
import {
  ChevronDownIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  PilcrowIcon,
  TypeIcon,
} from 'lucide-react';

import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';

import type { ToolProps } from '../../types/tool';

export const ToolsTextBlocks = memo(function ToolsTextBlocks({
  className,
  hideTooltip,
  tooltipContent,
  children,
  size,
  tooltipPosition,
  onClick: propOnClick,
  modal = false,
  popoverAlign,
}: ToolProps & { modal?: boolean; popoverAlign?: 'start' | 'center' | 'end' }) {
  const [open, setOpen] = useState(false);
  const { editor } = useEditorProvider();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isP: ctx.editor.isActive('paragraph'),
      isH2: ctx.editor.isActive('heading', { level: 2 }),
      isH3: ctx.editor.isActive('heading', { level: 3 }),
      isH4: ctx.editor.isActive('heading', { level: 4 }),
      isH5: ctx.editor.isActive('heading', { level: 5 }),
      isH6: ctx.editor.isActive('heading', { level: 6 }),
    }),
  });

  const textBlocks = [
    {
      id: 1,
      icon: PilcrowIcon,
      onClick: () => editor.chain().focus().setParagraph().run(),
      text: 'Paragraph',
      isActive: editorState.isP,
    },
    {
      id: 2,
      icon: Heading1Icon,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      text: 'Heading 1',
      isActive: editorState.isH2,
    },
    {
      id: 3,
      icon: Heading2Icon,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      text: 'Heading 2',
      isActive: editorState.isH3,
    },
    {
      id: 4,
      icon: Heading3Icon,
      onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      text: 'Heading 3',
      isActive: editorState.isH4,
    },
    {
      id: 5,
      icon: Heading4Icon,
      onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      text: 'Heading 4',
      isActive: editorState.isH5,
    },
    {
      id: 6,
      icon: Heading5Icon,
      onClick: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
      text: 'Heading 5',
      isActive: editorState.isH6,
    },
  ];

  const activeBlock = textBlocks.find((b) => b.isActive);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={modal}>
      <Tooltip
        content={tooltipContent ?? 'Text'}
        hideTooltip={hideTooltip}
        side={tooltipPosition}
      >
        <PopoverTrigger asChild>
          <Button
            variant={activeBlock ? 'secondary' : 'ghost'}
            size={size ?? 'sm'}
            className={`flex items-center gap-0.5 pe-1! ${className || ''}`}
            type="button"
            onClick={() => {
              if (typeof propOnClick === 'function') propOnClick(editor);
            }}
          >
            {children ?? (
              <>
                <span>
                  {activeBlock ? (
                    <>
                      <activeBlock.icon />
                    </>
                  ) : (
                    <TypeIcon />
                  )}
                </span>

                <ChevronDownIcon className="size-2.5" />
              </>
            )}
          </Button>
        </PopoverTrigger>
      </Tooltip>

      <PopoverContent align={popoverAlign ?? 'start'} className="w-fit p-1">
        <div>
          {textBlocks.map((b) => (
            <Button
              key={b.id}
              onClick={() => {
                setOpen(false);
                b.onClick();
              }}
              variant={activeBlock?.id === b.id ? 'secondary' : 'ghost'}
              size="sm"
              className="flex w-full justify-start"
              aria-label={b.text}
              type="button"
            >
              <span>{<b.icon />}</span>
              <span>{b.text}</span>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
});
