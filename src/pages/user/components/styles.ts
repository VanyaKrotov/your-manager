import { List } from "rsuite";
import styled from "styled-components";

export const StyledList = styled(List)`
  border: none;
  box-shadow: none;
  padding: 4px;
`;

export const StyledListItem = styled(List.Item)`
  padding: 10px 13px;
  border-radius: 5px;
  background-color: transparent;
  transition: 200ms;
  cursor: pointer;

  &[data-active="true"] {
    background-color: var(--rs-primary-700);
    box-shadow: var(--rs-state-focus-shadow);
  }

  &[data-active="false"]:hover {
    transition: 200ms;
    background-color: var(--rs-list-bg);
  }

  &:not(:last-of-type) {
    margin-bottom: 6px;
  }
`;

export const Section = styled.section`
  margin-bottom: 20px;
`;

export const ErrorMessage = styled.p`
  color: var(--rs-red-700);
  height: 20px;
`;
