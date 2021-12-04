import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button, Form, Input } from "rsuite";

interface LoginFormProps {
  onSubmit: (username: string, password: string) => Promise<boolean>;
}

const DEFAULT_VALUE = {
  username: "",
  password: "",
};

const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();

  const onSubmitHandler = async (_valid: boolean, event: any) => {
    const username = event.target.username.value;
    const password = event.target.password.value;

    await onSubmit(username, password);
  };

  return (
    <Form formDefaultValue={DEFAULT_VALUE} onSubmit={onSubmitHandler}>
      <Form.Group>
        <Form.Control<typeof Input>
          name="username"
          placeholder={t("Username")}
          type="email"
          autoFocus
        />
      </Form.Group>

      <Form.Group>
        <Form.Control<typeof Input>
          name="password"
          placeholder={t("Password")}
          type="password"
        />
      </Form.Group>

      <Button type="submit" appearance="primary" block>
        {t("Submit")}
      </Button>
    </Form>
  );
};

export default LoginForm;
