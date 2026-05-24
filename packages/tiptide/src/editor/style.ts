import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const tiptapStyleClasses =
  'tiptide-editor tt:prose tt:prose-neutral tt:dark:prose-invert tt:max-sm:prose-sm tt:focus:outline-none tt:bg-background tt:h-full tt:overflow-y-auto tt:max-w-none tt:w-full tt:px-10 tt:py-6 tt:prose-h2:text-4xl tt:prose-h3:text-3xl tt:prose-h4:text-2xl tt:prose-h5:text-lg tt:prose-h2:font-bold tt:prose-h3:font-semibold tt:prose-h5:font-semibold tt:prose-h6:font-semibold tt:prose-h2:my-6 tt:prose-h3:my-5 tt:prose-h4:my-4 tt:prose-h5:my-3 tt:prose-h6:my-1.5 tt:prose-a:no-underline tt:prose-hr:my-10';
