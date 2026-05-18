'use client';

import { useLocalStorage, useMounted } from 'kitzo';
import { type TiptideContentType, TiptideEditor, Viewer } from 'tiptide';
import 'tiptide/styles';
import { ResizablePanelWindow } from '../snippets/resizable-panel';

export function BasicEditor() {
  const [content, setContent] = useLocalStorage<TiptideContentType>(
    'basic-editor',
    null,
    {
      debounceMs: 400,
    },
  );

  const isMounted = useMounted();

  if (!isMounted)
    return <div className="grid h-screen place-items-center">Loading...</div>;

  return (
    <ResizablePanelWindow
      firstNode={
        <TiptideEditor
          content={content}
          onChange={(editor) => {
            setContent(editor.getJSON());
          }}
        />
      }
      secondNode={<Viewer content={content} />}
    />
  );
}
