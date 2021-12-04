import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, Panel } from "rsuite";
import { user } from "store";
import { LoginForm } from "../forms";

import AddUserIcon from "icons/add-user.svg";

import { Section, ErrorMessage } from "./styles";

interface LoginUserProps {
  onClosePage: () => void;
}

const LoginUser: FC<LoginUserProps> = ({ onClosePage }) => {
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const onSubmit = async (username: string, password: string) => {
    const result = await user.loginWithEmail(username, password);

    if (!result) {
      setError(t("Login failed"));

      return false;
    }

    onClosePage();

    return true;
  };

  return (
    <Panel>
      <div className="flex-center">
        <Section>
          <Avatar circle size="lg">
            <AddUserIcon />
          </Avatar>
        </Section>
        <Section>
          <LoginForm onSubmit={onSubmit} />
        </Section>
        <Section>
          <ErrorMessage>{error}</ErrorMessage>
        </Section>
      </div>
    </Panel>
  );
};

export default LoginUser;
