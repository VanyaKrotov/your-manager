import { Content } from "rsuite";
import styled from "styled-components";

import { isElectron } from "definition";
import { TITLE_BAR_HEIGHT } from "title-bar/constants";

import { List as TodoList, ListItem as TodoListItem } from "components/list";

export const ListTasksContainer = styled.div`
  height: calc(100vh - ${isElectron ? TITLE_BAR_HEIGHT : 0}px - 145px);
`;

export const TopListTasksContainer = styled.div`
  height: 145px;
  border-bottom: 1px solid var(--rs-divider-border);
`;

export const StyledTodoList = styled(TodoList)`
  & + .add-control {
    border-radius: 0;
    background: var(--ym-bg-200);
  }
`;

export const CountItemsContainer = styled.div`
  color: var(--rs-gray-500);
  font-size: 13px;
`;

export const StyledListItem = styled(TodoListItem)`
  background: transparent;
  margin: 5px;

  svg {
    height: 16px;
    width: auto;
  }
`;

export const StyledContent = styled(Content)`
  height: calc(100vh - ${isElectron ? TITLE_BAR_HEIGHT : 0}px);
  padding: 20px 30px;
`;

export const Title = styled.h3`
  input {
    color: var(--rs-sidenav-subtle-selected-text) !important;
  }
`;

export const ListContainer = styled.div`
  border-radius: 20px;
  margin-top: 20px;
  height: calc(100vh - ${isElectron ? TITLE_BAR_HEIGHT : 0}px - 100px);
`;

export const StepsState = styled.div`
  font-size: 10px;
  color: var(--rs-btn-subtle-text);
`;
