import { memo } from 'react';
import { Separator } from '../ui/separator';
import { ToolsAlignCenter } from './tools-align-center';
import { ToolsAlignJustify } from './tools-align-justify';
import { ToolsAlignLeft } from './tools-align-left';
import { ToolsAlignRight } from './tools-align-right';
import { ToolsBlockquote } from './tools-blockquote';
import { ToolsBold } from './tools-bold';
import { ToolsCode } from './tools-code';
import { ToolsCodeblock } from './tools-codeblock';
import { ToolsColorSelector } from './tools-color-selector';
import { ToolsHorizontalRule } from './tools-horizontal-rule';
import { ToolsImage } from './tools-image';
import { ToolsImageAlignCenter } from './tools-image-align-center';
import { ToolsImageAlignLeft } from './tools-image-align-left';
import { ToolsImageAlignRight } from './tools-image-align-right';
import { ToolsImageFullWidth } from './tools-image-full-width';
import { ToolsImageRemove } from './tools-image-remove';
import { ToolsItalic } from './tools-italic';
import { ToolsLink } from './tools-link';
import { ToolsLists } from './tools-lists';
import { ToolsRedo } from './tools-redo';
import { ToolsStrike } from './tools-strike';
import { ToolsSubscript } from './tools-subscript';
import { ToolsSuperscript } from './tools-superscript';
import { ToolsTextBlocks } from './tools-text-blocks';
import { ToolsUnderline } from './tools-underline';
import { ToolsUndo } from './tools-undo';

const ToolsComponent = memo(function Tools() {
  return null;
});

export const Tools = Object.assign(ToolsComponent, {
  alignCenter: ToolsAlignCenter,
  alignJustify: ToolsAlignJustify,
  alignLeft: ToolsAlignLeft,
  alignRight: ToolsAlignRight,
  blockquote: ToolsBlockquote,
  bold: ToolsBold,
  code: ToolsCode,
  codeblock: ToolsCodeblock,
  colorSelector: ToolsColorSelector,
  horizontalRule: ToolsHorizontalRule,
  image: ToolsImage,
  imageAlignCenter: ToolsImageAlignCenter,
  imageAlignLeft: ToolsImageAlignLeft,
  imageAlignRight: ToolsImageAlignRight,
  imageFullWidth: ToolsImageFullWidth,
  imageRemove: ToolsImageRemove,
  italic: ToolsItalic,
  link: ToolsLink,
  lists: ToolsLists,
  redo: ToolsRedo,
  strike: ToolsStrike,
  subscript: ToolsSubscript,
  superscript: ToolsSuperscript,
  textBlocks: ToolsTextBlocks,
  underline: ToolsUnderline,
  undo: ToolsUndo,
  separator: Separator,
});
