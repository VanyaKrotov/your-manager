import { FC } from "react";
import styled from "styled-components";
import { TodoState } from "../../types/todo-list";

const StyledSvg = styled.svg`
  & .success {
    visibility: hidden;
  }

  &[data-hovered="true"]:hover .success,
  &[data-show="true"] .success {
    visibility: visible;
  }
`;

const Container = styled.span`
  display: flex;

  & > svg {
    min-height: 20px;
    width: auto;
    display: none;
  }

  .empty {
    display: flex;
  }

  &:hover .empty {
    display: none;
  }

  &:hover .success {
    display: flex;
  }

  &[data-done="true"] {
    .empty,
    .success {
      display: none;
    }

    .filled-success {
      display: flex;
    }
  }
`;

interface TodoIconProps {
  state?: TodoState;
  hovered?: boolean;
}

const Empty = () => (
  <StyledSvg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    className="empty"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
  </StyledSvg>
);

const Success = () => (
  <StyledSvg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    className="success"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"></path>
  </StyledSvg>
);

const FilledSuccess = () => (
  <StyledSvg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    className="filled-success"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
  </StyledSvg>
);

const TodoIcon: FC<TodoIconProps> = ({
  state = TodoState.InProgress,
  hovered,
}) => {
  return (
    <Container data-done={state === TodoState.Done} data-hovered={hovered}>
      <Empty />
      <Success />
      <FilledSuccess />
    </Container>
  );
};
export default TodoIcon;
