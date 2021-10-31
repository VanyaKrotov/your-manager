import { Avatar, IconButton, Sidebar } from "rsuite";
import styled from "styled-components";

export const LogoContainer = styled.div`
  padding: 15px;

  & svg[data-expanded="false"] {
    width: 20px;
  }
`;

export const LogoTitle = styled.span`
  font-size: 20px;
  margin-left: 10px;
  transition: display 1s linear;

  &[data-expanded="false"] {
    display: none;
  }
`;

export const StyledSidebar = styled(Sidebar)`
  position: relative;
  border-right: 1px solid var(--rs-divider-border);
`;

export const TogglerButton = styled(IconButton)`
  position: absolute;
  right: -12px;
  bottom: 80px;
  z-index: 5;
`;

export const UserAvatar = styled(Avatar)`
  margin-right: 20px;
  position: absolute;
  left: 18px;
  top: 15px;
`;

export const UserTitle = styled.p`
  font-size: 16px;
  color: var(--rs-primary-700);
`;
