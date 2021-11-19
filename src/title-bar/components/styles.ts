import styled from "styled-components";
import { TITLE_BAR_HEIGHT } from "../constants";

export const Container = styled.section`
  width: 100%;
  height: ${TITLE_BAR_HEIGHT}px;
  display: flex;
  align-items: center;
  background-color: var(--ym-title-bar-bg);
`;

export const ButtonControl = styled.section`
  width: 120px;
`;

export const IconControl = styled.section`
  width: 40px;
  padding: 0px 5px;
  text-align: center;
  -webkit-app-region: drag;

  & > img {
    width: 20px;
    height: auto;
  }
`;

export const TitleControl = styled.section`
  width: calc(100% - 160px);
  height: 30px;
  padding: 0px 10px;
  padding-left: 80px;
  line-height: 30px;
  text-align: center;
  -webkit-app-region: drag;
`;

export const Button = styled.button`
  width: 40px;
  height: 30px;
  border: none;
  user-select: none;
  background-color: transparent;
  padding: 2px 4px 6px;
  box-sizing: border-box;

  & > svg {
    width: 16px;
    height: auto;
  }

  :hover {
    background-color: var(--rs-btn-default-hover-bg);
  }

  :focus {
    border: none;
    box-shadow: none;
  }

  :hover:last-child {
    background-color: var(--rs-red-700);
  }
`;
