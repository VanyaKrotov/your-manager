import { Col, Grid, Row } from "rsuite";
import styled from "styled-components";

export const TableContainer = styled(Grid).attrs({ fluid: true })``;

export const HeaderContainer = styled(Row)`
  padding: 10px;
  background-color: var(--ym-table-header);
  border-radius: 6px;
  margin-bottom: 20px;
`;

export const TableHeaderItem = styled(Col)`
  :first-child {
    padding: 2px 5px;
  }
`;

export const TableRow = styled(HeaderContainer)`
  margin-bottom: 0px;

  &:not(:first-child) {
    margin-top: 10px;
  }
`;

export const TableCol = styled(Col)`
  &[data-padding] {
    padding: 5px;
  }

  :first-child {
    align-items: center;
    height: 30px;
  }
`;

export const BodyContainer = styled.div``;
