import { memo } from 'react';
import { useEditorState } from '@tiptap/react';
import { AlignLeftIcon } from 'lucide-react';

import { Button } from '../ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';
import type { ToolProps } from '../../types/tool';

export const ToolsImageAlignLeft = memo(function ToolsImageAlignLeft({
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
      isActive: ctx.editor.isActive('image', { align: 'left' }),
    }),
  });

  const onClick = () => {
    const isAlreadyAligned = editor.isActive('image', { align: 'left' });
    editor
      .chain()
      .focus()
      .setImageAlign(isAlreadyAligned ? null : 'left')
      .run();
  };

  return (
    <Tooltip
      content={tooltipContent ?? 'Align Left'}
      hideTooltip={hideTooltip}
      side={tooltipPosition ?? 'top'}
    >
      <Button
        variant={editorState.isActive ? 'secondary' : 'ghost'}
        size={size ?? 'icon-sm'}
        onClick={() => {
          onClick();
          if (typeof propOnClick === 'function') propOnClick(editor);
        }}
        type="button"
        className={className}
      >
        {children ?? <AlignLeftIcon className="size-4" />}
      </Button>
    </Tooltip>
  );
});

