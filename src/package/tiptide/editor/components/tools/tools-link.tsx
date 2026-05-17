import {  useRef, useState , memo } from 'react';
import { useEditorState } from '@tiptap/react';
import {
  CornerDownLeftIcon,
  ExternalLinkIcon,
  LinkIcon,
  TrashIcon,
  UnlinkIcon,
} from 'lucide-react';

import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

import { Separator } from '../ui/separator';
import { Tooltip } from '../tooltip';
import { useEditorProvider } from '../../hooks/use-editor-provider';

import type { ToolProps } from '../../types/tool';

export const ToolsLink = memo(function ToolsLink({
  className,
  hideTooltip,
  tooltipContent,
  children,
  size,
  tooltipPosition,
  onClick: propOnClick,
  modal = false,
}: ToolProps & { modal?: boolean }) {
  const [linkUrl, setLinkUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { editor } = useEditorProvider();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isLink: ctx.editor.isActive('link'),
      canLink: ctx.editor.can().setLink({ href: 'https://example.com' }),
    }),
  });

  const closePopup = () => {
    setIsOpen(false);
    setLinkUrl('');
  };

  const handleSetLink = () => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: linkUrl })
        .run();
    }
    closePopup();
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal={modal}>
      {editorState.isLink ? (
        <Tooltip
          content={tooltipContent ?? 'Unlink'}
          hideTooltip={hideTooltip}
          side={tooltipPosition}
        >
          <Button
            variant="secondary"
            size={size ?? 'icon-sm'}
            aria-label="Unlink"
            onClick={() => {
              editor.chain().focus().extendMarkRange('link').unsetLink().run();
              if (typeof propOnClick === 'function') propOnClick(editor);
            }}
            type="button"
            className={className}
          >
            {children ?? <UnlinkIcon />}
          </Button>
        </Tooltip>
      ) : (
        <Tooltip
          content={tooltipContent ?? 'Link'}
          hideTooltip={hideTooltip}
          disabled={!editorState.canLink}
          side={tooltipPosition}
        >
          <PopoverTrigger asChild>
            <Button
              variant={isOpen ? 'secondary' : 'ghost'}
              size={size ?? 'icon-sm'}
              aria-label="Link"
              type="button"
              className={className}
              onClick={() => {
                if (typeof propOnClick === 'function') propOnClick(editor);
              }}
            >
              {children ?? <LinkIcon />}
            </Button>
          </PopoverTrigger>
        </Tooltip>
      )}

      <PopoverContent className="w-fit p-1">
        <div className="flex items-center gap-1">
          <input
            ref={inputRef}
            placeholder="https://example.com"
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSetLink();
              }
            }}
            className="px-4 py-1.5 text-sm outline-none"
            autoFocus
          />

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleSetLink}
              disabled={!linkUrl}
              type="button"
            >
              <CornerDownLeftIcon />
            </Button>

            <Separator />

            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => {
                window.open(linkUrl, '_blank');
              }}
              disabled={!linkUrl}
              type="button"
            >
              <ExternalLinkIcon />
            </Button>

            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => {
                setLinkUrl('');
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
              disabled={!linkUrl}
              type="button"
            >
              <TrashIcon />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
});

