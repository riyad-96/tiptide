import type { Editor } from '@tiptap/core';

import type { ComponentType } from 'react';

export type CustomPlaceholderProps = {
  editor: Editor;
  getPos: () => number;
  deleteNode: () => void;
};

export type EditorContext = {
  editor: Editor;
  isBubbleMenuHidden: boolean;
  hideTooltip: boolean;
  onUpload?: (file: File) => Promise<string> | string;
  imagePlaceholderBlock?: ComponentType<CustomPlaceholderProps>;
};
