import {
  BubbleMenu,
  ImageBubbleMenu,
  TiptideContentType,
  TiptideEditorType,
  TiptideProvider,
  TiptideTextarea,
  Toolbar,
  Tools,
  Viewer,
} from 'tiptide';
import 'tiptide/index.css';

import { useLocalStorage } from 'kitzo';
import { useEffect, useState } from 'react';

export function AdvancedEditorExample() {
  const [isMounted, setIsMounted] = useState(false);

  const [content, setContent] = useLocalStorage<TiptideContentType>(
    'tiptide-advanced-json-content',
    null,
    {
      debounceMs: 400,
      onMount: (value) => {
        console.log(value);
      },
    },
  );

  function handleUpdate(editor: TiptideEditorType) {
    setContent(editor.getJSON());
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) return <></>;

  return (
    <>
      {/* Advanced usage */}
      <div className="flex h-screen">
        <div className="flex-1">
          <TiptideProvider
            content={content}
            onChange={handleUpdate}
            hideTooltip
          >
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
          </TiptideProvider>
        </div>

        <Tools.separator className="h-full" />
        <Viewer content={content} containerClassName="flex-1" />
      </div>
    </>
  );
}
