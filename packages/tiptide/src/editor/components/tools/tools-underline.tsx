import { memo } from 'react';
import { useEditorState } from '@tiptap/react';
import { UnderlineIcon } from 'lucide-react';

import { Button } from '../ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';
import type { ToolProps } from '../../types/tool';

export const ToolsUnderline = memo(function ToolsUnderline({
  className,
  hideTooltip,
  tooltipContent,
  children,
  size,
  tooltipPosition,
  onClick: propOnClick,
}: ToolProps) {
  const { editor } = useEditorProvider();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor.isActive('underline'),
      can: ctx.editor.can().setUnderline(),
    }),
  });

  return (
    <Tooltip
      content={tooltipContent ?? 'Underline'}
      hideTooltip={hideTooltip}
      disabled={!editorState.can}
      side={tooltipPosition}
    >
      <Button
        size={size ?? 'icon-sm'}
        variant={editorState.isActive ? 'secondary' : 'ghost'}
        onClick={() => {
          editor.chain().focus().toggleUnderline().run();
          if (typeof propOnClick === 'function') propOnClick(editor);
        }}
        aria-label="Toggle underline"
        type="button"
        className={className}
      >
        {children ?? <UnderlineIcon className="tt:size-4" />}
      </Button>
    </Tooltip>
  );
});
