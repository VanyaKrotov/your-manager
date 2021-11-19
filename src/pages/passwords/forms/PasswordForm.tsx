import { FC, useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import {
  Button,
  ButtonToolbar,
  Checkbox,
  CheckboxGroup,
  FlexboxGrid,
  Form,
  IconButton,
  Input,
  InputPicker,
  Slider,
} from "rsuite";
import { Password } from "types/passwords";
import { generate } from "generate-password";

import GenerateIcon from "icons/reset.svg";
import Textarea from "components/textarea";
import { PasswordGenerateOptions } from "enums/passwords";
import { pageView, passwords, user } from "store";
import { useTranslation } from "react-i18next";

export type PasswordFormValue = Pick<
  Password,
  | "title"
  | "password"
  | "domain"
  | "description"
  | "username"
  | "groupId"
  | "userId"
>;

interface PasswordFormProps {
  onSubmit: (values: PasswordFormValue) => void;
  initialValues: PasswordFormValue | null;
}

const DEFAULT_FORM_VALUE: PasswordFormValue = {
  description: "",
  domain: "",
  password: "",
  title: "",
  username: "",
  groupId: 0,
  userId: 0,
};

const PasswordForm: FC<PasswordFormProps> = ({ onSubmit, initialValues }) => {
  const [formValue, setFormValue] = useState<PasswordFormValue>(
    initialValues || DEFAULT_FORM_VALUE
  );

  const { t } = useTranslation();

  const { userId } = user;
  const { pickerGroups } = passwords;

  const onSubmitHandler = useCallback(
    (valid) => valid && onSubmit(formValue),
    [formValue, onSubmit]
  );

  const onGeneratePassword = useCallback(() => {
    const { generateFnOptions } = pageView;

    const password = generate(generateFnOptions);

    setFormValue((prev) => ({ ...prev, password }));
  }, [setFormValue]);

  const onCreateGroup = useCallback(
    async (title: string) => {
      const group = await passwords.addGroup({ userId, title });

      if (group) {
        setFormValue((prev) => Object.assign(prev, { groupId: group.id }));
      }
    },
    [userId]
  );

  useEffect(() => setFormValue((prev) => ({ ...prev, userId })), [userId]);

  useEffect(
    () => setFormValue(initialValues || DEFAULT_FORM_VALUE),
    [initialValues]
  );

  return (
    <Form
      onSubmit={onSubmitHandler}
      fluid
      formValue={formValue}
      onChange={(values) => setFormValue(values as PasswordFormValue)}
    >
      <Form.Group>
        <Form.ControlLabel>{t("Title")}</Form.ControlLabel>
        <Form.Control<typeof Input> name="title" />
      </Form.Group>

      <Form.Group>
        <Form.ControlLabel>{t("Username")}</Form.ControlLabel>
        <Form.Control<typeof Input> name="username" />
      </Form.Group>

      <Form.Group>
        <Form.ControlLabel>{t("Domain")}</Form.ControlLabel>
        <Form.Control<typeof Input> name="domain" />
      </Form.Group>

      <Form.Group>
        <Form.ControlLabel>{t("Password")}</Form.ControlLabel>
        <FlexboxGrid align="middle" justify="space-between">
          <FlexboxGrid.Item colspan={22}>
            <Form.Control<typeof Input> name="password" />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={2} className="align-right">
            <IconButton icon={<GenerateIcon />} onClick={onGeneratePassword} />
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <div className="p-tb-20 p-lr-10">
          <Slider
            value={pageView.generateOptions.length}
            min={8}
            max={64}
            onChange={(length) => pageView.changeGenerateOptions({ length })}
            progress
          />
        </div>
        <CheckboxGroup
          value={pageView.generateOptions.generate}
          onChange={(generate) => pageView.changeGenerateOptions({ generate })}
          inline
        >
          <Checkbox value={PasswordGenerateOptions.Numbers}>
            {t("Numbers")}
          </Checkbox>
          <Checkbox value={PasswordGenerateOptions.Symbols}>
            {t("Symbols")}
          </Checkbox>
          <Checkbox value={PasswordGenerateOptions.Lowercase}>
            {t("Lowercase")}
          </Checkbox>
          <Checkbox value={PasswordGenerateOptions.Uppercase}>
            {t("Uppercase")}
          </Checkbox>
        </CheckboxGroup>
      </Form.Group>

      <Form.Group>
        <Form.ControlLabel>{t("Description")}</Form.ControlLabel>
        <Form.Control<typeof Input> name="description" accepter={Textarea} />
      </Form.Group>

      <Form.Group>
        <Form.ControlLabel>{t("Group")}</Form.ControlLabel>
        <Form.Control<typeof InputPicker>
          name="groupId"
          style={{ width: "50%" }}
          creatable
          accepter={InputPicker}
          cleanable={false}
          onCreate={onCreateGroup}
          data={pickerGroups}
        />
      </Form.Group>

      <ButtonToolbar>
        <Button type="submit" appearance="primary">
          {t("Save")}
        </Button>
      </ButtonToolbar>
    </Form>
  );
};

export default observer(PasswordForm);
