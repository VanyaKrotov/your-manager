import { Container, Nav, Sidenav, CustomProvider, Dropdown } from "rsuite";
import { ruRU, enUS } from "rsuite/locales";
import { observer } from "mobx-react-lite";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import UserInfoIcon from "@rsuite/icons/UserInfo";
import SettingIcon from "@rsuite/icons/Setting";
import UserChangeIcon from "@rsuite/icons/UserChange";

import TodoListIcon from "icons/todolist.svg";
import NotesIcon from "icons/notes.svg";
import PasswordsIcon from "icons/passwords.svg";
// import SearchIcon from "icons/search.svg";

import { routes } from "helpers/router";

import { Language, Theme } from "enums/page-view";
import { isElectron } from "definition";

import { PasswordConfirmation } from "modals";

import { TitleGlobalStyle } from "title-bar";

import { pageView, user } from "store";
import Routes from "pages";

import { StyledSidebar, UserAvatar, UserTitle } from "./appStyles";
import Moon from "icons/Moon";
import Sun from "icons/Sun";
import LanguageIcon from "icons/Language";

import "rsuite/dist/rsuite.min.css";
import "./styles.css";

const App = () => {
  const { language, theme } = pageView;
  const { authorized } = user;

  const { pathname } = useLocation();
  const { t } = useTranslation();

  const onSelectOption = (key?: string) => {
    if (!key) {
      return;
    }

    if ([Theme.Light, Theme.Dark].includes(key as Theme)) {
      pageView.changeTheme(key as Theme);
    }

    if ([Language.Ru, Language.EnUS].includes(key as Language)) {
      pageView.changeLanguage(key as Language);
    }
  };

  const locale = language === Language.Ru ? ruRU : enUS;
  console.log(user);

  return (
    <CustomProvider theme={theme} locale={locale}>
      {isElectron && <TitleGlobalStyle />}
      <Container>
        <PasswordConfirmation />
        <StyledSidebar width={56} collapsible className="flex-column">
          <Sidenav
            className="flex-column flex-auto"
            expanded={pageView.expandedSideBar}
            appearance="default"
          >
            <Sidenav.Body className="flex-column flex-auto">
              <Nav className="flex-auto" activeKey={pathname}>
                {/* <Nav.Item
                  eventKey={routes.SEARCH}
                  icon={<SearchIcon />}
                  as={Link}
                  to={routes.SEARCH}
                >
                  {t("Search")}
                </Nav.Item> */}

                <Nav.Item
                  eventKey={routes.TODO_LIST}
                  icon={<TodoListIcon />}
                  as={Link}
                  to={routes.TODO_LIST}
                >
                  {t("Todo")}
                </Nav.Item>

                <Nav.Item
                  eventKey={routes.NOTES}
                  icon={<NotesIcon />}
                  as={Link}
                  to={routes.NOTES}
                >
                  {t("Notes")}
                </Nav.Item>

                <Nav.Item
                  eventKey={routes.PASSWORDS}
                  icon={<PasswordsIcon />}
                  as={Link}
                  to={routes.PASSWORDS}
                >
                  {t("Passwords")}
                </Nav.Item>
              </Nav>
              <Nav activeKey={pathname}>
                <Dropdown
                  placement="rightEnd"
                  activeKey={pathname}
                  onSelect={onSelectOption}
                  title={<UserTitle>{user.username}</UserTitle>}
                  icon={
                    <UserAvatar size="xs">{user.usernameSymbols}</UserAvatar>
                  }
                >
                  <Dropdown.Item icon={<UserInfoIcon />}>
                    {t("Profile")}
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey={routes.SETTINGS}
                    as={Link}
                    to={routes.SETTINGS}
                    icon={<SettingIcon />}
                  >
                    {t("Settings")}
                  </Dropdown.Item>

                  <Dropdown.Item divider />

                  <Dropdown.Menu
                    title={t("Language")}
                    icon={<LanguageIcon />}
                    activeKey={language}
                  >
                    <Dropdown.Item eventKey={Language.Ru}>
                      ??????????????
                    </Dropdown.Item>
                    <Dropdown.Item eventKey={Language.EnUS}>
                      English
                    </Dropdown.Item>
                  </Dropdown.Menu>

                  <Dropdown.Menu
                    title={t("Theme")}
                    icon={theme === Theme.Light ? <Sun /> : <Moon />}
                    activeKey={theme}
                  >
                    <Dropdown.Item eventKey={Theme.Light}>
                      {t("Light")}
                    </Dropdown.Item>
                    <Dropdown.Item eventKey={Theme.Dark}>
                      {t("Dark")}
                    </Dropdown.Item>
                  </Dropdown.Menu>

                  <Dropdown.Item divider />

                  <Dropdown.Item
                    eventKey={routes.CHANGE_USER}
                    as={Link}
                    to={routes.CHANGE_USER}
                    icon={<UserChangeIcon />}
                  >
                    {t("Change user")}
                  </Dropdown.Item>
                </Dropdown>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
        </StyledSidebar>

        <Container>
          <Routes authorized={authorized} />
        </Container>
      </Container>
    </CustomProvider>
  );
};

export default observer(App);
