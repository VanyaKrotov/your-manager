import React, { FC } from "react";
import { FlexboxGrid, ListItemProps } from "rsuite";
import { ItemContent, ItemIcon, ListItem } from "./styles";
import { ContextMenuTrigger } from "react-contextmenu";

interface TodoListItemProps extends ListItemProps {
  icon?: React.ReactNode;
  postfix?: React.ReactNode;
  active?: boolean;
  contextMenuId?: string;
  contextMenuUId?: string | number;
}

const TodoListItem: FC<TodoListItemProps> = ({
  children,
  icon,
  postfix,
  active = false,
  contextMenuId,
  contextMenuUId,
  ...restProps
}) => {
  const content = (
    <FlexboxGrid align="middle" justify="space-between">
      <FlexboxGrid.Item
        className="content flex-block flex-align-center"
        colspan={22}
      >
        <ItemIcon>{icon}</ItemIcon>
        <ItemContent>{children}</ItemContent>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item className="align-right" colspan={2}>
        {postfix}
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );

  return (
    <ListItem {...restProps} data-active={active} data-uid={contextMenuUId}>
      {contextMenuId ? (
        <ContextMenuTrigger id={contextMenuId}>{content}</ContextMenuTrigger>
      ) : (
        <div>{content}</div>
      )}
    </ListItem>
  );
};

export default TodoListItem;
