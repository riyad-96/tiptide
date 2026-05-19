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
import { 
  Check, Copy, Settings2,
  Undo, Redo, Bold, Italic, Underline, Strikethrough, Code, 
  Heading, List, Quote, Palette, Link as LinkIcon, 
  AlignLeft, AlignCenter, AlignRight, Image as ImageIcon, 
  Code2, Minus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/code-block';

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
  { id: 'image', label: 'Image', icon: ImageIcon },
  { id: 'codeblock', label: 'Code Block', icon: Code2 },
  { id: 'horizontalRule', label: 'Horizontal Rule', icon: Minus },
] as const;

type ToolId = typeof ALL_TOOLS[number]['id'] | 'separator';

export function EditorBuilder() {
  const [includeToolbar, setIncludeToolbar] = useState(true);
  const [toolbarPosition, setToolbarPosition] = useState<'top' | 'bottom'>('top');
  const [includeBubbleMenu, setIncludeBubbleMenu] = useState(true);
  const [includeImageBubbleMenu, setIncludeImageBubbleMenu] = useState(true);
  const [activeTools, setActiveTools] = useState<ToolId[]>([
    'undo', 'redo', 'bold', 'italic', 'underline', 'lists', 'textBlocks', 'link', 'image'
  ]);
  const [copied, setCopied] = useState(false);

  const toggleTool = (tool: ToolId) => {
    setActiveTools(prev => 
      prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]
    );
  };

  const generatedCode = `import { 
  TiptideProvider,
  TiptideContentType,
  TiptideTextarea,
${includeToolbar ? '  Toolbar,\n  Tools,\n' : ''}${includeBubbleMenu ? '  BubbleMenu,\n' : ''}${includeImageBubbleMenu ? '  ImageBubbleMenu,\n' : ''}} from 'tiptide';
import 'tiptide/styles';

export function CustomTiptideEditor() {
  const [content, setContent] = useState<TiptideContentType>();

  return (
    <TiptideProvider content={content} onChange={(editor) => setContent(editor.getJSON())}>
      <div className="flex flex-col border border-neutral-200 rounded-lg overflow-hidden dark:border-neutral-800">
${includeToolbar && toolbarPosition === 'top' ? `        <Toolbar className="border-b border-neutral-200 bg-neutral-50 px-2 py-1 dark:border-neutral-800 dark:bg-neutral-900">
${activeTools.map(t => `          <Tools.${t} />`).join('\n')}
        </Toolbar>
` : ''}
        <div className="min-h-[300px] p-4 bg-white dark:bg-neutral-950 text-sm">
          <TiptideTextarea />
        </div>
${includeToolbar && toolbarPosition === 'bottom' ? `
        <Toolbar className="border-t border-neutral-200 bg-neutral-50 px-2 py-1 dark:border-neutral-800 dark:bg-neutral-900">
${activeTools.map(t => `          <Tools.${t} />`).join('\n')}
        </Toolbar>
` : ''}
${includeBubbleMenu ? '        <BubbleMenu />\n' : ''}${includeImageBubbleMenu ? '        <ImageBubbleMenu />\n' : ''}      </div>
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
        <div className="flex items-center gap-2 mb-6 font-semibold text-neutral-900 dark:text-neutral-100">
          <Settings2 className="h-5 w-5" />
          Configuration
        </div>

        <div className="space-y-6">
          {/* Main Components */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Core Components</h3>
            
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-neutral-700 dark:text-neutral-300">Toolbar</span>
              <input 
                type="checkbox" 
                checked={includeToolbar} 
                onChange={(e) => setIncludeToolbar(e.target.checked)}
                className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 dark:border-neutral-700"
              />
            </label>

            {includeToolbar && (
              <div className="pl-4 space-y-2 border-l-2 border-neutral-200 dark:border-neutral-800">
                <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Position</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setToolbarPosition('top')}
                    className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${toolbarPosition === 'top' ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900' : 'bg-neutral-200/50 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400'}`}
                  >
                    Top
                  </button>
                  <button 
                    onClick={() => setToolbarPosition('bottom')}
                    className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${toolbarPosition === 'bottom' ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900' : 'bg-neutral-200/50 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400'}`}
                  >
                    Bottom
                  </button>
                </div>
              </div>
            )}

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-neutral-700 dark:text-neutral-300">Text Bubble Menu</span>
              <input 
                type="checkbox" 
                checked={includeBubbleMenu} 
                onChange={(e) => setIncludeBubbleMenu(e.target.checked)}
                className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 dark:border-neutral-700"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-neutral-700 dark:text-neutral-300">Image Bubble Menu</span>
              <input 
                type="checkbox" 
                checked={includeImageBubbleMenu} 
                onChange={(e) => setIncludeImageBubbleMenu(e.target.checked)}
                className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 dark:border-neutral-700"
              />
            </label>
          </div>

          <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

          {/* Tools Selection */}
          {includeToolbar && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Toolbar Tools</h3>
                <span className="text-xs text-neutral-500">{activeTools.length} selected</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {ALL_TOOLS.map((tool) => {
                  const Icon = tool.icon;
                  const isActive = activeTools.includes(tool.id);
                  return (
                    <button
                      key={tool.id}
                      onClick={() => toggleTool(tool.id)}
                      title={tool.label}
                      className={`flex h-8 w-8 items-center justify-center rounded-md border transition-colors ${
                        isActive 
                          ? 'bg-neutral-900 border-neutral-900 text-white dark:bg-neutral-100 dark:border-neutral-100 dark:text-neutral-900' 
                          : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-100 dark:bg-neutral-950 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-900'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1" 
                  onClick={() => setActiveTools(prev => [...prev, 'separator'])}
                >
                  Add Separator
                </Button>
                {activeTools.includes('separator') && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50" 
                    onClick={() => setActiveTools(prev => prev.filter(t => t !== 'separator'))}
                  >
                    Clear All
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Preview Area */}
      <div className="flex flex-1 flex-col min-w-0 bg-neutral-50/30 dark:bg-neutral-950/30">
        
        {/* Live Preview */}
        <div className="p-6 md:p-10 border-b border-neutral-200 dark:border-neutral-800">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-500">Live Preview</h2>
          <div className="w-full max-w-4xl mx-auto">
            <TiptideProvider content="<p>Try out your custom editor setup here...</p>">
              <div className="flex flex-col border border-neutral-200 rounded-xl overflow-hidden bg-white dark:border-neutral-800 dark:bg-neutral-950 shadow-sm transition-all duration-300">
                {includeToolbar && toolbarPosition === 'top' && (
                  <Toolbar className="border-b border-neutral-200 bg-neutral-50/80 px-2 py-1.5 dark:border-neutral-800 dark:bg-neutral-900/50 backdrop-blur-sm">
                    {activeTools.map((toolId, index) => {
                      const ToolComponent = Tools[toolId];
                      return <ToolComponent key={`${toolId}-${index}`} />;
                    })}
                  </Toolbar>
                )}

                <div className="min-h-[250px] p-5 text-[15px]">
                  <TiptideTextarea />
                </div>

                {includeToolbar && toolbarPosition === 'bottom' && (
                  <Toolbar className="border-t border-neutral-200 bg-neutral-50/80 px-2 py-1.5 dark:border-neutral-800 dark:bg-neutral-900/50 backdrop-blur-sm">
                    {activeTools.map((toolId, index) => {
                      const ToolComponent = Tools[toolId];
                      return <ToolComponent key={`${toolId}-${index}`} />;
                    })}
                  </Toolbar>
                )}

                {includeBubbleMenu && <BubbleMenu />}
                {includeImageBubbleMenu && <ImageBubbleMenu />}
              </div>
            </TiptideProvider>
          </div>
        </div>

        {/* Code Output */}
        <div className="p-6 md:p-10 flex-1 bg-white dark:bg-neutral-950">
          <div className="flex items-center justify-between mb-4 max-w-4xl mx-auto">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">Generated Code</h2>
            <Button size="sm" variant="outline" onClick={copyToClipboard} className="h-8 gap-1.5">
              {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy Code'}
            </Button>
          </div>
          <div className="w-full max-w-4xl mx-auto rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 overflow-hidden shadow-sm">
            <CodeBlock code={generatedCode} language="tsx" />
          </div>
        </div>

      </div>
    </div>
  );
}
