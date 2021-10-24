import { FC } from "react";
import {
  Container,
  Nav,
  Sidebar,
  Sidenav,
  CustomProvider,
  FlexboxGrid,
  IconButton,
  IconButtonProps,
  Avatar,
  Dropdown,
} from "rsuite";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { Link, useLocation } from "react-router-dom";

import TaskIcon from "@rsuite/icons/Task";
import ParagraphIcon from "@rsuite/icons/Paragraph";
import LogoIcon from "@rsuite/icons/AppSelect";
import CharacterLockIcon from "@rsuite/icons/CharacterLock";
import ArrowLeftIcon from "@rsuite/icons/ArrowLeft";
import ArrowRightIcon from "@rsuite/icons/ArrowRight";

import Routes from "./pages";
import { pageView, user } from "./store";
import { routes } from "./helpers/router";

import "rsuite/dist/rsuite.min.css";
import "./styles.css";

const LogoContainer = styled.div`
  padding: 20px;

  & svg {
    width: 24px;
    height: auto;
  }

  & svg[data-expanded="false"] {
    width: 20px;
  }
`;

const LogoTitle = styled.span`
  font-size: 20px;
  margin-left: 10px;
  transition: display 1s linear;

  &[data-expanded="false"] {
    display: none;
  }
`;

const StyledSidebar = styled(Sidebar)`
  position: relative;
  border-right: 1px solid var(--rs-divider-border);
`;

const TogglerButton = styled(IconButton)`
  position: absolute;
  right: -12px;
  bottom: 80px;
  z-index: 10;
`;

const UserAvatar = styled(Avatar)`
  margin-right: 20px;
  position: absolute;
  left: 18px;
  top: 15px;
`;

const ExpandedToggler: FC<IconButtonProps & { expanded: boolean }> = ({
  expanded,
  onClick,
}) => (
  <TogglerButton
    icon={expanded ? <ArrowLeftIcon /> : <ArrowRightIcon />}
    size="xs"
    circle
    onClick={onClick}
    appearance="primary"
  />
);

const App = () => {
  const { pathname } = useLocation();

  return (
    <CustomProvider theme="dark">
      <Container>
        <StyledSidebar
          width={pageView.expandedSideBar ? 220 : 56}
          collapsible
          className="flex-column"
        >
          <Sidenav.Header>
            <LogoContainer>
              <FlexboxGrid align="middle">
                <FlexboxGrid.Item>
                  <LogoIcon data-expanded={pageView.expandedSideBar} />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item>
                  <LogoTitle data-expanded={pageView.expandedSideBar}>
                    You manager
                  </LogoTitle>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </LogoContainer>
          </Sidenav.Header>
          <Sidenav
            className="flex-column flex-auto"
            expanded={pageView.expandedSideBar}
            appearance="subtle"
          >
            <Sidenav.Body className="flex-column flex-auto">
              <Nav className="flex-auto" activeKey={pathname}>
                <Nav.Item
                  eventKey={routes.TODO_LIST}
                  icon={<TaskIcon />}
                  as={Link}
                  to={routes.TODO_LIST}
                >
                  Todo
                </Nav.Item>

                <Nav.Item
                  eventKey={routes.NOTES}
                  icon={<ParagraphIcon />}
                  as={Link}
                  to={routes.NOTES}
                >
                  Notes
                </Nav.Item>

                <Nav.Item
                  eventKey={routes.PASSWORDS}
                  icon={<CharacterLockIcon />}
                  as={Link}
                  to={routes.PASSWORDS}
                >
                  Passwords
                </Nav.Item>
              </Nav>
              <Nav activeKey={pathname}>
                <Dropdown
                  placement="rightEnd"
                  activeKey={pathname}
                  title={user.username}
                  icon={
                    <UserAvatar size="xs">{user.usernameSymbols}</UserAvatar>
                  }
                >
                  <Dropdown.Item>Profile</Dropdown.Item>
                  <Dropdown.Item
                    eventKey={routes.SETTINGS}
                    as={Link}
                    to={routes.SETTINGS}
                  >
                    Settings
                  </Dropdown.Item>

                  <Dropdown.Item divider />

                  <Dropdown.Item
                    eventKey={routes.SETTINGS}
                    as={Link}
                    to={routes.SETTINGS}
                  >
                    Change user
                  </Dropdown.Item>
                </Dropdown>
              </Nav>
            </Sidenav.Body>
            <ExpandedToggler
              expanded={pageView.expandedSideBar}
              onClick={pageView.toggleExpanded}
            />
          </Sidenav>
        </StyledSidebar>

        <Container>
          <Routes />
        </Container>
      </Container>
    </CustomProvider>
  );
};

export default observer(App);
