import { memo } from 'react';
import { useEditorState } from '@tiptap/react';
import { AlignCenterIcon } from 'lucide-react';

import { Button } from '../ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';
import type { ToolProps } from '../../types/tool';

export const ToolsImageAlignCenter = memo(function ToolsImageAlignCenter({
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
      isActive: ctx.editor.isActive('image', { align: 'center' }),
    }),
  });

  const onClick = () => {
    const isAlreadyAligned = editor.isActive('image', { align: 'center' });
    editor
      .chain()
      .focus()
      .setImageAlign(isAlreadyAligned ? null : 'center')
      .run();
  };

  return (
    <Tooltip
      content={tooltipContent ?? 'Align Center'}
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
        {children ?? <AlignCenterIcon className="size-4" />}
      </Button>
    </Tooltip>
  );
});

