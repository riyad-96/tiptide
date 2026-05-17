import type { Content, Editor } from '@tiptap/core';
import type { ComponentType } from 'react';
import type { CustomPlaceholderProps } from './editor-context';

export type TextEditorProps = {
  hideBubbleMenuOnTouch?: boolean;
  content?: Content;
  onChange?: (editor: Editor) => void;
  onMount?: (editor: Editor) => void;
  placeholder?: string | boolean;
  hideTooltip?: boolean;
  onUpload?: (file: File) => Promise<string> | string;
  imagePlaceholderBlock?: ComponentType<CustomPlaceholderProps>;
};
