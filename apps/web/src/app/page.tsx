import { BasicEditor } from '@/components/editor/basic-editor';

export default function Home() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr]">
      <header className="flex h-[50px] items-center border-b px-4">
        <p>
          <strong>Tiptide</strong> • This is a rich text editor built on top of
          tiptap and shadcn ui components.
        </p>
      </header>

      <div className="">
        <BasicEditor />
      </div>
    </div>
  );
}
