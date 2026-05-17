import { memo } from 'react';
import { BubbleMenu } from '@tiptap/react/menus';
import { useEditorProvider } from '../../hooks/use-editor-provider';
import { cn } from '../../style';
import { Tools } from '../tools';

type ImageBubbleMenuProps = {
  children?: React.ReactNode;
  className?: string;
};

const ImageBubbleMenuComponent = memo(function ImageBubbleMenu({ children, className }: ImageBubbleMenuProps) {
  const { editor } = useEditorProvider();

  return (
    <BubbleMenu
      editor={editor}
      pluginKey={'image-bubble-menu'}
      shouldShow={({ editor }) => editor.isActive('image')}
      className={cn(
        'tiptide-bubble-menu-inner-element bg-background z-100 flex flex-wrap items-center gap-1 rounded-md border p-1 shadow-lg',
        className,
      )}
    >
      {children || (
        <>
          <Tools.imageAlignLeft />
          <Tools.imageAlignCenter />
          <Tools.imageAlignRight />

          <Tools.separator />

          <Tools.imageFullWidth />
          <Tools.imageRemove />
        </>
      )}
    </BubbleMenu>
  );
});

// Attach tools to ImageBubbleMenu for dot-notation usage
export const ImageBubbleMenu = Object.assign(ImageBubbleMenuComponent, {
  AlignLeft: Tools.imageAlignLeft,
  AlignCenter: Tools.imageAlignCenter,
  AlignRight: Tools.imageAlignRight,
  FullWidth: Tools.imageFullWidth,
  Remove: Tools.imageRemove,
  Separator: Tools.separator,
});
