import { List } from "rsuite";
import styled, { css } from "styled-components";

export const Container = styled.div`
  max-height: 100%;
  height: 100%;
`;

export const ListTitle = styled.div`
  height: 56px;
  padding: 10px;
  border-bottom: 1px solid var(--rs-divider-border);
  display: flex;
  align-items: center;
`;

export const TodoListElement = styled(List)`
  box-shadow: none;
  height: 100%;

  &[data-added="true"][data-title="true"] {
    height: calc(100% - 112px);
  }

  &[data-added="true"],
  &[data-title="true"] {
    height: calc(100% - 56px);
  }
`;

const LIST_ITEM_STYLE = css`
  border-radius: 4px;
  background: var(--ym-list-bg);

  & svg {
    display: flex;
    height: 16px;
    width: auto;
  }

  &:hover {
    background: var(--ym-list-bg-hover);
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
    background: var(--ym-list-bg-active);
    color: var(--rs-primary-700);
    font-weight: bold;
  }
`;

export const AddItemContainer = styled.div`
  ${LIST_ITEM_STYLE}
  margin-top: 8px;
  cursor: text;
  padding: 10px 14px;

  & p {
    font-size: 14px;
    margin: 3px 0px;
    display: inline-block;
    padding-left: 12px;
  }

  & input {
    background: transparent;
  }

  & input,
  input:focus {
    border: none;
    box-shadow: none;
  }

  & > div > div:first-child {
    width: 20px;
    text-align: center;
  }

  & > div > div:last-child {
    width: calc(100% - 20px);
  }
`;

export const ItemIcon = styled.div`
  width: 30px;
`;

export const ItemContent = styled.div`
  width: calc(100% - 30px);
`;
