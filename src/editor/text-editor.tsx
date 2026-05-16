import { useMemo } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';

import { BubbleMenu } from './components/menu/bubble-menu';
import { ToolBar } from './components/toolbar';
import { tiptapExtensions } from './extensions';
import { TooltipProvider } from './components/ui/tooltip';
import { tiptapStyleClasses } from './style';
import { editorContext } from './context/editor-context';
import { useEditorProvider } from './hooks/use-editor-provider';
import type { TextEditorProps } from './types/text-editor';
import { ImageBubbleMenu } from './components/menu/image-bubble-menu';

export function TextEditorProvider({
  hideBubbleMenuOnTouch = true,
  content,
  onChange,
  placeholder,
  hideTooltip = false,
  children,
  ...rest
}: TextEditorProps & { children?: React.ReactNode }) {
  const editor = useEditor({
    extensions: tiptapExtensions({ placeholder }),
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: tiptapStyleClasses,
      },
    },
    onMount: (props) => {
      if (typeof rest.onMount === 'function') rest.onMount(props.editor);
    },
    onUpdate: (props) => {
      if (typeof onChange == 'function') onChange(props.editor);
    },
    content,
  });

  const isBubbleMenuHidden = useMemo(() => {
    if (hideBubbleMenuOnTouch && typeof window !== 'undefined') {
      return window.matchMedia('(pointer: coarse)').matches;
    }
    return false;
  }, [hideBubbleMenuOnTouch]);

  const value = useMemo(() => {
    if (!editor) return null;

    return {
      editor,
      isBubbleMenuHidden,
      hideTooltip,
    };
  }, [editor, isBubbleMenuHidden, hideTooltip]);

  if (!editor) return null;

  return (
    <editorContext.Provider value={value}>
      <TooltipProvider>{children}</TooltipProvider>
    </editorContext.Provider>
  );
}

export function TextEditor(props: TextEditorProps) {
  return (
    <TextEditorProvider {...props}>
      <div className="tiptide-wrapper">
        <ToolBar />
        <EditorContentWrapper />
      </div>
      <BubbleMenu />
      <ImageBubbleMenu />
    </TextEditorProvider>
  );
}

function EditorContentWrapper() {
  const { editor } = useEditorProvider();

  return (
    <EditorContent editor={editor} className="tiptide-content" spellCheck={false} />
  );
}
