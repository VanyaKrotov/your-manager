import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonToolbar, Form, Input, Schema } from "rsuite";
import { i18n } from "store";
import { DEFAULT_USERNAME } from "store/user/constants";

const { Model, Types } = Schema;

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
  username: DEFAULT_USERNAME,
  password: "",
  confirmPassword: "",
  secretKey: "",
};

const model = Model({
  username: Types.StringType().isRequired(i18n.t("Username is required field")),
  password: Types.StringType()
    .isRequiredOrEmpty()
    .addRule(
      (current) => !(current && current.length < 8),
      i18n.t("Password must have minimum 8 chars")
    ),
  confirmPassword: Types.StringType()
    .isRequiredOrEmpty()
    .addRule(
      (current, { password }) => !(password && password !== current),
      i18n.t("Password mismatch")
    ),
  secretKey: Types.StringType()
    .isRequired(i18n.t("Secret key is required field"))
    .minLength(10, i18n.t("Secret key must have minimum 10 chars")),
});

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
    <Form
      formDefaultValue={DEFAULT_VALUE}
      onSubmit={onSubmitHandler}
      model={model}
      checkTrigger="blur"
      fluid
    >
      <Form.Group>
        <Form.ControlLabel>{t("Username")}</Form.ControlLabel>
        <Form.Control<typeof Input>
          name="username"
          placeholder={DEFAULT_USERNAME}
        />
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
            {t("Create profile")}
          </Button>
        </ButtonToolbar>
      </Form.Group>

      <Form.Group className="warning-color">{t("All data encoded")}</Form.Group>
    </Form>
  );
};

export default RegistrationForm;
