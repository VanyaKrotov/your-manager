import React, { FC } from "react";
import { ListProps } from "rsuite";
import AddListItem from "./AddListItem";
import { Container, TodoListElement } from "./styles";

interface TodoListProps extends ListProps {
  children: React.ReactNode;
  onAddItem?: (title: string) => boolean;
  addPlaceholder?: string;
}

const TodoList: FC<TodoListProps> = ({
  children,
  onAddItem,
  addPlaceholder,
  ...restProps
}) => (
  <Container>
    <TodoListElement {...restProps} data-hasAdded={Boolean(onAddItem)}>
      {children}
    </TodoListElement>
    {onAddItem && (
      <AddListItem onAddItem={onAddItem} placeholder={addPlaceholder} />
    )}
  </Container>
);

export default TodoList;
