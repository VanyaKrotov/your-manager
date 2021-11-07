import styled from "styled-components";
import { Input } from "rsuite";

export const CopyContainer = styled.div`
  height: 30px;

  & button {
    display: none;
  }

  &[data-copy="true"]:hover button {
    display: block;
  }
`;

export const CopyInput = styled(Input)`
  border: none;
  background-color: transparent;
  margin: 1px 0px;
  padding-left: 0;
  padding-right: 0;

  :focus,
  :active {
    box-shadow: none;
  }
`;
