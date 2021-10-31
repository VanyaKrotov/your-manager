import { observer } from "mobx-react-lite";
import { FC, useCallback, useMemo, useState } from "react";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Container,
  FlexboxGrid,
  IconButton,
} from "rsuite";
// import Picker from "emoji-picker-react";
import { ItemsFilter, TodoListFilter } from "../types";
import RightSide from "./RightSide";

import MoreIcon from "@rsuite/icons/More";
import {
  List as TodoList,
  ListItem as TodoListItem,
} from "../../../components/list";
import TodoIcon from "../../../components/list/ItemIcon";
import { TodoState } from "../../../types/todo-list";
import Star from "../../../icons/Star";
import { ChangeTodoFilterHandler } from "../utils/useTodoListFilter";
import ContextMenu from "../../../components/context-menu";
import { pageView, todoList } from "../../../store";

import { StyledContent, Title, ListContainer, StepsState } from "./styles";
import { useTranslation } from "react-i18next";
import { TodoDefaultListGroup } from "../../../enums/todo-list";
import EditableTitle from "../../../components/editable-title";

interface TodoListContentProps {
  filter: TodoListFilter;
  changeFilter: ChangeTodoFilterHandler;
}

const TodoListContent: FC<TodoListContentProps> = ({
  filter: { group, filter },
  changeFilter,
}) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { itemsMapForGroups, groups } = todoList;
  const { t } = useTranslation();

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

  const onRemoveItem = useCallback(
    (key) => {
      onCloseRightSide();
      todoList.removeItem(Number(key));
    },
    [onCloseRightSide]
  );

  const onChangeItemsFilter = useCallback(
    (value) => () => changeFilter({ filter: value }),
    [changeFilter]
  );

  const contextMenuItems = useMemo(
    () => [
      {
        label: t("Delete task"),
        handler: onRemoveItem,
        className: "delete-button",
      },
    ],
    [onRemoveItem, t]
  );

  const onSaveTitle = useCallback((title) => console.log(title), []);

  const currentGroup = useMemo(
    () => groups.find(({ id }) => id === group),
    [group, groups]
  );

  const title = useMemo<string>(() => {
    switch (group) {
      case TodoDefaultListGroup.All:
        return t("All");
      case TodoDefaultListGroup.Priority:
        return t("Priority");
      case TodoDefaultListGroup.Today:
        return t("Today");

      default:
        return currentGroup?.title || "";
    }
  }, [currentGroup, group, t]);

  return (
    <Container>
      <ContextMenu items={contextMenuItems} id="todo-list-context" />

      <FlexboxGrid>
        <FlexboxGrid.Item colspan={center}>
          <StyledContent>
            <FlexboxGrid align="middle" justify="space-between">
              <FlexboxGrid.Item>
                <Title>
                  <EditableTitle onSave={onSaveTitle} readOnly={group < 0}>
                    {title}
                  </EditableTitle>
                </Title>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item>
                <ButtonToolbar>
                  <ButtonGroup size="sm">
                    <Button
                      active={filter === ItemsFilter.All}
                      onClick={onChangeItemsFilter(ItemsFilter.All)}
                      appearance="subtle"
                    >
                      {t("All")} ({itemsMap[ItemsFilter.All].length})
                    </Button>
                    <Button
                      active={filter === ItemsFilter.Done}
                      onClick={onChangeItemsFilter(ItemsFilter.Done)}
                      appearance="subtle"
                    >
                      {t("Done")} ({itemsMap[ItemsFilter.Done].length})
                    </Button>
                    <Button
                      active={filter === ItemsFilter.InProgress}
                      onClick={onChangeItemsFilter(ItemsFilter.InProgress)}
                      appearance="subtle"
                    >
                      {t("In progress")} (
                      {itemsMap[ItemsFilter.InProgress].length})
                    </Button>
                  </ButtonGroup>

                  <IconButton icon={<MoreIcon />} size="sm" />
                </ButtonToolbar>
              </FlexboxGrid.Item>
            </FlexboxGrid>

            <ListContainer>
              <TodoList
                onAddItem={onAddItem}
                empty={!itemsMap[filter].length}
                emptyPlaceholder={`${t("No tasks in this group")} [+]`}
                addPlaceholder={t("Add task")}
              >
                {itemsMap[filter].map(
                  ({ id, priority, title, state, steps }) => (
                    <TodoListItem
                      active={selectedId === id}
                      onClick={() => setSelectedId(id)}
                      key={id}
                      contextMenuUId={id}
                      contextMenuId="todo-list-context"
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
                              ? t("Mark as done")
                              : t("Move back to in progress")
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
                          title={t("Mark as important")}
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
