'use client';

import React, { useState } from 'react';
import {
  TiptideProvider,
  TiptideTextarea,
  Toolbar,
  BubbleMenu,
  Viewer,
  type TiptideContentType,
  TiptideEditor,
} from 'tiptide';
import 'tiptide/styles';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileText, MessageSquare, Columns2 } from 'lucide-react';
import { ResizablePanelWindow } from '@/components/snippets/resizable-panel';

export default function PreviewsPage() {
  const [commentContent, setCommentContent] = useState<TiptideContentType>(
    '<p>This is a lightweight comment editor...</p>',
  );
  const [docContent, setDocContent] = useState<TiptideContentType>(
    '<h2>Compound Editor</h2><p>This demonstrates the full toolbar and bubble menus in action. Highlight text to see the floating context menu.</p>',
  );

  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 py-12 lg:py-20">
      <div className="mb-16 text-center sm:text-left">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl dark:text-neutral-100">
          Advanced Previews
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-neutral-600 sm:mx-0 dark:text-neutral-400">
          Explore different editor compositions built entirely using
          Tiptide&apos;s compound component API and standard Tailwind UI.
        </p>
      </div>

      <Tabs defaultValue="document" className="w-full">
        <TabsList className="mb-8 grid h-auto w-full grid-cols-1 gap-2 bg-transparent p-0 sm:flex sm:flex-wrap">
          <TabsTrigger
            value="document"
            className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-6 py-2.5 text-sm font-medium data-[state=active]:border-neutral-900 data-[state=active]:bg-neutral-900 data-[state=active]:text-white dark:border-neutral-800 dark:bg-neutral-950 dark:data-[state=active]:border-neutral-100 dark:data-[state=active]:bg-neutral-100 dark:data-[state=active]:text-neutral-900"
          >
            <FileText className="h-4 w-4" />
            Full Document
          </TabsTrigger>
          <TabsTrigger
            value="comment"
            className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-6 py-2.5 text-sm font-medium data-[state=active]:border-neutral-900 data-[state=active]:bg-neutral-900 data-[state=active]:text-white dark:border-neutral-800 dark:bg-neutral-950 dark:data-[state=active]:border-neutral-100 dark:data-[state=active]:bg-neutral-100 dark:data-[state=active]:text-neutral-900"
          >
            <MessageSquare className="h-4 w-4" />
            Minimal Comment
          </TabsTrigger>
          <TabsTrigger
            value="split"
            className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-6 py-2.5 text-sm font-medium data-[state=active]:border-neutral-900 data-[state=active]:bg-neutral-900 data-[state=active]:text-white dark:border-neutral-800 dark:bg-neutral-950 dark:data-[state=active]:border-neutral-100 dark:data-[state=active]:bg-neutral-100 dark:data-[state=active]:text-neutral-900"
          >
            <Columns2 className="h-4 w-4" />
            Live Viewer Split
          </TabsTrigger>
        </TabsList>

        {/* Full Document Editor */}
        <TabsContent value="document" className="focus-visible:outline-none">
          <div className="group relative rounded-[2rem] bg-neutral-200/50 p-2 sm:p-4 dark:bg-neutral-800/50">
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200 transition-shadow hover:shadow-md dark:bg-neutral-950 dark:ring-neutral-800">
              <div className="border-b border-neutral-100 bg-neutral-50/80 px-6 py-4 dark:border-neutral-800/50 dark:bg-neutral-900/50">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  Document Editor
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  A fully-featured editor utilizing the default toolbar and
                  bubble menu.
                </p>
              </div>
              <TiptideProvider
                content={docContent}
                onChange={(editor) => setDocContent(editor.getJSON())}
              >
                <div className="flex w-full flex-col bg-white dark:bg-neutral-950">
                  <Toolbar className="flex-wrap border-b border-neutral-200 bg-neutral-50/50 px-3 py-2 dark:border-neutral-800 dark:bg-neutral-900/50" />

                  <div className="min-h-[500px]">
                    <TiptideTextarea />
                  </div>

                  <BubbleMenu />
                </div>
              </TiptideProvider>
            </div>
          </div>
        </TabsContent>

        {/* Minimal Comment Editor */}
        <TabsContent value="comment" className="focus-visible:outline-none">
          <div className="mx-auto max-w-3xl">
            <div className="group relative rounded-[2rem] bg-neutral-200/50 p-2 sm:p-4 dark:bg-neutral-800/50">
              <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200 transition-shadow hover:shadow-md dark:bg-neutral-950 dark:ring-neutral-800">
                <div className="border-b border-neutral-100 bg-neutral-50/80 px-6 py-4 dark:border-neutral-800/50 dark:bg-neutral-900/50">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    Comment Box
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    A lightweight editor composed with specific tools suitable
                    for discussions.
                  </p>
                </div>

                <div className="bg-neutral-50 p-6 dark:bg-neutral-950/50">
                  <TiptideProvider
                    content={commentContent}
                    onChange={(editor) => setCommentContent(editor.getJSON())}
                  >
                    <div className="flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all dark:border-neutral-800 dark:bg-neutral-900">
                      <div className="min-h-[120px] text-[15px]">
                        <TiptideTextarea />
                      </div>

                      <Toolbar className="justify-between border-t border-neutral-100 bg-neutral-50/50 px-3 py-2 dark:border-neutral-800/50 dark:bg-neutral-900/50">
                        <div className="flex items-center gap-1">
                          <Toolbar.bold />
                          <Toolbar.italic />
                          <Toolbar.link />
                          <Toolbar.code />
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            className="h-8 rounded-full px-5 font-semibold shadow-sm"
                          >
                            Comment
                          </Button>
                        </div>
                      </Toolbar>
                    </div>
                  </TiptideProvider>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Live Viewer Split */}
        <TabsContent value="split" className="focus-visible:outline-none">
          <div className="group relative rounded-[2rem] bg-neutral-200/50 p-2 sm:p-4 dark:bg-neutral-800/50">
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200 transition-shadow hover:shadow-md dark:bg-neutral-950 dark:ring-neutral-800">
              <div className="border-b border-neutral-100 bg-neutral-50/80 px-6 py-4 dark:border-neutral-800/50 dark:bg-neutral-900/50">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  Split Viewer
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Live real-time rendering using the isolated Viewer component.
                </p>
              </div>

              <div className="flex h-[600px]">
                {/* Editor Side */}

                <ResizablePanelWindow
                  firstNode={
                    <TiptideEditor
                      content={docContent}
                      onChange={(editor) => {
                        setDocContent(editor.getJSON());
                      }}
                    />
                  }
                  secondNode={
                    <div>
                      <p className="px-4 h-[50px] flex items-center text-neutral-600 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800/50">Live Render Output</p>

                      <Viewer content={docContent} />
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
