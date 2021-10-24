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
`;

const LIST_ITEM_STYLE = css`
  border-radius: 5px;
  background: var(--rs-gray-800);

  &:hover {
    background: var(--rs-gray-700);
  }
`;

export const ListItem = styled(List.Item)`
  ${LIST_ITEM_STYLE}
  box-shadow: none;
  cursor: pointer;
  padding: 0px;

  & > div {
    padding: 14px;
  }

  &:not(:last-child) {
    margin-bottom: 5px;
  }

  & svg {
    display: flex;
    height: 20px;
    width: auto;
  }

  & > div .content {
    /* margin: 0px 10px 0px 15px; */
    font-size: 16px;
    /* flex: auto; */
    /* max-width: 90%; */
    word-break: break-all;
  }

  &[data-active="true"] {
    background: var(--rs-gray-600);
    color: var(--rs-primary-700);
    font-weight: bold;
  }
`;

export const AddItemContainer = styled.div`
  ${LIST_ITEM_STYLE}
  margin-top: 8px;
  cursor: text;
  padding: 10px 14px;

  & svg {
    height: 20px;
    width: auto;
  }

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
