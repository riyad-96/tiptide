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
import 'tiptide/tiptide.css';

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

  async function handleOnUpload(file: File) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const url = URL.createObjectURL(file);

    console.log(url);
    return url;
  }

  if (!isMounted) return <></>;

  return (
    <>
      {/* Advanced usage */}
      <div className="flex h-screen">
        <div className="flex-1">
          <TiptideProvider
            content={content}
            onChange={handleUpdate}
            onUpload={handleOnUpload}
          >
            <Toolbar>
              <Toolbar.image
                onMediaLibraryClick={(editor) => {
                  console.log(editor.getHTML());
                }}
              />
            </Toolbar>
            <TiptideTextarea />

            <BubbleMenu />
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

        <div className="grid flex-1 grid-rows-[49px_1fr]">
          <div className="border-b"></div>
          <Viewer content={content} />
        </div>
      </div>
    </>
  );
}
