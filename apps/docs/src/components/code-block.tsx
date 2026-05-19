'use client';

import { useEffect, useState } from 'react';
import { createHighlighter, type Highlighter } from 'shiki';

let highlighterPromise: Promise<Highlighter> | null = null;

export function CodeBlock({ code, language = 'tsx' }: { code: string; language?: string }) {
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    
    async function highlight() {
      if (!highlighterPromise) {
        highlighterPromise = createHighlighter({
          themes: ['github-light', 'github-dark'],
          langs: ['typescript', 'tsx', 'javascript', 'bash', 'json', 'html', 'css'],
        });
      }
      
      try {
        const highlighter = await highlighterPromise;
        if (!highlighter) return;

        const highlighted = highlighter.codeToHtml(code, {
          lang: language,
          themes: {
            light: 'github-light',
            dark: 'github-dark',
          }
        });
        
        if (isMounted) {
          setHtml(highlighted);
        }
      } catch (e) {
        console.error('Shiki highlighting failed:', e);
      }
    }
    
    highlight();
    
    return () => {
      isMounted = false;
    };
  }, [code, language]);

  if (!html) {
    return (
      <div className="overflow-x-auto p-4 text-[13px] font-mono leading-relaxed text-neutral-800 dark:text-neutral-300">
        <pre className="whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div
      className="shiki-container overflow-x-auto text-[13px] font-mono leading-relaxed [&>pre]:!bg-transparent [&>pre]:p-4"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
