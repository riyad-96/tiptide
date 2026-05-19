# Tiptide

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

## Quick Start

### 1. Import Styles

Import the pre-bundled CSS in your entry file (e.g., `main.tsx` or `_app.tsx`):

```tsx
import 'tiptide/styles';
```

### 2. Basic Usage

The `TiptideEditor` component is an all-in-one wrapper with default toolbars and menus.

```tsx
import { TiptideEditor } from 'tiptide';

export default function MyEditor() {
  return (
    <div className="h-[500px] overflow-hidden rounded-lg border">
      <TiptideEditor
        content="<p>Hello Tiptide!</p>"
        onChange={(editor) => console.log(editor.getHTML())}
        placeholder="Type '/' for commands..."
      />
    </div>
  );
}
```

## Advanced Usage (Compound Components)

If you need a custom layout, you can compose the editor manually using the `TiptideProvider`.

```tsx
import {
  TiptideProvider,
  Toolbar,
  Tools,
  TiptideTextarea,
  BubbleMenu,
  ImageBubbleMenu,
} from 'tiptide';

export default function CustomEditor() {
  return (
    <TiptideProvider content="Custom layout">
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
          <TiptideTextarea />
        </div>

        {/* Floating menus with custom tools */}
        <BubbleMenu>
          <Tools.bold />
          <Tools.italic />
          <Tools.link />
        </BubbleMenu>

        <ImageBubbleMenu />
      </div>
    </TiptideProvider>
  );
}
```

## Component API

### `TiptideEditor`

| Prop                    | Type                       | Description                                              |
| :---------------------- | :------------------------- | :------------------------------------------------------- |
| `content`               | `string \| JSONContent`    | Initial content for the editor.                          |
| `onChange`              | `(editor: Editor) => void` | Callback triggered on every update.                      |
| `placeholder`           | `string`                   | Placeholder text shown when the editor is empty.         |
| `hideBubbleMenuOnTouch` | `boolean`                  | Hide the bubble menu on touch devices (default: `true`). |
| `hideTooltip`           | `boolean`                  | Hide tooltips for toolbar items.                         |

### `Tools`

The `Tools` object provides all individual editor tools as compound components. This allows for complete customization of toolbars and menus.

| Property                                                                            | Description                             |
| :---------------------------------------------------------------------------------- | :-------------------------------------- |
| `Tools.undo` / `Tools.redo`                                                         | History controls                        |
| `Tools.bold` / `Tools.italic` / `Tools.underline` / `Tools.strike`                  | Text formatting                         |
| `Tools.code` / `Tools.codeblock`                                                    | Code formatting                         |
| `Tools.textBlocks`                                                                  | Heading and paragraph selector          |
| `Tools.lists`                                                                       | Bullet, ordered, and task list selector |
| `Tools.blockquote`                                                                  | Quote block                             |
| `Tools.colorSelector`                                                               | Text color and highlight selector       |
| `Tools.link`                                                                        | Link management                         |
| `Tools.image`                                                                       | Image placeholder insertion             |
| `Tools.imageAlignLeft` / `Tools.imageAlignCenter` / `Tools.imageAlignRight`         | Image alignment                         |
| `Tools.imageFullWidth`                                                              | Image full width toggle                 |
| `Tools.imageRemove`                                                                 | Image removal                           |
| `Tools.alignLeft` / `Tools.alignCenter` / `Tools.alignRight` / `Tools.alignJustify` | Text alignment                          |
| `Tools.subscript` / `Tools.superscript`                                             | Script controls                         |
| `Tools.horizontalRule`                                                              | Divider insertion                       |
| `Tools.separator`                                                                   | UI separator                            |

#### Tools Props

All `Tools` components accept the following props:

| Prop              | Type                                               | Description                                        |
| :---------------- | :------------------------------------------------- | :------------------------------------------------- |
| `className`       | `string`                                           | Custom CSS classes for the tool button.            |
| `size`            | `'sm' \| 'lg' \| 'default' \| 'icon' \| 'icon-sm'` | Size of the tool button.                           |
| `hideTooltip`     | `boolean`                                          | Hide the tooltip for this specific tool.           |
| `tooltipContent`  | `string`                                           | Override the default tooltip text.                 |
| `tooltipPosition` | `'top' \| 'bottom' \| 'left' \| 'right'`           | Position of the tooltip.                           |
| `onClick`         | `(editor: Editor) => void`                         | Custom callback triggered after the tool's action. |
| `children`        | `React.ReactNode`                                  | Override the default icon/content of the tool.     |

### `Viewer`

A read-only component to display saved content with consistent styling.

```tsx
import { Viewer } from 'tiptide';

<Viewer content={savedContent} />;
```

## Image Insertion & Uploading Guide

Tiptide provides a premium, strictly-typed image insertion system that accommodates standard image URLs, direct computer file uploads, inline editor canvas placeholders, and custom media library components.

### 1. Simple Image URL Insertion

Users can directly input any web image link.

- **Workflow:** Clicking the image tool in the toolbar opens a Popover menu. Users paste their image URL into the input field and press **Insert**.
- **Result:** Directly embeds a standard image node: `<img src="url" width="100%" height="auto" />`.

### 2. Direct Asynchronous Uploads (`onUpload`)

To handle file uploads securely, developers can supply an `onUpload` function.

- **Setup:** Pass an `onUpload` callback to `<TiptideEditor>` or `<TiptideProvider>`.
- **Typing:** `(file: File) => Promise<string> | string`
- **Result:** Clicking **Upload from computer** in the Popover lets the user pick a file. Tiptide enters an uploading spin state, uploads the file via your custom API, and embeds the returned image URL automatically.

```tsx
import { TiptideEditor } from 'tiptide';

export default function MyEditor() {
  const handleUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    return data.url; // Returns the uploaded image URL string
  };

  return <TiptideEditor onUpload={handleUpload} />;
}
```

### 3. Custom Canvas Image Placeholders

If you want inline upload spaces directly in the document page rather than doing a quiet background upload:

- **Default:** Click **Insert upload placeholder card** in the image popover to drop a gorgeous dashed uploading card. Inside, users can click to select files (or drag/drop them).
- **Customization:** Customize the look of these cards by passing your own React component via `imagePlaceholderBlock`.

```tsx
import { TiptideEditor, CustomPlaceholderProps } from 'tiptide';

const MyCustomPlaceholderBlock = ({
  editor,
  getPos,
  deleteNode,
}: CustomPlaceholderProps) => {
  return (
    <div className="flex flex-col items-center rounded-lg border border-purple-500 bg-purple-50 p-6">
      <p className="text-sm">
        Drag or select files inside my special library view!
      </p>
      <button onClick={() => deleteNode()}>Cancel</button>
    </div>
  );
};

// Insert your custom placeholder card in the editor
<TiptideEditor imagePlaceholderBlock={MyCustomPlaceholderBlock} />;
```

### 4. Custom Media Libraries (Overriding Toolbar Click)

For enterprise apps with advanced media drawers/galleries, you can bypass Tiptide's default popover completely or add an action button to it:

#### Option A: Full Toolbar Button Override

Pass `onClick` to the image tool to trigger your own modal directly:

```tsx
import { Toolbar, Tools, TiptideEditorType } from 'tiptide';

export function EditorToolbar() {
  const openMediaLibrary = (editor: TiptideEditorType) => {
    myModal.open((selectedImageUrl) => {
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'image',
          attrs: { src: selectedImageUrl, width: '100%', height: 'auto' },
        })
        .run();
    });
  };

  return (
    <Toolbar>
      {/* Clicking the image tool immediately triggers your own library, bypassing the Popover */}
      <Tools.image onClick={openMediaLibrary} />
    </Toolbar>
  );
}
```

#### Option B: Integrated Popover Dropdown Button

If you want to keep the default Link / Direct File uploader but **also** want to add a button to open your custom media library, pass `onMediaLibraryClick` to the tool:

```tsx
import { Toolbar, Tools, TiptideEditorType } from 'tiptide';

export function EditorToolbar() {
  const openMediaLibrary = (editor: TiptideEditorType) => {
    myModal.open((url) => {
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'image',
          attrs: { src: url, width: '100%', height: 'auto' },
        })
        .run();
    });
  };

  return (
    <Toolbar>
      {/* Kept default popover options + renders extra "Choose from media library" button */}
      <Tools.image onMediaLibraryClick={openMediaLibrary} />
    </Toolbar>
  );
}
```

## License

MIT © [Riyad](https://github.com/riyad-96)
