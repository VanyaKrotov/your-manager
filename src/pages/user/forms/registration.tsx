import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonToolbar, Form, Input } from "rsuite";

interface RegistrationFormProps {
  onSubmit: (values: RegistrationFormValue) => void;
}

export interface RegistrationFormValue {
  username: string;
  password: string;
  confirmPassword: string;
  secretKey: string;
}

const DEFAULT_VALUE = {
  username: "",
  password: "",
  confirmPassword: "",
  secretKey: "",
};

const RegistrationForm: FC<RegistrationFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();

  const onSubmitHandler = useCallback(
    (valid, event) => {
      if (valid) {
        const formData = new FormData(event.target);

        onSubmit({
          username: formData.get("username"),
          password: formData.get("password"),
          confirmPassword: formData.get("confirmPassword"),
          secretKey: formData.get("secretKey"),
        } as RegistrationFormValue);
      }
    },
    [onSubmit]
  );

  return (
    <Form formDefaultValue={DEFAULT_VALUE} onSubmit={onSubmitHandler} fluid>
      <Form.Group>
        <Form.ControlLabel>{t("Username")}</Form.ControlLabel>
        <Form.Control<typeof Input> name="username" placeholder="Yerzhan" />
      </Form.Group>

      <Form.Group>
        <Form.ControlLabel>{t("Password")}</Form.ControlLabel>
        <Form.Control<typeof Input>
          name="password"
          type="password"
          placeholder="*******"
        />
      </Form.Group>

      <Form.Group>
        <Form.ControlLabel>{t("Confirm password")}</Form.ControlLabel>
        <Form.Control<typeof Input>
          name="confirmPassword"
          type="password"
          placeholder="*******"
        />
      </Form.Group>

      <Form.Group>
        <Form.ControlLabel>{t("Secret key")}</Form.ControlLabel>
        <Form.Control<typeof Input>
          name="secretKey"
          type="password"
          placeholder="*******"
        />
      </Form.Group>

      <Form.Group>
        <ButtonToolbar>
          <Button block type="submit" appearance="primary">
            {t("Create user")}
          </Button>
        </ButtonToolbar>
      </Form.Group>
    </Form>
  );
};

export default RegistrationForm;
