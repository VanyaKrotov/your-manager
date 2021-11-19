import styled from "styled-components";

import { getWindowHeight } from "helpers/styles";

export const PanelContainer = styled.div`
  height: ${getWindowHeight("100vh")};

  &[data-layer="1"] {
    background-color: var(--ym-panel-1);
  }

  &[data-layer="2"] {
    background-color: var(--ym-panel-2);
  }
`;

export const PanelContent = styled.div`
  padding: 20px;
  height: calc(100% - 60px);
`;

export const PanelTitle = styled.div`
  margin-bottom: 20px;
`;

export const PanelBottomControl = styled.div`
  background-color: var(--ym-bg-100);
  height: 60px;
`;
