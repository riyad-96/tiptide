import { TextEditor } from '../package/tiptide/editor/text-editor';

export function App() {
  return (
    <div className="h-screen w-screen border bg-zinc-50 p-10 dark:bg-zinc-950">
      <TextEditor
        placeholder="Start typing something amazing..."
        onChange={() => console.log('Content updated')}
      />
    </div>
  );
}
