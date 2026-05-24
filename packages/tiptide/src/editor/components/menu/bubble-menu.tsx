import { memo } from 'react';
import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/react/menus';
import { useEditorProvider } from '../../hooks/use-editor-provider';
import { cn } from '../../style';
import { Tools } from '../tools';

type BubbleMenuProps = {
  children?: React.ReactNode;
  className?: string;
};

const BubbleMenuComponent = memo(function BubbleMenu({
  children,
  className,
}: BubbleMenuProps) {
  const { editor, isBubbleMenuHidden } = useEditorProvider();

  if (isBubbleMenuHidden) return <></>;

  return (
    <TiptapBubbleMenu
      editor={editor}
      pluginKey={'default-bubble-menu'}
      className={cn(
        'tiptide-theme tiptide-bubble-menu-inner-element tt:bg-background tt:z-100 tt:flex tt:flex-wrap tt:items-center tt:gap-1 tt:rounded-md tt:border tt:p-1 tt:shadow-lg',
        className,
      )}
      updateDelay={40}
      shouldShow={({ editor, from, to }) => {
        if (!editor.isFocused) return false;

        if (from === to) return false;

        const isImage = editor.isActive('image');
        const isPlaceholder = editor.isActive('imagePlaceholder');

        if (isImage || isPlaceholder) {
          return false;
        }

        return true;
      }}
    >
      {children || (
        <>
          <Tools.textBlocks />
          <Tools.lists />
          <Tools.blockquote />
          <Tools.codeblock />

          <Tools.separator />

          <Tools.bold />
          <Tools.italic />
          <Tools.underline />
          <Tools.strike />
          <Tools.code />

          <Tools.separator />

          <Tools.colorSelector />

          <Tools.separator />

          <Tools.link />
        </>
      )}
    </TiptapBubbleMenu>
  );
});

// Attach tools to ToolBar for dot-notation usage
export const BubbleMenu = Object.assign(BubbleMenuComponent, {
  undo: Tools.undo,
  redo: Tools.redo,
  textBlocks: Tools.textBlocks,
  lists: Tools.lists,
  blockquote: Tools.blockquote,
  codeblock: Tools.codeblock,
  bold: Tools.bold,
  italic: Tools.italic,
  underline: Tools.underline,
  strike: Tools.strike,
  code: Tools.code,
  colorSelector: Tools.colorSelector,
  link: Tools.link,
  alignLeft: Tools.alignLeft,
  alignCenter: Tools.alignCenter,
  alignRight: Tools.alignRight,
  alignJustify: Tools.alignJustify,
  horizontalRule: Tools.horizontalRule,
  superscript: Tools.superscript,
  subscript: Tools.subscript,
  image: Tools.image,
  separator: Tools.separator,
});
