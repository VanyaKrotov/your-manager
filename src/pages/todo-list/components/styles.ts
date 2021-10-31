import { Content } from "rsuite";
import styled from "styled-components";

import {
  List as TodoList,
  ListItem as TodoListItem,
} from "../../../components/list";

export const NavContainer = styled.div`
  height: 100vh;
  width: 100%;
  border-right: 1px solid var(--rs-divider-border);
`;

export const ListTasksContainer = styled.div`
  height: calc(100vh - 145px);
`;

export const TopListTasksContainer = styled.div`
  height: 145px;
`;

export const StyledTodoList = styled(TodoList)`
  & + .add-control {
    border-radius: 0;
    background: transparent;
    border-top: 1px solid var(--rs-divider-border);
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
  height: 100vh;
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
  height: calc(100vh - 100px);
`;

export const StepsState = styled.div`
  font-size: 10px;
  color: var(--rs-gray-200);
`;
