import { FC, useCallback, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Drawer, FlexboxGrid } from "rsuite";

import { goBackOrDefault } from "helpers/router";
import { RegistrationForm } from "../forms";

import AddUserIcon from "icons/add-user.svg";
import { useTranslation } from "react-i18next";
import { user } from "store";

const Registration: FC<RouteComponentProps> = ({ history }) => {
  const [open, setOpen] = useState(true);
  const { t } = useTranslation();

  const onClose = useCallback(() => setOpen(false), []);

  const onExited = useCallback(() => goBackOrDefault(history), [history]);

  const onSubmit = useCallback(
    async (values) => {
      const result = await user.addUser(values);

      if (result) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement="top"
      full
      onExited={onExited}
    >
      <Drawer.Body>
        <FlexboxGrid align="middle" justify="center" className="full-height">
          <FlexboxGrid.Item>
            <h3 className="m-b-20">
              <FlexboxGrid align="middle">
                <FlexboxGrid.Item className="contents">
                  <AddUserIcon />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item className="m-l-10">
                  {t("Create new user")}
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </h3>
            <RegistrationForm onSubmit={onSubmit} />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Drawer.Body>
    </Drawer>
  );
};

export default Registration;
