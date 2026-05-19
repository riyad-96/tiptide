'use client';

import React, { useState } from 'react';
import {
  TiptideProvider,
  TiptideTextarea,
  Toolbar,
  BubbleMenu,
  Viewer,
  type TiptideContentType,
} from 'tiptide';
import 'tiptide/styles';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PreviewsPage() {
  const [commentContent, setCommentContent] = useState<TiptideContentType>(
    '<p>This is a lightweight comment editor...</p>',
  );
  const [docContent, setDocContent] = useState<TiptideContentType>(
    '<h2>Compound Editor</h2><p>This demonstrates the full toolbar and bubble menus in action. Highlight text to see the floating context menu.</p>',
  );

  return (
    <div className="mx-auto w-full max-w-300 px-6 py-12">
      <div className="mb-12">
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-neutral-900">
          Advanced Previews
        </h1>
        <p className="max-w-3xl text-lg text-neutral-600">
          Explore different editor compositions built entirely using
          Tiptide&apos;s compound component API and standard Tailwind UI.
        </p>
      </div>

      <Tabs defaultValue="document" className="w-full">
        <TabsList className="mb-8 bg-neutral-100/50 p-1">
          <TabsTrigger value="document">Full Document</TabsTrigger>
          <TabsTrigger value="comment">Minimal Comment</TabsTrigger>
          <TabsTrigger value="split">Live Viewer Split</TabsTrigger>
        </TabsList>

        {/* Full Document Editor */}
        <TabsContent value="document" className="focus-visible:outline-none">
          <Card className="overflow-hidden rounded-lg border-neutral-200 shadow-none">
            <CardHeader className="border-b border-neutral-100 bg-neutral-50/50 pb-4">
              <CardTitle className="text-lg font-bold">
                Document Editor
              </CardTitle>
              <CardDescription>
                A fully-featured editor utilizing the default toolbar and bubble
                menu.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <TiptideProvider
                content={docContent}
                onChange={(editor) => setDocContent(editor.getJSON())}
              >
                <div className="flex w-full flex-col bg-white">
                  {/* Default Toolbar (contains all tools) */}
                  <Toolbar className="flex-wrap border-b border-neutral-200 bg-neutral-50/30 px-2 py-1" />

                  <div className="min-h-[400px] p-8">
                    <TiptideTextarea />
                  </div>

                  <BubbleMenu />
                </div>
              </TiptideProvider>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Minimal Comment Editor */}
        <TabsContent value="comment" className="focus-visible:outline-none">
          <Card className="max-w-2xl overflow-hidden rounded-lg border-neutral-200 shadow-none">
            <CardHeader className="border-b border-neutral-100 bg-neutral-50/50 pb-4">
              <CardTitle className="text-lg font-bold">Comment Box</CardTitle>
              <CardDescription>
                A lightweight editor composed with specific tools suitable for
                discussions.
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-neutral-50 p-4">
              <TiptideProvider
                content={commentContent}
                onChange={(editor) => setCommentContent(editor.getJSON())}
              >
                <div className="flex flex-col overflow-hidden rounded-md border border-neutral-200 bg-white transition-all focus-within:border-neutral-900 focus-within:ring-1 focus-within:ring-neutral-900">
                  {/* The editor textarea goes first! */}
                  <div className="min-h-[100px] p-3 text-sm">
                    <TiptideTextarea />
                  </div>

                  {/* Custom composed toolbar at the bottom */}
                  <Toolbar className="justify-between border-t border-neutral-100 bg-white px-2 py-1.5">
                    <div className="flex items-center gap-1">
                      <Toolbar.bold />
                      <Toolbar.italic />
                      <Toolbar.link />
                      <Toolbar.code />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" className="h-7 px-3 text-xs">
                        Comment
                      </Button>
                    </div>
                  </Toolbar>
                </div>
              </TiptideProvider>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Live Viewer Split */}
        <TabsContent value="split" className="focus-visible:outline-none">
          <Card className="overflow-hidden rounded-lg border-neutral-200 shadow-none">
            <CardHeader className="border-b border-neutral-100 bg-neutral-50/50 pb-4">
              <CardTitle className="text-lg font-bold">Split Viewer</CardTitle>
              <CardDescription>
                Live real-time rendering using the isolated Viewer component.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex min-h-[500px] flex-col p-0 lg:flex-row">
              <div className="flex w-full flex-col border-r border-neutral-200 bg-white lg:w-1/2">
                <TiptideProvider
                  content={docContent}
                  onChange={(editor) => setDocContent(editor.getJSON())}
                >
                  <Toolbar className="border-b border-neutral-100 bg-neutral-50 px-2 py-1" />

                  <TiptideTextarea />

                  <BubbleMenu />
                </TiptideProvider>
              </div>

              <div className="w-full overflow-y-auto border-t border-neutral-200 bg-[#fafafa] p-6 lg:w-1/2 lg:border-t-0">
                <p className="mb-4 font-mono text-xs font-medium tracking-wider text-neutral-400 uppercase">
                  Live Viewer Render
                </p>
                <div className="rounded border border-neutral-200 bg-white p-6 shadow-sm">
                  <Viewer content={docContent} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
