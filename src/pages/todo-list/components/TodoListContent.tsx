import { observer } from "mobx-react-lite";
import { FC, useCallback, useMemo, useState } from "react";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Container,
  Content,
  Dropdown,
  FlexboxGrid,
  IconButton,
} from "rsuite";
import styled from "styled-components";
import { ItemsFilter, TodoListFilter } from "../types";
import RightSide from "./RightSide";

import MoreIcon from "@rsuite/icons/More";
import { TodoList, TodoListItem } from "./todo-list";
import TodoIcon from "./todo-list/TodoIcon";
import { TodoState } from "../../../types/todo-list";
import Star from "../../../icons/Star";
import { pageView, todoList } from "../../../store";
import { ContextMenu, MenuItem } from "react-contextmenu";
import { ChangeTodoFilterHandler } from "../utils/useTodoListFilter";

const StyledContent = styled(Content)`
  height: 100vh;
  padding: 20px 30px;
`;

const Title = styled.h3`
  color: var(--rs-sidenav-subtle-selected-text);
`;

const ListContainer = styled.div`
  border-radius: 20px;
  margin-top: 20px;
  height: calc(100vh - 100px);
`;

const StepsState = styled.div`
  font-size: 13px;
  color: var(--rs-gray-200);
`;

interface TodoListContentProps {
  filter: TodoListFilter;
  changeFilter: ChangeTodoFilterHandler;
}

const TodoListContent: FC<TodoListContentProps> = ({
  filter: { group, filter },
  changeFilter,
}) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { itemsMapForGroups } = todoList;

  const itemsMap = useMemo(() => {
    const items = itemsMapForGroups[group] || [];

    return {
      [ItemsFilter.Done]: items.filter(({ state }) => state === TodoState.Done),
      [ItemsFilter.InProgress]: items.filter(
        ({ state }) => state === TodoState.InProgress
      ),
      [ItemsFilter.All]: items,
    };
  }, [itemsMapForGroups, group]);

  const onCloseRightSide = useCallback(
    () => setSelectedId(null),
    [setSelectedId]
  );

  const [center, right] = useMemo(
    () => (selectedId ? [16, 8] : [24, 0]),
    [selectedId]
  );

  const onAddItem = useCallback(
    (title: string) => {
      todoList
        .addItem({
          groupId: group as number,
          description: "",
          orderIndex: null,
          state: TodoState.InProgress,
          steps: [],
          title,
          type: 0,
          userId: pageView.currentUserId,
        })
        .then(({ id }) => setSelectedId(id));

      return true;
    },
    [group]
  );

  const onChangeState = useCallback((todoId: number, newState: TodoState) => {
    todoList.updateItem(todoId, { state: newState });
  }, []);

  const onRemoveItem = useCallback((_target, _data, context) => {
    const id = Number(context.parentElement?.dataset?.uid);

    onCloseRightSide();
    todoList.removeItem(id);
  }, [onCloseRightSide]);

  const onChangeItemsFilter = useCallback(
    (value) => () => changeFilter({ filter: value }),
    [changeFilter]
  );

  return (
    <Container>
      <ContextMenu id="same_unique_identifier" style={{ zIndex: 10 }}>
        <Dropdown.Menu>
          <MenuItem onClick={onRemoveItem}>
            <Dropdown.Item className="delete-button">Delete</Dropdown.Item>
          </MenuItem>
        </Dropdown.Menu>
      </ContextMenu>

      <FlexboxGrid>
        <FlexboxGrid.Item colspan={center}>
          <StyledContent>
            <FlexboxGrid align="middle" justify="space-between">
              <FlexboxGrid.Item>
                <Title>title</Title>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item>
                <ButtonToolbar>
                  <ButtonGroup size="sm">
                    <Button
                      active={filter === ItemsFilter.All}
                      onClick={onChangeItemsFilter(ItemsFilter.All)}
                    >
                      All ({itemsMap[ItemsFilter.All].length})
                    </Button>
                    <Button
                      active={filter === ItemsFilter.Done}
                      onClick={onChangeItemsFilter(ItemsFilter.Done)}
                    >
                      Done ({itemsMap[ItemsFilter.Done].length})
                    </Button>
                    <Button
                      active={filter === ItemsFilter.InProgress}
                      onClick={onChangeItemsFilter(ItemsFilter.InProgress)}
                    >
                      In progress ({itemsMap[ItemsFilter.InProgress].length})
                    </Button>
                  </ButtonGroup>

                  <IconButton icon={<MoreIcon />} size="sm" />
                </ButtonToolbar>
              </FlexboxGrid.Item>
            </FlexboxGrid>

            <ListContainer>
              <TodoList onAddItem={onAddItem}>
                {itemsMap[filter].map(
                  ({ id, priority, title, state, steps }) => (
                    <TodoListItem
                      active={selectedId === id}
                      onClick={() => setSelectedId(id)}
                      key={id}
                      contextMenuUId={id}
                      contextMenuId="same_unique_identifier"
                      icon={
                        <span
                          onClick={(event) => {
                            event.stopPropagation();

                            const newValue =
                              state === TodoState.InProgress
                                ? TodoState.Done
                                : TodoState.InProgress;

                            onChangeState(id, newValue);
                          }}
                          className="hover-icon centered-span"
                          title={
                            state === TodoState.InProgress
                              ? "Mark as done"
                              : "Move back to in progress"
                          }
                        >
                          <TodoIcon state={state} hovered />
                        </span>
                      }
                      postfix={
                        <span
                          onClick={(event) => {
                            event.stopPropagation();

                            todoList.updateItem(id, {
                              priority: !priority,
                            });
                          }}
                          title="Mark as important"
                          className="hover-icon centered-span"
                        >
                          <Star filled={priority} />
                        </span>
                      }
                    >
                      <div>{title}</div>
                      {steps.length > 0 &&
                        (() => {
                          const completedCount = steps.filter(
                            ({ state }) => state === TodoState.Done
                          ).length;

                          return (
                            <StepsState>
                              {completedCount === steps.length && (
                                <span>&#10004; </span>
                              )}
                              {completedCount} of {steps.length}
                            </StepsState>
                          );
                        })()}
                    </TodoListItem>
                  )
                )}
              </TodoList>
            </ListContainer>
          </StyledContent>
        </FlexboxGrid.Item>
        {selectedId && (
          <FlexboxGrid.Item colspan={right}>
            <RightSide
              selectedId={selectedId}
              onClose={onCloseRightSide}
              onChangeState={onChangeState}
            />
          </FlexboxGrid.Item>
        )}
      </FlexboxGrid>
    </Container>
  );
};

export default observer(TodoListContent);
