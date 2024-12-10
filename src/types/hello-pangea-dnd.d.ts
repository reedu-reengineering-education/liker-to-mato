declare module '@hello-pangea/dnd' {
  import * as React from 'react';

  export type DraggableId = string;
  export type DroppableId = string;
  export type DragStart = {
    draggableId: DraggableId;
    type: string;
    source: {
      droppableId: DroppableId;
      index: number;
    };
  };

  export type DropResult = {
    draggableId: DraggableId;
    type: string;
    source: {
      droppableId: DroppableId;
      index: number;
    };
    destination: {
      droppableId: DroppableId;
      index: number;
    } | null;
  };

  export type DragDropContextProps = {
    onDragEnd: (result: DropResult) => void;
    onDragStart?: (initial: DragStart) => void;
    children: React.ReactNode;
  };

  export type DroppableProps = {
    droppableId: string;
    type?: string;
    children: (provided: DroppableProvided) => React.ReactNode;
  };

  export type DraggableProps = {
    draggableId: string;
    index: number;
    children: (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => React.ReactNode;
  };

  export type DroppableProvided = {
    innerRef: (element: HTMLElement | null) => void;
    droppableProps: {
      'data-rbd-droppable-id': string;
    };
    placeholder?: React.ReactNode;
  };

  export type DraggableProvided = {
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: {
      'data-rbd-draggable-id': string;
      style?: React.CSSProperties;
    };
    dragHandleProps?: {
      'data-rbd-drag-handle-draggable-id': string;
      'data-rbd-drag-handle-context-id': string;
      role: string;
      tabIndex: number;
      draggable: boolean;
      onDragStart: (event: React.DragEvent<HTMLElement>) => void;
    };
  };

  export type DraggableStateSnapshot = {
    isDragging: boolean;
    isDropAnimating: boolean;
    draggingOver: DroppableId | null;
  };

  export const DragDropContext: React.FC<DragDropContextProps>;
  export const Droppable: React.FC<DroppableProps>;
  export const Draggable: React.FC<DraggableProps>;
}
