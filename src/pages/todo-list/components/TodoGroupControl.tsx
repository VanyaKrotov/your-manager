import { FC, useCallback, useMemo } from "react";
import { Divider } from "rsuite";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { todoList, user } from "store";

import { TodoDefaultListGroup } from "enums/todo-list";

import ContextMenu from "components/context-menu";

import {
  NavContainer,
  ListTasksContainer,
  TopListTasksContainer,
  StyledTodoList,
  CountItemsContainer,
  StyledListItem,
} from "./styles";

import Star from "icons/Star";
import TimeIcon from "@rsuite/icons/Time";
import TrashIcon from "@rsuite/icons/Trash";
import AttachmentIcon from "@rsuite/icons/Attachment";
import ListIcon from "@rsuite/icons/List";

interface TodoGroupControlProps {
  activeKey: string | number;
  changeActiveGroup: (activeGroupId: number | TodoDefaultListGroup) => void;
}

const TodoGroupControl: FC<TodoGroupControlProps> = ({
  activeKey,
  changeActiveGroup,
}) => {
  const { groups } = todoList;
  const { t } = useTranslation();

  const onAddGroup = useCallback(
    (title: string) => {
      todoList.addGroup({
        title,
        orderIndex: groups.length + 1,
        userId: user.userId,
      });

      return true;
    },
    [groups]
  );

  const onDeleteGroup = useCallback((groupId) => {
    todoList.removeGroup(Number(groupId));
  }, []);

  const contextMenuItems = useMemo(
    () => [
      {
        label: t("Delete group"),
        handler: onDeleteGroup,
        className: "delete-button",
        icon: <TrashIcon />,
      },
    ],
    [onDeleteGroup, t]
  );

  return (
    <NavContainer>
      <ContextMenu id="group-context" items={contextMenuItems} />
      <TopListTasksContainer>
        <StyledTodoList>
          <StyledListItem
            icon={<ListIcon />}
            postfix={
              <CountItemsContainer>
                {todoList.countItemsInGroup(TodoDefaultListGroup.All) || ""}
              </CountItemsContainer>
            }
            active={TodoDefaultListGroup.All === activeKey}
            onClick={() => changeActiveGroup(TodoDefaultListGroup.All)}
          >
            {t("All")}
          </StyledListItem>

          <StyledListItem
            icon={<TimeIcon />}
            postfix={
              <CountItemsContainer>
                {todoList.countItemsInGroup(TodoDefaultListGroup.Today) || ""}
              </CountItemsContainer>
            }
            active={TodoDefaultListGroup.Today === activeKey}
            onClick={() => changeActiveGroup(TodoDefaultListGroup.Today)}
          >
            {t("Today")}
          </StyledListItem>

          <StyledListItem
            icon={<Star />}
            postfix={
              <CountItemsContainer>
                {todoList.countItemsInGroup(TodoDefaultListGroup.Priority) ||
                  ""}
              </CountItemsContainer>
            }
            active={TodoDefaultListGroup.Priority === activeKey}
            onClick={() => changeActiveGroup(TodoDefaultListGroup.Priority)}
          >
            {t("Priority")}
          </StyledListItem>
        </StyledTodoList>
      </TopListTasksContainer>

      <Divider className="reset-margin" />

      <ListTasksContainer>
        <StyledTodoList
          onAddItem={onAddGroup}
          addPlaceholder={t("Add task group")}
          emptyPlaceholder={`${t("No task groups")} [+]`}
          empty={!groups.length}
        >
          {groups.map(({ id, title }) => (
            <StyledListItem
              contextMenuId="group-context"
              contextMenuUId={id}
              icon={<AttachmentIcon />}
              active={activeKey === id}
              key={id}
              postfix={
                <CountItemsContainer>
                  {todoList.countItemsInGroup(id) || ""}
                </CountItemsContainer>
              }
              onClick={() => changeActiveGroup(id)}
            >
              {title}
            </StyledListItem>
          ))}
        </StyledTodoList>
      </ListTasksContainer>
    </NavContainer>
  );
};

export default observer(TodoGroupControl);
