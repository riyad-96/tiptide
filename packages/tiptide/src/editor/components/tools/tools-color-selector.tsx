import { useState, memo } from 'react';
import { useEditorState } from '@tiptap/react';
import { ChevronDownIcon, PaletteIcon } from 'lucide-react';

import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '../../style';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';

import type { ToolProps } from '../../types/tool';

export const ToolsColorSelector = memo(function ToolsColorSelector({
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
      textColor: ctx.editor.getAttributes('textStyle').color,
      highlightColor: ctx.editor.getAttributes('highlight').color,
      canColor: ctx.editor.can().chain().setColor('#fff').run(),
      canHighlight: ctx.editor
        .can()
        .chain()
        .setHighlight({ color: '#fff' })
        .run(),
    }),
  });

  const colors = [
    { id: 1, color: '', text: 'Default' },
    { id: 2, color: 'oklch(65% 0.22 20)', text: 'Rose' },
    { id: 3, color: 'oklch(60% 0.25 30)', text: 'Red' },
    { id: 4, color: 'oklch(65% 0.20 50)', text: 'Orange' },
    { id: 5, color: 'oklch(70% 0.18 75)', text: 'Amber' },
    { id: 6, color: 'oklch(75% 0.17 100)', text: 'Yellow' },
    { id: 7, color: 'oklch(72% 0.18 130)', text: 'Lime' },
    { id: 8, color: 'oklch(65% 0.18 150)', text: 'Green' },
    { id: 9, color: 'oklch(62% 0.16 175)', text: 'Emerald' },
    { id: 10, color: 'oklch(60% 0.13 200)', text: 'Teal' },
    { id: 11, color: 'oklch(65% 0.13 230)', text: 'Cyan' },
    { id: 12, color: 'oklch(65% 0.14 260)', text: 'Sky' },
    { id: 13, color: 'oklch(60% 0.20 275)', text: 'Blue' },
    { id: 14, color: 'oklch(60% 0.18 295)', text: 'Indigo' },
    { id: 15, color: 'oklch(62% 0.20 315)', text: 'Purple' },
    { id: 16, color: 'oklch(65% 0.22 335)', text: 'Violet' },
    { id: 17, color: 'oklch(65% 0.20 355)', text: 'Pink' },
    { id: 18, color: 'oklch(60% 0.05 250)', text: 'Slate' },
    { id: 19, color: 'oklch(55% 0.02 0)', text: 'Gray' },
  ];

  const highlights = [
    { id: 1, color: '', text: 'Default' },
    { id: 2, color: 'oklch(70% 0.15 20 / 0.2)', text: 'Rose' },
    { id: 3, color: 'oklch(70% 0.15 30 / 0.2)', text: 'Red' },
    { id: 4, color: 'oklch(70% 0.15 50 / 0.2)', text: 'Orange' },
    { id: 5, color: 'oklch(70% 0.15 75 / 0.2)', text: 'Amber' },
    { id: 6, color: 'oklch(75% 0.15 100 / 0.2)', text: 'Yellow' },
    { id: 7, color: 'oklch(75% 0.15 130 / 0.2)', text: 'Lime' },
    { id: 8, color: 'oklch(70% 0.15 150 / 0.2)', text: 'Green' },
    { id: 9, color: 'oklch(70% 0.15 175 / 0.2)', text: 'Emerald' },
    { id: 10, color: 'oklch(70% 0.12 200 / 0.2)', text: 'Teal' },
    { id: 11, color: 'oklch(70% 0.12 230 / 0.2)', text: 'Cyan' },
    { id: 12, color: 'oklch(70% 0.12 260 / 0.2)', text: 'Sky' },
    { id: 13, color: 'oklch(70% 0.15 275 / 0.2)', text: 'Blue' },
    { id: 14, color: 'oklch(70% 0.15 295 / 0.2)', text: 'Indigo' },
    { id: 15, color: 'oklch(70% 0.15 315 / 0.2)', text: 'Purple' },
    { id: 16, color: 'oklch(70% 0.15 335 / 0.2)', text: 'Violet' },
    { id: 17, color: 'oklch(70% 0.15 355 / 0.2)', text: 'Pink' },
    { id: 18, color: 'oklch(70% 0.05 250 / 0.2)', text: 'Slate' },
    { id: 19, color: 'oklch(70% 0.02 0 / 0.2)', text: 'Gray' },
  ];

  const activeTextColor = colors.find((c) => c.color === editorState.textColor);
  const activeHighlightColor = highlights.find(
    (h) => h.color === editorState.highlightColor,
  );

  const isColorActive = activeTextColor || activeHighlightColor;
  const canColorOrHighlight = editorState.canColor && editorState.canHighlight;

  return (
    <Popover open={open} onOpenChange={setOpen} modal={modal}>
      <Tooltip
        content={tooltipContent ?? 'Highlight'}
        hideTooltip={hideTooltip}
        disabled={!canColorOrHighlight}
        side={tooltipPosition}
      >
        <PopoverTrigger asChild>
          <Button
            variant={isColorActive || open ? 'secondary' : 'ghost'}
            size={size ?? 'sm'}
            className={`tt:flex tt:items-center tt:gap-0.5 tt:pe-1! ${className || ''}`}
            type="button"
            onClick={() => {
              if (typeof propOnClick === 'function') propOnClick(editor);
            }}
          >
            {children ?? (
              <>
                <PaletteIcon />
                <ChevronDownIcon className="tt:size-2.5" />
              </>
            )}
          </Button>
        </PopoverTrigger>
      </Tooltip>

      <PopoverContent
        align={popoverAlign ?? 'start'}
        className="tt:w-fit tt:overflow-hidden tt:p-0"
      >
        <div className="tt:max-h-62.5 tt:min-w-37.5 tt:space-y-2.5 tt:overflow-y-auto tt:p-1 tt:py-2">
          <div className="tt:grid tt:gap-1">
            <span className="tt:px-2.5 tt:text-xs tt:text-neutral-700 tt:dark:text-neutral-300">
              Colors
            </span>
            <div className="tt:grid">
              {colors.map((c) => (
                <Button
                  key={c.id}
                  size="sm"
                  variant={
                    activeTextColor?.color === c.color ? 'secondary' : 'ghost'
                  }
                  className={cn(
                    'tt:flex tt:h-9 tt:items-center tt:justify-start tt:gap-2 tt:px-2.5',
                  )}
                  aria-label={c.text}
                  onClick={() => {
                    if (c.color) {
                      editor.chain().focus().setColor(c.color).run();
                    } else {
                      editor
                        .chain()
                        .focus()
                        .setColor('var(--tt-editor-default-text-clr)')
                        .run();
                    }
                    setOpen(false);
                  }}
                  disabled={!editorState.canColor}
                  type="button"
                >
                  <span
                    className="tt:grid tt:size-6 tt:place-items-center tt:rounded-sm tt:border tt:border-border"
                    style={{ color: c.color }}
                  >
                    A
                  </span>
                  <span>{c.text}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="tt:grid tt:gap-1">
            <span className="tt:px-2.5 tt:text-xs tt:text-neutral-700 tt:dark:text-neutral-300">
              Highlights
            </span>
            <div className="tt:grid">
              {highlights.map((h) => (
                <Button
                  key={h.id}
                  size="sm"
                  variant={
                    activeHighlightColor?.color === h.color
                      ? 'secondary'
                      : 'ghost'
                  }
                  className={cn(
                    'tt:flex tt:h-9 tt:items-center tt:justify-start tt:gap-2 tt:px-2.5',
                  )}
                  aria-label={h.text}
                  onClick={() => {
                    if (h.color) {
                      editor
                        .chain()
                        .focus()
                        .setHighlight({ color: h.color })
                        .run();
                    } else {
                      editor
                        .chain()
                        .focus()
                        .setHighlight({ color: 'var(--tt-background)' })
                        .run();
                    }
                    setOpen(false);
                  }}
                  disabled={!editorState.canHighlight}
                  type="button"
                >
                  <span
                    className="tt:grid tt:size-6 tt:place-items-center tt:rounded-sm tt:border tt:border-border"
                    style={{ backgroundColor: h.color }}
                  >
                    A
                  </span>
                  <span>{h.text}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
});
