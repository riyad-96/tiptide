import {
  TiptideContentType,
  TiptideEditor,
  TiptideEditorType,
  Tools,
  Viewer,
} from 'tiptide';
import 'tiptide/index.css';

import { useLocalStorage } from 'kitzo';
import { useEffect, useState } from 'react';

export function BasicEditorExample() {
  const [isMounted, setIsMounted] = useState(false);

  const [content, setContent] = useLocalStorage<TiptideContentType>(
    'tiptide-basic-json-content',
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
      {/* Basic usage */}
      <div className="flex h-screen">
        <div className="flex-1">
          <TiptideEditor
            content={content}
            onChange={handleUpdate}
            hideTooltip
          />
        </div>
        <Tools.separator className="h-full" />
        <Viewer content={content} containerClassName="flex-1" />
      </div>
    </>
  );
}
