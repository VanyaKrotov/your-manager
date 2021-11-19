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

export const Section = styled.section`
  display: flex;
  align-items: center;
  width: 100%;

  :not(:last-child) {
    margin-bottom: 10px;
  }

  &[data-block] {
    display: inline-block;
  }
`;

export const SectionTitle = styled.div`
  margin-bottom: 10px;
  margin-right: 10px;
  font-size: 15px;
  color: var(--rs-text-disabled);
`;

export const SectionContent = styled.div`
  margin-bottom: 7px;
  width: 60%;

  &[data-inline] {
    margin-bottom: 10px;
  }

  &[data-full-width] {
    width: 100%;
  }
`;
