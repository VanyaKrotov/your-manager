import { FC, useCallback, useState } from "react";
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
  SelectPicker,
  Slider,
} from "rsuite";
import { Password } from "types/passwords";
import { generate } from "generate-password";

import GenerateIcon from "icons/reset.svg";
import Textarea from "components/textarea";
import { PasswordGenerateOptions } from "enums/passwords";
import { pageView, passwords } from "store";

export type PasswordFormValue = Pick<
  Password,
  "title" | "password" | "domain" | "description" | "username" | "groupId"
>;

interface PasswordFormProps {
  onSubmit: (values: PasswordFormValue) => void;
}

const DEFAULT_FORM_VALUE: PasswordFormValue = {
  description: "",
  domain: "",
  password: "",
  title: "",
  username: "",
  groupId: 0,
};

const PasswordForm: FC<PasswordFormProps> = ({ onSubmit }) => {
  const [formValue, setFormValue] =
    useState<PasswordFormValue>(DEFAULT_FORM_VALUE);

  const onSubmitHandler = useCallback(
    (valid) => valid && onSubmit(formValue),
    [formValue]
  );

  const onGeneratePassword = useCallback(() => {
    const { generateFnOptions } = pageView;

    const password = generate(generateFnOptions);

    setFormValue((prev) => ({ ...prev, password }));
  }, [setFormValue]);

  return (
    <Form
      onSubmit={onSubmitHandler}
      fluid
      formValue={formValue}
      onChange={(values) => setFormValue(values as PasswordFormValue)}
    >
      <Form.Group>
        <Form.ControlLabel>Title</Form.ControlLabel>
        <Form.Control<typeof Input> name="title" />
      </Form.Group>

      <Form.Group>
        <Form.ControlLabel>Username</Form.ControlLabel>
        <Form.Control<typeof Input> name="username" />
      </Form.Group>

      <Form.Group>
        <Form.ControlLabel>Domain</Form.ControlLabel>
        <Form.Control<typeof Input> name="domain" />
      </Form.Group>

      <Form.Group>
        <Form.ControlLabel>Password</Form.ControlLabel>
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
          <Checkbox value={PasswordGenerateOptions.Numbers}>Numbers</Checkbox>
          <Checkbox value={PasswordGenerateOptions.Symbols}>Symbols</Checkbox>
          <Checkbox value={PasswordGenerateOptions.Lowercase}>
            Lowercase
          </Checkbox>
          <Checkbox value={PasswordGenerateOptions.Uppercase}>
            Uppercase
          </Checkbox>
        </CheckboxGroup>
      </Form.Group>

      <Form.Group>
        <Form.ControlLabel>Description</Form.ControlLabel>
        <Form.Control<typeof Input> name="description" accepter={Textarea} />
      </Form.Group>

      <Form.Group>
        <Form.ControlLabel>Group</Form.ControlLabel>
        <Form.Control<typeof InputPicker>
          name="groupId"
          style={{ width: "50%" }}
          creatable
          accepter={InputPicker}
          cleanable={false}
          data={passwords.pickerGroups}
        />
      </Form.Group>

      <ButtonToolbar>
        <Button type="submit" appearance="primary">
          Save
        </Button>
      </ButtonToolbar>
    </Form>
  );
};

export default observer(PasswordForm);
