'use client';

import { useLocalStorage, useMounted } from 'kitzo';
import { type TiptideContentType, TiptideEditor, Viewer } from 'tiptide';
import 'tiptide/styles';
import { ResizablePanelWindow } from '../snippets/resizable-panel';

interface BasicEditorProps {
  preview?: boolean;
}

export function BasicEditor({ preview = true }: BasicEditorProps) {
  const [content, setContent] = useLocalStorage<TiptideContentType>(
    'basic-editor',
    null,
    {
      debounceMs: 400,
    },
  );

  const isMounted = useMounted();

  if (!isMounted)
    return <div className="grid h-full place-items-center">Loading...</div>;

  if (!preview) {
    return (
      <div className="h-[400px]">
        <TiptideEditor
          placeholder="Start writing..."
          content={content}
          onChange={(editor) => {
            setContent(editor.getJSON());
          }}
        />
      </div>
    );
  }

  return (
    <ResizablePanelWindow
      firstNode={
        <TiptideEditor
          placeholder="Start writing..."
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
