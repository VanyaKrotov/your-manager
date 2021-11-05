import { FC, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button, Form, Input, InputGroup } from "rsuite";

import SendIcon from "icons/send.svg";

interface PasswordFormProps {
  onSubmit: (password: string) => void;
}

const DEFAULT_VALUE = { password: "" };

const PasswordForm: FC<PasswordFormProps> = ({ onSubmit }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();

  const onSubmitHandler = useCallback(
    async (_valid, event) => {
      await onSubmit(event.target.password.value);

      ref.current?.click();
    },
    [onSubmit]
  );

  return (
    <Form formDefaultValue={DEFAULT_VALUE} onSubmit={onSubmitHandler}>
      <button type="reset" ref={ref} className="not-visible" />
      <InputGroup>
        <Form.Control<typeof Input>
          name="password"
          placeholder={t("Password")}
          type="password"
          autoFocus
        />
        <InputGroup.Button as={Button} type="submit">
          <SendIcon />
        </InputGroup.Button>
      </InputGroup>
    </Form>
  );
};

export default PasswordForm;
