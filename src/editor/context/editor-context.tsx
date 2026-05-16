import { createContext } from 'react';

import type { EditorContext } from '../types/editor-context';

export const editorContext = createContext<EditorContext | null>(null);
