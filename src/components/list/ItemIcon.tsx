import { FC } from "react";
import styled from "styled-components";

import { TodoState } from "types/todo-list";

import CheckmarkIcon from "icons/checkmark.svg";

const Container = styled.span`
  position: relative;
  display: block;
  width: 20px;
  height: 20px;

  &::after {
    content: " ";
    position: absolute;
    border-radius: 50%;
    border: 2px solid;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 1;
  }

  &[data-done="true"]::after {
    border-color: var(--rs-green-500);
  }

  &[data-done="true"] > svg {
    display: block;
  }

  &[data-done="true"] > svg > path {
    fill: var(--rs-green-500);
  }

  & > svg {
    display: none;
    position: absolute;
    height: 14px;
    width: auto;
    top: 3px;
    left: 3px;
    z-index: 2;
  }
`;

interface TodoIconProps {
  state?: TodoState;
  hovered?: boolean;
}

const TodoIcon: FC<TodoIconProps> = ({
  state = TodoState.InProgress,
  hovered,
}) => {
  const isDone = state === TodoState.Done;

  return (
    <Container data-hovered={hovered} data-done={isDone}>
      <CheckmarkIcon />
    </Container>
  );
};
export default TodoIcon;
