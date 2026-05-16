import { Extension } from '@tiptap/core';
import type { Editor, Range } from '@tiptap/core';
import Suggestion from '@tiptap/suggestion';

import { suggestion } from '../components/extension/slash-command/suggestions';
import type { SuggestionItem } from '../types/slash-command';

export const SlashCommand = Extension.create({
  name: 'slashCommand',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({
          editor,
          range,
          props,
        }: {
          editor: Editor;
          range: Range;
          props: SuggestionItem;
        }) => {
          props.command({ editor, range });
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        decorationClass: 'tiptide-suggestion',
        ...this.options.suggestion,
        ...suggestion,
      }),
    ];
  },
});
