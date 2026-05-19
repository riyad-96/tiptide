export interface DocSection {
  slug: string;
  title: string;
  description: string;
  content: string;
  codeExample?: string;
  codeLanguage?: string;
}

export const docSections: DocSection[] = [
  {
    slug: 'introduction',
    title: 'Introduction',
    description:
      'Welcome to Tiptide, a modular, beautiful compound rich text editor built on top of Tiptap.',
    content: `Tiptide is a high-performance, developer-first rich text editor for React. Instead of giving you a monolithic, uncustomizable textarea, Tiptide is designed using the **Compound Component Pattern**.

This means you can import, arrange, and style every single element of the editor—from individual toolbar buttons to context-dependent bubble menus—exactly the way you want.

### Key Benefits

*   **Compound Component Architecture:** Ultimate layouts flexibility. Position toolbars on top, bottom, or build floating custom controls.
*   **Neutral Minimal Styling:** Minimal black and white theme built using pure Tailwind CSS and zero-shadow Radix UI foundations.
*   **Fully Configured Extensions:** Out of the box support for basic formatting, links, colors, lists, drag-handles, images, superscripts, code-blocks, and more.
*   **Native Viewer:** Export and display content with the unified \`<Viewer />\` component that preserves styles perfectly.
*   **Strict Type-Safety:** Fully written in TypeScript with robust types for editor states, contents, and contexts.`,
    codeExample: `// Simple direct usage
import { TiptideEditor } from 'tiptide';
import 'tiptide/styles';

function Editor() {
  return (
    <TiptideEditor
      content="<p>Start writing...</p>"
      onChange={(editor) => {
        console.log(editor.getHTML());
      }}
    />
  );
}`,
    codeLanguage: 'tsx',
  },
  {
    slug: 'installation',
    title: 'Installation',
    description:
      'How to install Tiptide and its peer dependencies in your React project.',
    content: `Tiptide is designed to be installed alongside React 19 and its peer dependencies. Run the following command using your preferred package manager to get started:

### Step 1: Install Package

\`\`\`bash
pnpm add tiptide @tiptap/react @tiptap/core @tiptap/pm
\`\`\`

### Step 2: Configure Tailwind CSS

Tiptide uses Tailwind CSS for its styling system. If you are using Tailwind v4, ensure your globals file has the appropriate setup. Tiptide's stylesheet will seamlessly integrate with your existing neutral/zinc base theme variables.

### Step 3: TypeScript Declaration (Optional)

If your TypeScript compiler complains about importing CSS side-effects like \`import 'tiptide/styles';\`, you can create a declaration file in your project (e.g., \`src/types/tiptide.d.ts\`):

\`\`\`typescript
declare module 'tiptide/styles';
\`\`\``,
    codeExample: `// Typical structure of your layout or app entry
import React from 'react';
import { TiptideEditor } from 'tiptide';
import 'tiptide/styles'; // Import Tiptide base CSS

export function App() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <TiptideEditor
        placeholder="Type here..."
        onChange={(editor) => console.log(editor.getJSON())}
      />
    </div>
  );
}`,
    codeLanguage: 'tsx',
  },
  {
    slug: 'compound-components',
    title: 'Compound Components',
    description:
      'Break down Tiptide into individual subcomponents for absolute layout flexibility.',
    content: `The power of Tiptide lies in its **Compound Component API**. Instead of using \`<TiptideEditor />\`, which renders a preconfigured layout, you can compose your own editor from scratch.

This allows you to create unique layout hierarchies—such as putting the toolbar below the textarea, adding sidebars, wrapping components in custom divs, or injecting additional UI elements.

### Available Subcomponents

*   **\`<TiptideProvider>\`:** Context provider that initializes the Tiptap editor engine and feeds state to all other components. It accepts standard editor props.
*   **\`<TiptideTextarea>\`:** The actual editable text-area canvas. Optimized to prevent unnecessary typing lag and re-renders.
*   **\`<Toolbar>\`:** The toolbar container. By default, rendering \`<Toolbar />\` without children loads a preconfigured toolset. Alternatively, you can pass custom children.
*   **\`<BubbleMenu>\`:** Contextual floating menu that appears when a user highlights text. Contains text formatting utilities.
*   **\`<ImageBubbleMenu>\`:** Contextual floating menu that appears when a user clicks on an image. Contains image alignment and removal controls.`,
    codeExample: `import { 
  TiptideProvider, 
  TiptideTextarea, 
  Toolbar, 
  BubbleMenu 
} from 'tiptide';

export function CustomEditor() {
  return (
    <TiptideProvider content="<p>Custom arrangement!</p>">
      <div className="flex flex-col border border-neutral-200 rounded-lg overflow-hidden">
        
        {/* We place the editor editing canvas first */}
        <div className="p-4 min-h-[200px]">
          <TiptideTextarea />
        </div>

        {/* And we put the toolbar at the bottom of the editor! */}
        <Toolbar className="border-t border-b-0 bg-neutral-50" />

        {/* Floating Bubble Menu */}
        <BubbleMenu />
      </div>
    </TiptideProvider>
  );
}`,
    codeLanguage: 'tsx',
  },
  {
    slug: 'editor-tools',
    title: 'Editor Tools API',
    description:
      'Select, customize, and arrange individual tools inside your toolbar.',
    content: `Tiptide registers a large collection of individual tools on the \`Toolbar\` namespace. When composing a custom toolbar, you can render only the tools you need, group them with dividers, or create highly bespoke layouts.

### All Available Tools

| Tool | Namespace / Code | Description |
| :--- | :--- | :--- |
| **Undo / Redo** | \`<Toolbar.undo />\`, \`<Toolbar.redo />\` | History tracking |
| **Basic Formats** | \`<Toolbar.bold />\`, \`<Toolbar.italic />\`, \`<Toolbar.underline />\`, \`<Toolbar.strike />\`, \`<Toolbar.code />\` | Inline styles |
| **Lists** | \`<Toolbar.lists />\` | Bullet and ordered dropdown selection |
| **Text Blocks** | \`<Toolbar.textBlocks />\` | Paragraph, Heading 1, Heading 2, Heading 3 selection |
| **Block Quotes** | \`<Toolbar.blockquote />\` | Blockquotes styling |
| **Code Blocks** | \`<Toolbar.codeblock />\` | Monospace syntax highlight blocks |
| **Color Selector** | \`<Toolbar.colorSelector />\` | Color palette for selected text |
| **Links** | \`<Toolbar.link />\` | Inline hyperlinking utility |
| **Alignment** | \`<Toolbar.alignLeft />\`, \`<Toolbar.alignCenter />\`, \`<Toolbar.alignRight />\`, \`<Toolbar.alignJustify />\` | Text paragraph alignment |
| **Scripts** | \`<Toolbar.superscript />\`, \`<Toolbar.subscript />\` | Math or baseline formatting |
| **Image** | \`<Toolbar.image />\` | Local/web image inserting tool |
| **Rules** | \`<Toolbar.horizontalRule />\` | Thick block paragraph divider |
| **Dividers** | \`<Toolbar.separator />\` | Small vertical dividing line |`,
    codeExample: `import { TiptideProvider, TiptideTextarea, Toolbar } from 'tiptide';

export function CommentEditor() {
  return (
    <TiptideProvider content="">
      <div className="border border-neutral-200 rounded-lg">
        {/* Simple compact toolbar for comments: bold, italic, link only! */}
        <Toolbar className="bg-neutral-50 py-1 px-2 border-b">
          <Toolbar.bold />
          <Toolbar.italic />
          <Toolbar.link />
          <Toolbar.separator />
          <Toolbar.undo />
          <Toolbar.redo />
        </Toolbar>
        
        <div className="p-3 min-h-[100px] text-sm">
          <TiptideTextarea />
        </div>
      </div>
    </TiptideProvider>
  );
}`,
    codeLanguage: 'tsx',
  },
  {
    slug: 'viewer',
    title: 'Content Viewer',
    description:
      'Render the rich content safely in read-only mode with identical styles.',
    content: `To display the content created in your Tiptide editors elsewhere in your application, you should use the \`<Viewer />\` component. 

Relying on standard \`dangerouslySetInnerHTML\` without Tiptide's predefined styles will result in unstyled headings, lists, blockquotes, and tables. The \`<Viewer />\` component automatically bundles Tiptide's custom styling engine and renders content safely and accurately.

### Features

*   **Universal Parser:** Accepts either an HTML string or a parsed Tiptap JSON content object.
*   **Exact Style Matching:** Uses the identical Tailwind CSS classes (\`tiptide-preview\` and prose typography extensions) that the interactive editor uses.
*   **Highly Responsive:** Out-of-the-box support for responsive container scrolling, wide code-blocks, and scaled images.`,
    codeExample: `import { Viewer, type TiptideJSONContentType } from 'tiptide';

// Let's assume we fetch JSON or HTML content from a database
interface PostProps {
  title: string;
  content: string | TiptideJSONContentType;
}

export function Post({ title, content }: PostProps) {
  return (
    <article className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      
      {/* Renders content beautifully with identical typography */}
      <Viewer 
        content={content} 
        className="text-neutral-800 leading-relaxed"
        containerClassName="border border-neutral-100 rounded-lg p-6 bg-white"
      />
    </article>
  );
}`,
    codeLanguage: 'tsx',
  },
  {
    slug: 'api-reference',
    title: 'API Reference & Types',
    description:
      'Complete typescript props, types, and configurations available in Tiptide.',
    content: `Tiptide is designed to be highly typed and fully compatible with React. Below are the key types, properties, and configurations.

### \`TextEditorProps\` (Props for \`<TiptideEditor />\` & \`<TiptideProvider />\`)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **\`content\`** | \`TiptideContentType\` | \`null\` | Initial editor content (HTML string or JSONContent). |
| **\`onChange\`** | \`(editor: Editor) => void\` | \`undefined\` | Triggered on every keystroke/editor change. |
| **\`placeholder\`** | \`string\` | \`"Start writing..."\` | Text shown when the editor canvas is empty. |
| **\`hideBubbleMenuOnTouch\`** | \`boolean\` | \`true\` | Hides the floating bubble menu on mobile touch pointer devices. |
| **\`hideTooltip\`** | \`boolean\` | \`false\` | Disable toolbar tooltips entirely. |
| **\`onUpload\`** | \`(file: File) => Promise<string>\` | \`undefined\` | Async function returning URL to upload images locally or to CDN. |
| **\`imagePlaceholderBlock\`** | \`React.ComponentType\` | \`undefined\` | Custom loader template when rendering dynamic image uploading state. |
| **\`onMount\`** | \`(editor: Editor) => void\` | \`undefined\` | Fired when the underlying Tiptap editor mounts. |

### Exported Types

*   **\`TiptideContentType\`:** \`string | JSONContent | null\`
*   **\`TiptideEditorType\`:** Direct alias of Tiptap's core \`Editor\` class.
*   **\`TiptideJSONContentType\`:** Direct alias of Tiptap's \`JSONContent\` type structure.`,
    codeExample: `import { 
  type TiptideEditorType, 
  type TiptideContentType 
} from 'tiptide';

// Example defining types in custom hooks or utility helpers
export function getWordCount(editor: TiptideEditorType): number {
  return editor.storage.characterCount?.words() || 0;
}`,
    codeLanguage: 'tsx',
  },
];

export function getSectionBySlug(slug: string): DocSection | undefined {
  return docSections.find((section) => section.slug === slug);
}
