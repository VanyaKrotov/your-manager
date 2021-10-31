import React from "react";

export type ContextMenuItemHandler = (
  key: string | number,
  event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
  data: Object,
  target: HTMLElement
) => void;

export interface ContextMenuItem {
  icon?: JSX.Element;
  label: string;
  handler: ContextMenuItemHandler;
  className?: string;
}
