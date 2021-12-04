import { format } from "date-fns";
import { createUsernameSymbols } from "helpers/user";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, Button, Panel } from "rsuite";

import { User } from "types/user";

import { pageView, user as userStore } from "store";

import { PasswordForm } from "../forms";

import { Section, ErrorMessage } from "./styles";

interface CurrentUserProps {
  user: User;
  onClosePage: () => void;
}

const CurrentUser: FC<CurrentUserProps> = ({ user, onClosePage }) => {
  const [error, setError] = useState("");

  const { username, hasPassword, lastLogin, id } = user;

  const { t } = useTranslation();

  const onSubmitForm = async (password: string) => {
    const result = await userStore.login(id, password);

    if (!result) {
      setError(t("Login failed"));

      return false;
    }

    onClosePage();

    return true;
  };

  const onLoginButton = () => onSubmitForm("");

  return (
    <Panel>
      <div className="flex-center">
        <Section>
          <Avatar circle size="lg">
            {createUsernameSymbols(username)}
          </Avatar>
        </Section>
        <Section>
          <h3 className="align-center">{username}</h3>
        </Section>
        {lastLogin && (
          <time className="align-center">
            {format(
              lastLogin,
              `'${t("last login")}' dd MMM yyyy '${t("in")}' hh:MM`,
              pageView.formatOptions
            )}
          </time>
        )}
        <Section>
          {hasPassword ? (
            <PasswordForm onSubmit={onSubmitForm} />
          ) : (
            <Button className="w-100" onClick={onLoginButton} autoFocus>
              {t("Login")}
            </Button>
          )}
        </Section>
        <Section>
          <ErrorMessage>{error}</ErrorMessage>
        </Section>
      </div>
    </Panel>
  );
};

export default CurrentUser;
