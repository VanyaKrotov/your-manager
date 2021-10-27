import { List } from "rsuite";
import styled, { css } from "styled-components";

export const Container = styled.div`
  max-height: 100%;
  height: 100%;
`;

export const TodoListElement = styled(List)`
  box-shadow: none;
  height: 100%;

  &[data-hasAdded="true"] {
    height: calc(100% - 56px);
  }

  /* background-image: url('data:image/svg+xml,<svg viewBox="0 0 1000 40" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="0" x2="1000" y2="0" stroke="currentColor" /></svg>'); */
`;

const LIST_ITEM_STYLE = css`
  border-radius: 4px;
  background: var(--rs-gray-800);

  & svg {
    display: flex;
    height: 16px;
    width: auto;
  }

  &:hover {
    background: var(--rs-gray-800);
  }
`;

export const ListItem = styled(List.Item)`
  ${LIST_ITEM_STYLE}
  box-shadow: none;
  cursor: pointer;
  padding: 0px;

  & > div {
    padding: 10px 14px;
  }

  &:not(:last-child) {
    margin-bottom: 5px;
  }

  & > div .content {
    font-size: 15px;
    word-break: break-all;
  }

  &[data-active="true"] {
    background: var(--rs-gray-800);
    color: var(--rs-primary-700);
    font-weight: bold;
  }
`;

export const AddItemContainer = styled.div`
  ${LIST_ITEM_STYLE}
  margin-top: 8px;
  cursor: text;
  padding: 10px 14px;

  & > div > div:last-child {
    flex: auto;
    margin-left: 15px;
  }

  & p {
    font-size: 16px;
    margin: 3px 0px;
    display: inline-block;
    margin-left: 5px;
  }

  & input {
    margin-left: -5px;
    background: transparent;
  }

  & input,
  input:focus {
    border: none;
    box-shadow: none;
  }
`;

export const ItemIcon = styled.div`
  width: 30px;
`;

export const ItemContent = styled.div`
  width: calc(100% - 30px);
`;
