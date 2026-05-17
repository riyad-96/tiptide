import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/react/menus';
import { useEditorProvider } from '../../hooks/use-editor-provider';
import { cn } from '../../style';
import { Tools } from '../tools';

type BubbleMenuProps = {
  children?: React.ReactNode;
  className?: string;
};

export function BubbleMenu({ children, className }: BubbleMenuProps) {
  const { editor, isBubbleMenuHidden } = useEditorProvider();

  if (isBubbleMenuHidden) return <></>;

  return (
    <TiptapBubbleMenu
      editor={editor}
      pluginKey={'default-bubble-menu'}
      className={cn(
        'tiptide-bubble-menu-inner-element bg-background z-100 flex flex-wrap items-center gap-1 rounded-md border p-1 shadow-lg',
        className,
      )}
      updateDelay={80}
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
}

// Attach tools to ToolBar for dot-notation usage
BubbleMenu.undo = Tools.undo;
BubbleMenu.redo = Tools.redo;
BubbleMenu.textBlocks = Tools.textBlocks;
BubbleMenu.lists = Tools.lists;
BubbleMenu.blockquote = Tools.blockquote;
BubbleMenu.codeblock = Tools.codeblock;
BubbleMenu.bold = Tools.bold;
BubbleMenu.italic = Tools.italic;
BubbleMenu.underline = Tools.underline;
BubbleMenu.strike = Tools.strike;
BubbleMenu.code = Tools.code;
BubbleMenu.colorSelector = Tools.colorSelector;
BubbleMenu.link = Tools.link;
BubbleMenu.alignLeft = Tools.alignLeft;
BubbleMenu.alignCenter = Tools.alignCenter;
BubbleMenu.alignRight = Tools.alignRight;
BubbleMenu.alignJustify = Tools.alignJustify;
BubbleMenu.horizontalRule = Tools.horizontalRule;
BubbleMenu.superscript = Tools.superscript;
BubbleMenu.subscript = Tools.subscript;
BubbleMenu.image = Tools.image;
BubbleMenu.separator = Tools.separator;
