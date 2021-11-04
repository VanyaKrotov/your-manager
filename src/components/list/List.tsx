import React, { FC } from "react";
import { ListProps } from "rsuite";

import AddListItem from "./AddListItem";
import { Container, TodoListElement, ListTitle } from "./styles";

interface TodoListProps extends ListProps {
  children: React.ReactNode;
  onAddItem?: (title: string) => boolean;
  addPlaceholder?: string;
  title?: React.ReactNode;
  emptyPlaceholder?: React.ReactNode;
  empty?: boolean;
}

const TodoList: FC<TodoListProps> = ({
  children,
  onAddItem,
  addPlaceholder,
  title,
  emptyPlaceholder = "List is empty",
  empty = false,
  ...restProps
}) => (
  <Container>
    {title && <ListTitle>{title}</ListTitle>}
    <TodoListElement
      {...restProps}
      data-added={Boolean(onAddItem)}
      data-title={Boolean(title)}
    >
      {empty ? (
        <h6 className="flex-center full-height">{emptyPlaceholder}</h6>
      ) : (
        children
      )}
    </TodoListElement>
    {onAddItem && (
      <AddListItem onAddItem={onAddItem} placeholder={addPlaceholder} />
    )}
  </Container>
);

export default TodoList;
