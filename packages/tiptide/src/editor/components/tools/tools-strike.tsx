import { memo } from 'react';
import { useEditorState } from '@tiptap/react';
import { StrikethroughIcon } from 'lucide-react';

import { Button } from '../ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';
import type { ToolProps } from '../../types/tool';

export const ToolsStrike = memo(function ToolsStrike({
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
      isActive: ctx.editor.isActive('strike'),
      can: ctx.editor.can().setStrike(),
    }),
  });

  return (
    <Tooltip
      content={tooltipContent ?? 'Strike'}
      hideTooltip={hideTooltip}
      disabled={!editorState.can}
      side={tooltipPosition}
    >
      <Button
        size={size ?? 'icon-sm'}
        variant={editorState.isActive ? 'secondary' : 'ghost'}
        onClick={() => {
          editor.chain().focus().toggleStrike().run();
          if (typeof propOnClick === 'function') propOnClick(editor);
        }}
        aria-label="Toggle strike"
        type="button"
        className={className}
      >
        {children ?? <StrikethroughIcon className="tt:size-4" />}
      </Button>
    </Tooltip>
  );
});
