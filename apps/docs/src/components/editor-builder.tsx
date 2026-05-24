'use client';

import { useState } from 'react';
import {
  TiptideProvider,
  TiptideTextarea,
  Toolbar,
  Tools,
  BubbleMenu,
  ImageBubbleMenu,
} from 'tiptide';
import 'tiptide/styles';
import {
  Check,
  Copy,
  Settings2,
  Undo,
  Redo,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Heading,
  List,
  Quote,
  Palette,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image as ImageIcon,
  Code2,
  Minus,
  AlignJustify,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/code-block';
import { Checkbox } from '@/components/ui/checkbox';

const ALL_TOOLS = [
  { id: 'undo', label: 'Undo', icon: Undo },
  { id: 'redo', label: 'Redo', icon: Redo },
  { id: 'bold', label: 'Bold', icon: Bold },
  { id: 'italic', label: 'Italic', icon: Italic },
  { id: 'underline', label: 'Underline', icon: Underline },
  { id: 'strike', label: 'Strike', icon: Strikethrough },
  { id: 'code', label: 'Code', icon: Code },
  { id: 'textBlocks', label: 'Headings / Paragraphs', icon: Heading },
  { id: 'lists', label: 'Lists', icon: List },
  { id: 'blockquote', label: 'Blockquote', icon: Quote },
  { id: 'colorSelector', label: 'Colors', icon: Palette },
  { id: 'link', label: 'Link', icon: LinkIcon },
  { id: 'alignLeft', label: 'Align Left', icon: AlignLeft },
  { id: 'alignCenter', label: 'Align Center', icon: AlignCenter },
  { id: 'alignRight', label: 'Align Right', icon: AlignRight },
  { id: 'alignJustify', label: 'Align Justify', icon: AlignJustify },
  { id: 'image', label: 'Image', icon: ImageIcon },
  { id: 'codeblock', label: 'Code Block', icon: Code2 },
  { id: 'horizontalRule', label: 'Horizontal Rule', icon: Minus },
] as const;

type ToolId = (typeof ALL_TOOLS)[number]['id'] | 'separator';

interface ConfigState {
  includeToolbar: boolean;
  toolbarPosition: 'top' | 'bottom';
  includeBubbleMenu: boolean;
  includeImageBubbleMenu: boolean;
  activeTools: ToolId[];
}

const DEFAULT_TOOLS: ToolId[] = [
  'undo',
  'redo',
  'bold',
  'italic',
  'underline',
  'lists',
  'textBlocks',
  'link',
  'image',
];

export function EditorBuilder() {
  const [history, setHistory] = useState<ConfigState[]>([
    {
      includeToolbar: true,
      toolbarPosition: 'top',
      includeBubbleMenu: true,
      includeImageBubbleMenu: true,
      activeTools: [...DEFAULT_TOOLS],
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentConfig = history[historyIndex];

  const updateConfig = (newConfig: Partial<ConfigState>) => {
    const merged = { ...currentConfig, ...newConfig };
    const updatedHistory = [...history.slice(0, historyIndex + 1), merged];
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
    }
  };

  const toggleTool = (toolId: ToolId) => {
    const active = currentConfig.activeTools;
    const updated = active.includes(toolId)
      ? active.filter((t) => t !== toolId)
      : [...active, toolId];
    updateConfig({ activeTools: updated });
  };

  const removeToolAtIndex = (indexToRemove: number) => {
    const updated = currentConfig.activeTools.filter(
      (_, i) => i !== indexToRemove,
    );
    updateConfig({ activeTools: updated });
  };

  const addSeparator = () => {
    updateConfig({ activeTools: [...currentConfig.activeTools, 'separator'] });
  };

  const clearAllTools = () => {
    updateConfig({ activeTools: [] });
  };

  const resetToDefaultTools = () => {
    updateConfig({ activeTools: [...DEFAULT_TOOLS] });
  };

  const generatedCode = `import { useState } from 'react';
import { 
  TiptideProvider,
  type TiptideContentType,
  TiptideTextarea,
${currentConfig.includeToolbar ? '  Toolbar,\n  Tools,\n' : ''}${currentConfig.includeBubbleMenu ? '  BubbleMenu,\n' : ''}${currentConfig.includeImageBubbleMenu ? '  ImageBubbleMenu,\n' : ''}} from 'tiptide';
import 'tiptide/styles';

export function CustomTiptideEditor() {
  const [content, setContent] = useState<TiptideContentType>();

  return (
    <TiptideProvider content={content} onChange={(editor) => setContent(editor.getJSON())}>
      <div className="flex flex-col border border-neutral-200 rounded-lg overflow-hidden dark:border-neutral-800">
${
  currentConfig.includeToolbar && currentConfig.toolbarPosition === 'top'
    ? `        <Toolbar className="border-b border-neutral-200 bg-neutral-50 px-2 py-1 dark:border-neutral-800 dark:bg-neutral-900">
${currentConfig.activeTools.map((t) => `          <Tools.${t} />`).join('\n')}
        </Toolbar>\n`
    : ''
}        <div className="min-h-[300px] bg-white dark:bg-neutral-950 text-sm">
          <TiptideTextarea />
        </div>
${
  currentConfig.includeToolbar && currentConfig.toolbarPosition === 'bottom'
    ? `\n        <Toolbar className="border-t border-neutral-200 bg-neutral-50 px-2 py-1 dark:border-neutral-800 dark:bg-neutral-900">
${currentConfig.activeTools.map((t) => `          <Tools.${t} />`).join('\n')}
        </Toolbar>\n`
    : ''
}${currentConfig.includeBubbleMenu ? '        <BubbleMenu />\n' : ''}${currentConfig.includeImageBubbleMenu ? '        <ImageBubbleMenu />\n' : ''}      </div>
    </TiptideProvider>
  );
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      {/* Controls Sidebar */}
      <aside className="w-full shrink-0 border-r border-neutral-200 bg-neutral-50/50 p-6 lg:w-80 dark:border-neutral-800 dark:bg-neutral-900/20">
        <div className="sticky top-[75px]">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold text-neutral-900 dark:text-neutral-100">
              <Settings2 className="h-5 w-5" />
              Configuration
            </div>
            {/* Building History Undo/Redo */}
            <div className="flex items-center gap-1" title="Building History">
              <Button
                variant="outline"
                size="icon"
                onClick={handleUndo}
                disabled={historyIndex === 0}
                className="h-7 w-7 rounded-md border-neutral-200 dark:border-neutral-800"
                title="Undo config change"
              >
                <Undo className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleRedo}
                disabled={historyIndex === history.length - 1}
                className="h-7 w-7 rounded-md border-neutral-200 dark:border-neutral-800"
                title="Redo config change"
              >
                <Redo className="h-3.5 w-3.5" />
              </Button>
              <span className="ml-1 font-mono text-[10px] text-neutral-400 dark:text-neutral-500">
                {historyIndex + 1}/{history.length}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {/* Main Components */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                Core Components
              </h3>

              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  Toolbar
                </span>
                <Checkbox
                  checked={currentConfig.includeToolbar}
                  onCheckedChange={(checked) =>
                    updateConfig({ includeToolbar: !!checked })
                  }
                />
              </div>

              {currentConfig.includeToolbar && (
                <div className="space-y-2 border-l-2 border-neutral-200 pl-4 dark:border-neutral-800">
                  <span className="text-xs font-medium tracking-wider text-neutral-500 uppercase">
                    Position
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateConfig({ toolbarPosition: 'top' })}
                      className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${currentConfig.toolbarPosition === 'top' ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900' : 'bg-neutral-200/50 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400'}`}
                    >
                      Top
                    </button>
                    <button
                      onClick={() =>
                        updateConfig({ toolbarPosition: 'bottom' })
                      }
                      className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${currentConfig.toolbarPosition === 'bottom' ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900' : 'bg-neutral-200/50 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400'}`}
                    >
                      Bottom
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  Text Bubble Menu
                </span>
                <Checkbox
                  checked={currentConfig.includeBubbleMenu}
                  onCheckedChange={(checked) =>
                    updateConfig({ includeBubbleMenu: !!checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  Image Bubble Menu
                </span>
                <Checkbox
                  checked={currentConfig.includeImageBubbleMenu}
                  onCheckedChange={(checked) =>
                    updateConfig({ includeImageBubbleMenu: !!checked })
                  }
                />
              </div>
            </div>

            <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

            {/* Tools Selection */}
            {currentConfig.includeToolbar && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    Toolbar Tools
                  </h3>
                  <span className="text-xs text-neutral-500">
                    {
                      currentConfig.activeTools.filter((t) => t !== 'separator')
                        .length
                    }{' '}
                    selected
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_TOOLS.map((tool) => {
                    const Icon = tool.icon;
                    const isActive = currentConfig.activeTools.includes(
                      tool.id,
                    );
                    return (
                      <button
                        key={tool.id}
                        onClick={() => toggleTool(tool.id)}
                        title={tool.label}
                        className={`flex h-8 w-8 items-center justify-center rounded-md border transition-colors ${
                          isActive
                            ? 'border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900'
                            : 'border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-900'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </button>
                    );
                  })}
                </div>

                {/* Separators and Reset Controls */}
                <div className="flex flex-col gap-2 border-t border-neutral-200 pt-3 dark:border-neutral-800">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={addSeparator}
                    >
                      <Minus className="mr-1 h-3.5 w-3.5" />
                      Add Separator
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-xs hover:bg-neutral-100 dark:hover:bg-neutral-900"
                      onClick={resetToDefaultTools}
                    >
                      <RotateCcw className="mr-1 h-3.5 w-3.5" />
                      Defaults
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-xs text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20"
                      onClick={clearAllTools}
                    >
                      <Trash2 className="mr-1 h-3.5 w-3.5" />
                      Clear All
                    </Button>
                  </div>
                </div>

                {/* Current Toolbar Layout Organizer */}
                {currentConfig.activeTools.length > 0 && (
                  <div className="mt-4 space-y-2 border-t border-neutral-200 pt-3 dark:border-neutral-800">
                    <span className="block text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                      Current Toolbar Layout
                    </span>
                    <div className="flex max-h-48 flex-wrap gap-1 overflow-y-auto rounded-lg bg-neutral-100/50 p-2 dark:bg-neutral-900/50">
                      {currentConfig.activeTools.map((toolId, index) => {
                        const isSep = toolId === 'separator';
                        const ToolIcon = isSep
                          ? Minus
                          : ALL_TOOLS.find((t) => t.id === toolId)?.icon ||
                            Settings2;
                        const label = isSep
                          ? 'Separator'
                          : ALL_TOOLS.find((t) => t.id === toolId)?.label ||
                            toolId;
                        return (
                          <div
                            key={`${toolId}-${index}`}
                            className="flex items-center gap-1.5 rounded border border-neutral-200 bg-white px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300"
                          >
                            <ToolIcon className="h-3 w-3 shrink-0" />
                            <span className="max-w-[70px] truncate">
                              {label}
                            </span>
                            <button
                              onClick={() => removeToolAtIndex(index)}
                              className="ml-0.5 text-sm leading-none font-bold text-neutral-400 hover:text-red-500 dark:hover:text-red-400"
                              title={`Remove ${label}`}
                            >
                              ×
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Preview Area */}
      <div className="flex min-w-0 flex-1 flex-col bg-neutral-50/30 dark:bg-neutral-950/30">
        {/* Live Preview */}
        <div className="border-b border-neutral-200 p-6 md:p-10 dark:border-neutral-800">
          <h2 className="mb-4 text-sm font-semibold tracking-wider text-neutral-500 uppercase">
            Live Preview
          </h2>
          <div className="mx-auto w-full max-w-4xl">
            <TiptideProvider content="<p>Try out your custom editor setup here...</p>">
              <div className="flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-950">
                {currentConfig.includeToolbar &&
                  currentConfig.toolbarPosition === 'top' && (
                    <Toolbar className="border-b border-neutral-200 bg-neutral-50/80 px-2 py-1.5 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/50">
                      {currentConfig.activeTools.map((toolId, index) => {
                        const ToolComponent = Tools[toolId];
                        return <ToolComponent key={`${toolId}-${index}`} />;
                      })}
                    </Toolbar>
                  )}

                <div className="min-h-[250px] text-[15px]">
                  <TiptideTextarea />
                </div>

                {currentConfig.includeToolbar &&
                  currentConfig.toolbarPosition === 'bottom' && (
                    <Toolbar className="border-t border-neutral-200 bg-neutral-50/80 px-2 py-1.5 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/50">
                      {currentConfig.activeTools.map((toolId, index) => {
                        const ToolComponent = Tools[toolId];
                        return <ToolComponent key={`${toolId}-${index}`} />;
                      })}
                    </Toolbar>
                  )}

                {currentConfig.includeBubbleMenu && <BubbleMenu />}
                {currentConfig.includeImageBubbleMenu && <ImageBubbleMenu />}
              </div>
            </TiptideProvider>
          </div>
        </div>

        {/* Code Output */}
        <div className="flex-1 bg-white p-6 md:p-10 dark:bg-neutral-950">
          <div className="mx-auto mb-4 flex max-w-4xl items-center justify-between">
            <h2 className="text-sm font-semibold tracking-wider text-neutral-500 uppercase">
              Generated Code
            </h2>
            <Button
              size="sm"
              variant="outline"
              onClick={copyToClipboard}
              className="h-8 gap-1.5"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-green-600" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {copied ? 'Copied' : 'Copy Code'}
            </Button>
          </div>
          <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <CodeBlock code={generatedCode} language="tsx" />
          </div>
        </div>
      </div>
    </div>
  );
}
