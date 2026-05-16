import type { Editor } from '@tiptap/core';

export type EditorContext = {
  editor: Editor;
  isBubbleMenuHidden: boolean;
  hideTooltip: boolean;
};
