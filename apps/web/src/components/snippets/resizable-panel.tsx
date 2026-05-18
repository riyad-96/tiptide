import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../ui/resizable';

export function ResizablePanelWindow({
  firstNode,
  secondNode,
  orientation = 'horizontal',
}: {
  firstNode: React.ReactNode;
  secondNode: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
}) {
  return (
    <ResizablePanelGroup orientation={orientation}>
      <ResizablePanel>{firstNode}</ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>{secondNode}</ResizablePanel>
    </ResizablePanelGroup>
  );
}
