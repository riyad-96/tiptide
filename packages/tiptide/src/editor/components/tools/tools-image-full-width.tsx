import { memo } from 'react';
import { useEditorState } from '@tiptap/react';
import { MaximizeIcon } from 'lucide-react';

import { Button } from '../ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';
import type { ToolProps } from '../../types/tool';

export const ToolsImageFullWidth = memo(function ToolsImageFullWidth({
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
      isActive: ctx.editor.isActive('image', { width: '100%' }),
    }),
  });

  return (
    <Tooltip
      content={tooltipContent ?? 'Full Width'}
      hideTooltip={hideTooltip}
      side={tooltipPosition ?? 'top'}
    >
      <Button
        variant={editorState.isActive ? 'secondary' : 'ghost'}
        size={size ?? 'icon-sm'}
        onClick={() => {
          editor.chain().focus().setImageFullWidth().run();
          if (typeof propOnClick === 'function') propOnClick(editor);
        }}
        type="button"
        className={className}
      >
        {children ?? <MaximizeIcon className="tt:size-4" />}
      </Button>
    </Tooltip>
  );
});
