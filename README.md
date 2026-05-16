# Tiptide 🌊

A powerful, modular, and beautifully crafted text editor built on top of [Tiptap](https://tiptap.dev/). Tiptide provides a suite of compound components and extensions to build modern editing experiences in React.

## Features

- **Compound Component Architecture**: Full control over the editor's layout and UI.
- **Rich Extensions**: Includes StarterKit, TaskLists, Slash Commands, Image Uploads, and more.
- **Premium Design**: Styled with a clean, modern aesthetic using Tailwind CSS.
- **Slash Commands**: Quick access to formatting and blocks via `/`.
- **Drag & Drop**: Global drag handler for easy reordering of blocks.
- **Image Resizing**: Advanced image handling with resizing and alignment.
- **Type Safe**: Fully written in TypeScript.

## Installation

```bash
pnpm add tiptide
```

### Peer Dependencies

Tiptide requires React 19+ and Tailwind CSS.

```bash
pnpm add react react-dom tailwindcss @tailwindcss/typography
```

## Quick Start

### 1. Import Styles
Import the pre-bundled CSS in your entry file (e.g., `main.tsx` or `_app.tsx`):

```tsx
import 'tiptide/dist/tiptide.css';
```

### 2. Basic Usage
The `TextEditor` component is an all-in-one wrapper with default toolbars and menus.

```tsx
import { TextEditor } from 'tiptide';

export default function MyEditor() {
  return (
    <div className="h-[500px] border rounded-lg overflow-hidden">
      <TextEditor 
        content="<p>Hello Tiptide!</p>" 
        onChange={(editor) => console.log(editor.getHTML())}
        placeholder="Type '/' for commands..."
      />
    </div>
  );
}
```

## Advanced Usage (Compound Components)

If you need a custom layout, you can compose the editor manually using the `TextEditorProvider`.

```tsx
import { 
  TextEditorProvider, 
  ToolBar, 
  EditorContent, 
  BubbleMenu, 
  ImageBubbleMenu 
} from 'tiptide';

export default function CustomEditor() {
  return (
    <TextEditorProvider content="Custom layout">
      <div className="flex flex-col h-full border rounded-xl">
        {/* Place the toolbar anywhere */}
        <ToolBar /> 
        
        <div className="flex-1 overflow-y-auto p-4">
           <EditorContent />
        </div>

        {/* Floating menus */}
        <BubbleMenu />
        <ImageBubbleMenu />
      </div>
    </TextEditorProvider>
  );
}
```

## Tailwind CSS Configuration

Tiptide uses Tailwind CSS for styling. To ensure everything looks perfect, make sure you have the `@tailwindcss/typography` plugin installed and configured in your `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

*Note: If you are using Tailwind 4, simply import the plugin in your CSS:*
```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

## Component API

### `TextEditor`
| Prop | Type | Description |
| :--- | :--- | :--- |
| `content` | `string \| JSONContent` | Initial content for the editor. |
| `onChange` | `(editor: Editor) => void` | Callback triggered on every update. |
| `placeholder` | `string` | Placeholder text shown when the editor is empty. |
| `hideBubbleMenuOnTouch` | `boolean` | Hide the bubble menu on touch devices (default: `true`). |
| `hideTooltip` | `boolean` | Hide tooltips for toolbar items. |

### `Viewer`
A read-only component to display saved content with consistent styling.

```tsx
import { Viewer } from 'tiptide';

<Viewer content={savedJsonContent} />
```

## License

MIT © [Riyad](https://github.com/riyad-96)
