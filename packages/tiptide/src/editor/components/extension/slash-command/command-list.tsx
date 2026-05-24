import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { Button } from '../../ui/button';

import type { SuggestionItem } from '../../../types/slash-command';

export interface CommandListProps {
  items: SuggestionItem[];
  command: (item: SuggestionItem) => void;
}

export interface CommandListRef {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

export const CommandList = forwardRef<CommandListRef, CommandListProps>(
  (props, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const el = container.children[selectedIndex] as HTMLElement | undefined;
      el?.scrollIntoView({
        block: 'nearest',
      });
    }, [selectedIndex]);

    const selectItem = (index: number) => {
      const item = props.items[index];
      if (item) {
        props.command(item);
      }
    };

    React.useEffect(() => setSelectedIndex(0), [props.items]);

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }: { event: KeyboardEvent }) => {
        if (event.key === 'ArrowUp') {
          setSelectedIndex(
            (selectedIndex + props.items.length - 1) % props.items.length,
          );
          return true;
        }

        if (event.key === 'ArrowDown') {
          setSelectedIndex((selectedIndex + 1) % props.items.length);
          return true;
        }

        if (event.key === 'Enter') {
          selectItem(selectedIndex);
          return true;
        }

        return false;
      },
    }));

    return (
      <div
        ref={containerRef}
        className="tiptide-slash-command-container tiptide-theme tt:bg-popover tt:border-border tt:z-50 tt:grid tt:max-h-80.5 tt:w-55 tt:scroll-py-1 tt:overflow-y-auto tt:rounded-md tt:border tt:p-1 tt:shadow-md"
      >
        {props.items.length ? (
          props.items.map((item, index) => (
            <Button
              key={index}
              onClick={() => selectItem(index)}
              className="tt:flex tt:h-fit tt:items-center tt:justify-start tt:gap-2 tt:rounded-md tt:px-2 tt:text-start tt:transition-none"
              variant={index === selectedIndex ? 'secondary' : 'ghost'}
              type="button"
            >
              <span className="tt:flex tt:size-9 tt:shrink-0 tt:items-center tt:justify-center tt:rounded-md tt:border">
                <item.icon className="tt:h-4 tt:w-4" />
              </span>
              <span className="tt:grid">
                <span className="tt:font-medium">{item.title}</span>
                <span className="tt:text-xs tt:text-balance tt:text-neutral-500">
                  {item.description}
                </span>
              </span>
            </Button>
          ))
        ) : (
          <div className="tt:px-2 tt:py-1.5 tt:text-sm tt:text-neutral-500">
            No results found
          </div>
        )}
      </div>
    );
  },
);

CommandList.displayName = 'CommandList';
