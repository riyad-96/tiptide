import fs from 'fs';
import path from 'path';

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            processFile(fullPath);
        }
    }
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('export const') && content.includes('memo(')) return;

    // We only want to memoize the main exported component
    // Typically: export function ToolsName(...) { ... }
    const exportRegex = /export\s+function\s+([A-Z][a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*\{/g;
    let match = exportRegex.exec(content);
    
    if (match) {
        const funcName = match[1];
        
        // Ensure react import has memo
        if (!content.includes("import React")) {
            if (content.includes("from 'react'")) {
                content = content.replace(/import\s+\{([^}]+)\}\s+from\s+'react';/, (m, p1) => {
                    if (!p1.includes('memo')) {
                        return `import { ${p1}, memo } from 'react';`;
                    }
                    return m;
                });
            } else {
                content = `import { memo } from 'react';\n` + content;
            }
        }
        
        // Replace export function Component(...) { with export const Component = memo(function Component(...) {
        content = content.replace(
            new RegExp(`export\\s+function\\s+${funcName}\\s*\\(`), 
            `export const ${funcName} = memo(function ${funcName}(`
        );
        
        // Find the last closing brace and add `);`
        const lastBraceIndex = content.lastIndexOf('}');
        if (lastBraceIndex !== -1) {
            content = content.substring(0, lastBraceIndex + 1) + ');\n' + content.substring(lastBraceIndex + 1);
        }
        
        fs.writeFileSync(filePath, content);
        console.log(`Optimized: ${filePath}`);
    }
}

processDir('./src/package/tiptide/editor/components');
// Also process TiptideTextarea
processFile('./src/package/tiptide/editor/text-editor.tsx');
