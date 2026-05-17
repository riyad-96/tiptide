import {
  TiptideContentType,
  // TiptideProvider,
  // TiptideTextarea,
  // Toolbar,
  // BubbleMenu,
  // ImageBubbleMenu,
  // Tools,
  TiptideEditor,
} from 'tiptide';
import 'tiptide/index.css';

import { useLocalStorage } from 'kitzo';
import React, { useEffect, useState } from 'react';

export function App() {
  const [isMounted, setIsMounted] = useState(false);

  const [content, setContent] = useLocalStorage<TiptideContentType>(
    'tiptide-json-content',
    null,
    {
      debounceMs: 400,
      onMount: (value) => {
        console.log(value);
      },
    },
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) return <></>;

  return (
    <>
      <TiptideEditor
        content={content}
        onChange={(editor) => setContent(editor.getJSON())}
      />

      {/* <TiptideProvider content={content} onChange={debounced} hideTooltip>
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
    </>
  );
}
