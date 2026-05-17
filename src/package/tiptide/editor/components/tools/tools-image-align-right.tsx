import { useEditorState } from '@tiptap/react';
import { AlignRightIcon } from 'lucide-react';

import { Button } from '../ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';
import type { ToolProps } from '../../types/tool';

export function ToolsImageAlignRight({
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
      isActive: ctx.editor.isActive('image', { align: 'right' }),
    }),
  });

  const onClick = () => {
    const isAlreadyAligned = editor.isActive('image', { align: 'right' });
    editor
      .chain()
      .focus()
      .setImageAlign(isAlreadyAligned ? null : 'right')
      .run();
  };

  return (
    <Tooltip
      content={tooltipContent ?? 'Align Right'}
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
        {children ?? <AlignRightIcon className="size-4" />}
      </Button>
    </Tooltip>
  );
}
