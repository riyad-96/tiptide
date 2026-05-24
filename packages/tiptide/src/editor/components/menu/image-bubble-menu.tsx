import { memo } from 'react';
import { BubbleMenu } from '@tiptap/react/menus';
import { useEditorProvider } from '../../hooks/use-editor-provider';
import { cn } from '../../style';
import { Tools } from '../tools';

type ImageBubbleMenuProps = {
  children?: React.ReactNode;
  className?: string;
};

const ImageBubbleMenuComponent = memo(function ImageBubbleMenu({
  children,
  className,
}: ImageBubbleMenuProps) {
  const { editor } = useEditorProvider();

  return (
    <BubbleMenu
      editor={editor}
      pluginKey={'image-bubble-menu'}
      shouldShow={({ editor }) => editor.isActive('image')}
      className={cn(
        'tiptide-theme tiptide-bubble-menu-inner-element tt:bg-background tt:z-100 tt:flex tt:flex-wrap tt:items-center tt:gap-1 tt:rounded-md tt:border tt:border-border tt:p-1 tt:shadow-lg',
        className,
      )}
      updateDelay={40}
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
