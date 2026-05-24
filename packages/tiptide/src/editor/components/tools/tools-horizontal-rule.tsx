import { memo } from 'react';
import { useEditorState } from '@tiptap/react';
import { SeparatorHorizontalIcon } from 'lucide-react';

import { Button } from '../ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';
import type { ToolProps } from '../../types/tool';

export const ToolsHorizontalRule = memo(function ToolsHorizontalRule({
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
      isActive: ctx.editor.isActive('separator'),
      can: ctx.editor.can().setHorizontalRule(),
    }),
  });

  return (
    <Tooltip
      content={tooltipContent ?? 'Horizontal Rule'}
      hideTooltip={hideTooltip}
      side={tooltipPosition}
    >
      <Button
        size={size ?? 'icon-sm'}
        variant={editorState.isActive ? 'secondary' : 'ghost'}
        onClick={() => {
          editor.chain().focus().setHorizontalRule().run();
          if (typeof propOnClick === 'function') propOnClick(editor);
        }}
        aria-label="Horizontal Rule"
        type="button"
        className={className}
      >
        {children ?? <SeparatorHorizontalIcon />}
      </Button>
    </Tooltip>
  );
});
