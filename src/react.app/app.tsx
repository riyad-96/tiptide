import { TextEditor } from '../package/tiptide/editor/text-editor';
import 'tiptide/index.css';

export function App() {
  return <TextEditor onChange={() => console.log('Content updated')} />;
}
