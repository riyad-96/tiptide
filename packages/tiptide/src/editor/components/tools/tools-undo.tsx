import { memo } from 'react';
import { useEditorState } from '@tiptap/react';
import { Undo2Icon } from 'lucide-react';

import { Button } from '../ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';
import type { ToolProps } from '../../types/tool';

export const ToolsUndo = memo(function ToolsUndo({
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
      can: editor.can().undo(),
    }),
  });

  return (
    <Tooltip
      content={tooltipContent ?? 'Undo'}
      hideTooltip={hideTooltip}
      disabled={!editorState.can}
      side={tooltipPosition}
    >
      <Button
        size={size ?? 'icon-sm'}
        variant="ghost"
        onClick={() => {
          editor.chain().focus().undo().run();
          if (typeof propOnClick === 'function') propOnClick(editor);
        }}
        aria-label="Undo"
        type="button"
        className={className}
      >
        {children ?? <Undo2Icon className="tt:size-4" />}
      </Button>
    </Tooltip>
  );
});
