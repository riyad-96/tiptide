import React, { useRef, useState } from 'react';
import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react';
import { ImageIcon, Loader2, Upload, X } from 'lucide-react';
import { Button } from '../../ui/button';
import { useEditorProvider } from '../../../hooks/use-editor-provider';

export const ImagePlaceholderBlock = ({
  editor,
  getPos,
  deleteNode,
}: NodeViewProps) => {
  const { onUpload, imagePlaceholderBlock } = useEditorProvider();

  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (imagePlaceholderBlock) {
    const CustomPlaceholder = imagePlaceholderBlock;
    return (
      <NodeViewWrapper className="my-4">
        <CustomPlaceholder
          editor={editor}
          getPos={getPos as () => number}
          deleteNode={deleteNode}
        />
      </NodeViewWrapper>
    );
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

      // Replace this placeholder node with the actual image node
      editor
        .chain()
        .focus()
        .insertContentAt(getPos() as number, {
          type: 'image',
          attrs: { src: url, alt: file.name, width: '100%', height: 'auto' },
        })
        .run();
      deleteNode();
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <NodeViewWrapper className="tt:my-4">
      <div className="tt:group tt:relative tt:flex tt:flex-col tt:items-center tt:justify-center tt:rounded-xl tt:border-2 tt:border-dashed tt:border-neutral-200 tt:bg-neutral-50/50 tt:p-8 tt:hover:border-neutral-400 tt:hover:bg-neutral-50 tt:dark:border-neutral-800 tt:dark:bg-neutral-900/50 tt:dark:hover:border-neutral-600 tt:dark:hover:bg-neutral-900">
        <Button
          onClick={deleteNode}
          className="tt:absolute tt:top-2 tt:right-2 tt:rounded-md tt:p-1 tt:opacity-0 tt:group-hover:opacity-100"
          variant={'outline'}
          size="icon-sm"
          type="button"
        >
          <X className="tt:h-4 tt:w-4" />
        </Button>

        <div className="tt:flex tt:flex-col tt:items-center tt:gap-4 tt:text-center tt:select-none">
          <div className="tt:rounded-full tt:bg-white tt:p-3 tt:shadow-sm tt:ring-1 tt:ring-neutral-200 tt:dark:bg-neutral-900 tt:dark:ring-neutral-800">
            {isUploading ? (
              <Loader2 className="tt:h-6 tt:w-6 tt:animate-spin tt:text-neutral-500 tt:dark:text-neutral-400" />
            ) : (
              <ImageIcon className="tt:h-6 tt:w-6 tt:text-neutral-500 tt:dark:text-neutral-400" />
            )}
          </div>

          <div>
            <p className="tt:text-sm tt:font-medium">Add an image</p>
            <p className="tt:text-xs tt:text-neutral-500 tt:dark:text-neutral-400">
              Upload from computer or paste a link
            </p>
          </div>

          <div className="tt:flex tt:gap-2">
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              size="sm"
              type="button"
            >
              {isUploading ? (
                <>
                  <Loader2 className="tt:animate-duration-1000 tt:h-4 tt:w-4 tt:animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="tt:h-4 tt:w-4" />
                  <span>Upload File</span>
                </>
              )}
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              className="tt:hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    </NodeViewWrapper>
  );
};
