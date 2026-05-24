import { useState, useRef, memo } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { useEditorProvider } from '../../hooks/use-editor-provider';
import {
  ImagePlusIcon,
  Link,
  Upload,
  Loader2,
  ImageIcon,
  FolderOpen,
} from 'lucide-react';
import { Tooltip } from '../tooltip';

import type { ToolProps } from '../../types/tool';

export const ToolsImage = memo(function ToolsImage({
  className,
  hideTooltip,
  tooltipContent,
  children,
  size,
  tooltipPosition,
  onClick: propOnClick,
  onMediaLibraryClick,
  modal,
  popoverAlign,
}: ToolProps & { modal?: boolean; popoverAlign?: 'start' | 'center' | 'end' }) {
  const { editor, onUpload } = useEditorProvider();
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // If a developer passes a direct onClick handler to completely override image insertion
  if (propOnClick) {
    return (
      <Tooltip
        content={tooltipContent ?? 'Add image'}
        hideTooltip={hideTooltip}
        side={tooltipPosition}
      >
        <Button
          variant="ghost"
          size={size ?? 'sm'}
          onClick={() => propOnClick(editor)}
          type="button"
          className={className}
        >
          {children ?? (
            <>
              <ImagePlusIcon className="h-4 w-4" />
              <span>Add</span>
            </>
          )}
        </Button>
      </Tooltip>
    );
  }

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;

    editor
      .chain()
      .focus()
      .insertContent({
        type: 'image',
        attrs: { src: imageUrl.trim(), width: '100%', height: 'auto' },
      })
      .run();

    setImageUrl('');
    setIsOpen(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      let url = '';
      if (typeof onUpload === 'function') {
        url = await onUpload(file);
      } else {
        url = URL.createObjectURL(file);
      }

      editor
        .chain()
        .focus()
        .insertContent({
          type: 'image',
          attrs: { src: url, alt: file.name, width: '100%', height: 'auto' },
        })
        .run();

      setIsOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal={modal}>
      <Tooltip
        content={tooltipContent ?? 'Add image'}
        hideTooltip={hideTooltip || isOpen}
        side={tooltipPosition}
      >
        <PopoverTrigger asChild>
          <Button
            variant={isOpen ? 'secondary' : 'ghost'}
            size={size ?? 'sm'}
            type="button"
            className={className}
          >
            {children ?? (
              <>
                <ImagePlusIcon className="h-4 w-4" />
                <span>Add</span>
              </>
            )}
          </Button>
        </PopoverTrigger>
      </Tooltip>

      <PopoverContent
        align={popoverAlign ?? 'center'}
        className="flex w-80 flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <h3 className="text-sm leading-none font-semibold">Insert Image</h3>
          <p className="text-muted-foreground text-xs">
            Add an image from a URL or upload a file.
          </p>
        </div>

        <form onSubmit={handleLinkSubmit} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input
              placeholder="Paste image URL..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              disabled={isUploading}
              type="url"
              className="tt:h-8 text-xs"
            />
            <Button
              type="submit"
              size="sm"
              disabled={!imageUrl.trim() || isUploading}
              className="shrink-0"
            >
              <Link className="mr-1 h-3 w-3" />
              <span>Insert</span>
            </Button>
          </div>
        </form>

        <div className="relative flex items-center justify-center py-1">
          <div className="absolute inset-0 flex items-center">
            <span className="border-muted/50 border-border w-full border-t" />
          </div>
          <span className="bg-popover text-muted-foreground relative px-2 text-[10px] font-medium tracking-wider uppercase">
            or
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full justify-start text-xs font-normal"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
          >
            {isUploading ? (
              <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
            ) : (
              <Upload className="mr-2 h-3.5 w-3.5" />
            )}
            <span>
              {isUploading ? 'Uploading file...' : 'Upload from computer'}
            </span>
          </Button>

          {onMediaLibraryClick && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full justify-start text-xs font-normal"
              disabled={isUploading}
              onClick={() => {
                onMediaLibraryClick(editor);
                setIsOpen(false);
              }}
            >
              <FolderOpen className="mr-2 h-3.5 w-3.5" />
              <span>Choose from media library</span>
            </Button>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full justify-start text-xs font-normal"
            disabled={isUploading}
            onClick={() => {
              editor.chain().focus().insertImagePlaceholder().run();
              setIsOpen(false);
            }}
          >
            <ImageIcon className="mr-2 h-3.5 w-3.5" />
            <span>Insert upload placeholder card</span>
          </Button>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleUpload}
        />
      </PopoverContent>
    </Popover>
  );
});
