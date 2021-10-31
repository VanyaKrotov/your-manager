import { ContextMenuItemHandler } from "./types";

export const handlerBuilder =
  (handler: ContextMenuItemHandler) =>
  (
    event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
    data: Object,
    target: HTMLElement
  ) =>
    handler(target.parentElement?.dataset?.uid as string, event, data, target);
