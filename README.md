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
pnpm add react react-dom tailwindcss
```

## Quick Start

### 1. Import Styles

Import the pre-bundled CSS in your entry file (e.g., `main.tsx` or `_app.tsx`):

```tsx
import 'tiptide/styles';
```

### 2. Basic Usage

The `TextEditor` component is an all-in-one wrapper with default toolbars and menus.

```tsx
import { TextEditor } from 'tiptide';

export default function MyEditor() {
  return (
    <div className="h-[500px] overflow-hidden rounded-lg border">
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
  Toolbar,
  Tool,
  EditorContent,
  BubbleMenu,
  ImageBubbleMenu,
} from 'tiptide';

export default function CustomEditor() {
  return (
    <TextEditorProvider content="Custom layout">
      <div className="flex h-full flex-col rounded-xl border">
        {/* Place the toolbar anywhere */}
        <Toolbar>
          <Tools.undo />
          <Tools.redo />
          <Tools.separator />
          <Tools.bold />
          <Tools.italic />
          <Tools.underline />
        </Toolbar>

        <div className="flex-1 overflow-y-auto p-4">
          <EditorContent />
        </div>

        {/* Floating menus with custom tools */}
        <BubbleMenu>
          <Tools.bold />
          <Tools.italic />
          <Tools.link />
        </BubbleMenu>
        
        <ImageBubbleMenu />
      </div>
    </TextEditorProvider>
  );
}
```


## Component API

### `TextEditor`

| Prop                    | Type                       | Description                                              |
| :---------------------- | :------------------------- | :------------------------------------------------------- |
| `content`               | `string \| JSONContent`    | Initial content for the editor.                          |
| `onChange`              | `(editor: Editor) => void` | Callback triggered on every update.                      |
| `placeholder`           | `string`                   | Placeholder text shown when the editor is empty.         |
| `hideBubbleMenuOnTouch` | `boolean`                  | Hide the bubble menu on touch devices (default: `true`). |
| `hideTooltip`           | `boolean`                  | Hide tooltips for toolbar items.                         |

### `Tool`

The `Tool` component provides all individual editor tools as compound components. This allows for complete customization of toolbars and menus.

| Property | Description |
| :--- | :--- |
| `Tool.undo` / `Tool.redo` | History controls |
| `Tool.bold` / `Tool.italic` / `Tool.underline` / `Tool.strike` | Text formatting |
| `Tool.code` / `Tool.codeblock` | Code formatting |
| `Tool.textBlocks` | Heading and paragraph selector |
| `Tool.lists` | Bullet, ordered, and task list selector |
| `Tool.blockquote` | Quote block |
| `Tool.colorSelector` | Text color and highlight selector |
| `Tool.link` | Link management |
| `Tool.image` | Image placeholder insertion |
| `Tool.imageAlignLeft` / `Tool.imageAlignCenter` / `Tool.imageAlignRight` | Image alignment |
| `Tool.imageFullWidth` | Image full width toggle |
| `Tool.imageRemove` | Image removal |
| `Tool.alignLeft` / `Tool.alignCenter` / `Tool.alignRight` / `Tool.alignJustify` | Text alignment |
| `Tool.subscript` / `Tool.superscript` | Script controls |
| `Tool.horizontalRule` | Divider insertion |
| `Tool.separator` | UI separator |

#### Tool Props

All `Tool` components accept the following props:

| Prop | Type | Description |
| :--- | :--- | :--- |
| `className` | `string` | Custom CSS classes for the tool button. |
| `size` | `'sm' \| 'lg' \| 'default' \| 'icon' \| 'icon-sm'` | Size of the tool button. |
| `hideTooltip` | `boolean` | Hide the tooltip for this specific tool. |
| `tooltipContent` | `string` | Override the default tooltip text. |
| `tooltipPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | Position of the tooltip. |
| `onClick` | `(editor: Editor) => void` | Custom callback triggered after the tool's action. |
| `children` | `React.ReactNode` | Override the default icon/content of the tool. |

### `Viewer`

A read-only component to display saved content with consistent styling.

```tsx
import { Viewer } from 'tiptide';

<Viewer content={savedJsonContent} />;
```

## License

MIT © [Riyad](https://github.com/riyad-96)
