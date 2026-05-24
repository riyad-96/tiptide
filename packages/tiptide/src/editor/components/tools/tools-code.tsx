import { memo } from 'react';
import { useEditorState } from '@tiptap/react';
import { CodeIcon } from 'lucide-react';

import { Button } from '../ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';
import type { ToolProps } from '../../types/tool';

export const ToolsCode = memo(function ToolsCode({
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
      isActive: ctx.editor.isActive('code'),
      can: ctx.editor.can().setCode(),
    }),
  });

  return (
    <Tooltip
      content={tooltipContent ?? 'Code'}
      hideTooltip={hideTooltip}
      disabled={!editorState.can}
      side={tooltipPosition}
    >
      <Button
        size={size ?? 'icon-sm'}
        variant={editorState.isActive ? 'secondary' : 'ghost'}
        onClick={() => {
          editor.chain().focus().toggleCode().run();
          if (typeof propOnClick === 'function') propOnClick(editor);
        }}
        aria-label="Toggle code"
        type="button"
        className={className}
      >
        {children ?? <CodeIcon className="size-4" />}
      </Button>
    </Tooltip>
  );
});
