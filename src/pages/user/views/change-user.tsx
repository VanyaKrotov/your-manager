import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { Drawer, FlexboxGrid, IconButton } from "rsuite";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import { goBackOrDefault, routes } from "helpers/router";

import { pageView, user } from "store";

import UserList from "../components/user-list";
import CurrentUser from "../components/active-user";

import AddUserIcon from "icons/add-user.svg";

const ChangeUser: FC<RouteComponentProps> = ({
  history,
  location: { search },
}) => {
  const { profiles, isEmptyProfiles } = user;
  const { currentUserId } = pageView;

  const [active, setActive] = useState(currentUserId);
  const [open, setOpen] = useState(true);

  const { t } = useTranslation();

  const activeUser = useMemo(
    () => profiles.find(({ id }) => id === active)!,
    [profiles, active]
  );

  const onClose = useCallback(() => {
    if (!user.data) {
      return;
    }

    setOpen(false);
  }, []);

  const onExited = useCallback(() => goBackOrDefault(history), [history]);

  useEffect(() => {
    setActive(currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    if (isEmptyProfiles) {
      history.replace(routes.REGISTRATION);
    }
  }, [isEmptyProfiles, history]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement="top"
      full
      onExited={onExited}
    >
      <Drawer.Body>
        <FlexboxGrid className="full-height">
          <FlexboxGrid.Item colspan={6} className="full-height">
            <FlexboxGrid className="full-height" align="bottom">
              <FlexboxGrid.Item>
                <UserList
                  users={profiles}
                  active={active}
                  onSelect={setActive}
                />
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={12} className="full-height">
            <FlexboxGrid
              className="full-height"
              align="middle"
              justify="center"
            >
              <FlexboxGrid.Item>
                {activeUser && (
                  <CurrentUser user={activeUser} onClosePage={onClose} />
                )}
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={6} className="full-height">
            <FlexboxGrid justify="end">
              <FlexboxGrid.Item>
                <Link to={routes.REGISTRATION}>
                  <IconButton appearance="subtle" icon={<AddUserIcon />}>
                    {t("Add user")}
                  </IconButton>
                </Link>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Drawer.Body>
    </Drawer>
  );
};

export default observer(ChangeUser);
