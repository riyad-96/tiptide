/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BubbleMenu,
  ImageBubbleMenu,
  TiptideContentType,
  // TiptideProvider,
  // TiptideTextarea,
  // Toolbar,
  // BubbleMenu,
  // ImageBubbleMenu,
  // Tools,
  TiptideEditor,
  TiptideEditorType,
  TiptideJSONContentType,
  TiptideProvider,
  TiptideTextarea,
  Toolbar,
  Tools,
  Viewer,
} from 'tiptide';
import 'tiptide/index.css';

import { useLocalStorage } from 'kitzo';
import { useEffect, useState, useRef } from 'react';

export function App() {
  const [isMounted, setIsMounted] = useState(false);

  const [content, setContent] = useLocalStorage<TiptideJSONContentType>(
    'tiptide-json-content',
    {},
    {
      debounceMs: 400,
      onMount: (value) => {
        console.log(value);
      },
    },
  );

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleUpdate = (editor: TiptideEditorType) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setContent(editor.getJSON());
    }, 400);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) return <></>;

  return (
    <div className="flex h-screen">
      {/* Basic usage */}
      <TiptideEditor
        content={content}
        onChange={(editor) => setContent(editor.getJSON())}
        hideTooltip
      />

      <Tools.separator className="h-full" />

      <div className="pt-12.5">
        <Viewer content={content} />
      </div>

      {/* Advanced usage */}
      {/* <TiptideProvider content={content} onChange={handleUpdate} hideTooltip>
        <Toolbar>
          <Tools.undo />
          <Tools.redo />
          <Tools.separator />
          <Tools.textBlocks />
          <Tools.bold />
          <Tools.italic />
          <Tools.underline />
          <Tools.strike />
          <Tools.separator />
          <Tools.colorSelector />
          <Tools.separator />
          <Tools.subscript />
          <Tools.superscript />
          <Tools.separator />
          <Tools.lists />
          <Tools.separator />
          <Tools.blockquote />
          <Tools.codeblock />
          <Tools.code />
          <Tools.separator />
          <Tools.link />
          <Tools.image />
          <Tools.separator />
          <Tools.alignCenter />
          <Tools.alignLeft />
          <Tools.alignRight />
          <Tools.alignJustify />
        </Toolbar>

        <TiptideTextarea />

        <BubbleMenu>
          <Tools.undo />
          <Tools.redo />
          <Tools.separator />
          <Tools.textBlocks />
          <Tools.bold />
          <Tools.italic />
          <Tools.underline />
          <Tools.strike />
          <Tools.separator />
          <Tools.colorSelector />
          <Tools.separator />
          <Tools.subscript />
          <Tools.superscript />
          <Tools.separator />
          <Tools.lists />
          <Tools.separator />
          <Tools.blockquote />
          <Tools.codeblock />
          <Tools.code />
          <Tools.separator />
          <Tools.link />
          <Tools.image />
          <Tools.separator />
          <Tools.alignCenter />
          <Tools.alignLeft />
          <Tools.alignRight />
          <Tools.alignJustify />
        </BubbleMenu>

        <ImageBubbleMenu>
          <Tools.imageAlignLeft />
          <Tools.imageAlignCenter />
          <Tools.imageAlignRight />
          <Tools.imageFullWidth />
          <Tools.imageRemove />
        </ImageBubbleMenu>
      </TiptideProvider> */}
    </div>
  );
}
