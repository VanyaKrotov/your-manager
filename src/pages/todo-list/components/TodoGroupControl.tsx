import { FC, useCallback } from "react";
import { Divider, Dropdown } from "rsuite";
import { observer } from "mobx-react";
import styled from "styled-components";

import TimeIcon from "@rsuite/icons/Time";
import TrashIcon from "@rsuite/icons/Trash";
import AttachmentIcon from "@rsuite/icons/Attachment";
import ListIcon from "@rsuite/icons/List";

import { todoList, user } from "../../../store";
import { TodoDefaultListGroup } from "../../../enums/todo-list";
import Star from "../../../icons/Star";

import {
  List as TodoList,
  ListItem as TodoListItem,
} from "../../../components/todo-list";
import { ContextMenu, MenuItem } from "react-contextmenu";

const NavContainer = styled.div`
  height: 100vh;
  width: 100%;
  border-right: 1px solid var(--rs-divider-border);
`;

const ListTasksContainer = styled.div`
  height: calc(100vh - 145px);
`;

const TopListTasksContainer = styled.div`
  height: 145px;
`;

const StyledTodoList = styled(TodoList)`
  & + .add-control {
    border-radius: 0;
    background: transparent;
    border-top: 1px solid var(--rs-divider-border);
  }
`;

const CountItemsContainer = styled.div`
  color: var(--rs-gray-500);
  font-size: 13px;
`;

const StyledListItem = styled(TodoListItem)`
  background: transparent;
  margin: 5px;

  svg {
    height: 16px;
    width: auto;
  }
`;

interface TodoGroupControlProps {
  activeKey: string | number;
  changeActiveGroup: (activeGroupId: number | TodoDefaultListGroup) => void;
}

const TodoGroupControl: FC<TodoGroupControlProps> = ({
  activeKey,
  changeActiveGroup,
}) => {
  const { groups } = todoList;

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

  const onDeleteGroup = useCallback((_target, _data, context) => {
    const groupId = Number(context.parentElement?.dataset?.uid);

    todoList.removeGroup(groupId);
  }, []);

  return (
    <NavContainer>
      <ContextMenu id="group-context">
        <Dropdown.Menu>
          <MenuItem onClick={onDeleteGroup}>
            <Dropdown.Item icon={<TrashIcon />} className="delete-button">
              Delete group
            </Dropdown.Item>
          </MenuItem>
        </Dropdown.Menu>
      </ContextMenu>
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
            All
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
            Today
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
            Priority
          </StyledListItem>
        </StyledTodoList>
      </TopListTasksContainer>

      <Divider className="reset-margin" />

      <ListTasksContainer>
        <StyledTodoList onAddItem={onAddGroup} addPlaceholder="Add task group">
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
