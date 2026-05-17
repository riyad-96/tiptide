import { memo } from 'react';
import { useEditorState } from '@tiptap/react';
import { Redo2Icon } from 'lucide-react';

import { Button } from '../ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';
import type { ToolProps } from '../../types/tool';

export const ToolsRedo = memo(function ToolsRedo({
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
    selector: () => ({
      can: editor.can().redo(),
    }),
  });

  return (
    <Tooltip
      content={tooltipContent ?? 'Redo'}
      hideTooltip={hideTooltip}
      disabled={!editorState.can}
      side={tooltipPosition}
    >
      <Button
        size={size ?? 'icon-sm'}
        variant="ghost"
        onClick={() => {
          editor.chain().focus().redo().run();
          if (typeof propOnClick === 'function') propOnClick(editor);
        }}
        aria-label="Redo"
        type="button"
        className={className}
      >
        {children ?? <Redo2Icon className="size-4" />}
      </Button>
    </Tooltip>
  );
});

