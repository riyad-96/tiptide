import { memo } from 'react';
import { useEditorState } from '@tiptap/react';
import { SuperscriptIcon } from 'lucide-react';

import { Button } from '../ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';
import type { ToolProps } from '../../types/tool';

export const ToolsSuperscript = memo(function ToolsSuperscript({
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
      isActive: ctx.editor.isActive('superscript'),
      can: ctx.editor.can().toggleSuperscript(),
    }),
  });

  return (
    <Tooltip
      content={tooltipContent ?? 'Superscript'}
      hideTooltip={hideTooltip}
      disabled={!editorState.can}
      side={tooltipPosition}
    >
      <Button
        size={size ?? 'icon-sm'}
        variant={editorState.isActive ? 'secondary' : 'ghost'}
        onClick={() => {
          editor.chain().focus().toggleSuperscript().run();
          if (typeof propOnClick === 'function') propOnClick(editor);
        }}
        type="button"
        className={className}
      >
        {children ?? <SuperscriptIcon />}
      </Button>
    </Tooltip>
  );
});

